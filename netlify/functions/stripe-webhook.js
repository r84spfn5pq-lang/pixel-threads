const https = require('https');
const crypto = require('crypto');

function verifyStripeSignature(payload, signature, secret) {
  const parts = {};
  signature.split(',').forEach(p => { const [k, v] = p.split('='); parts[k] = v; });
  const signed = `${parts.t}.${payload}`;
  const expected = crypto.createHmac('sha256', secret).update(signed, 'utf8').digest('hex');
  try { return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(parts.v1 || '', 'hex')); } catch { return false; }
}

function httpsGet(hostname, path, headers) {
  return new Promise((resolve, reject) => {
    const options = { hostname, path, method: 'GET', headers };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(e); } });
    });
    req.on('error', reject);
    req.end();
  });
}

function httpsPost(hostname, path, headers, body) {
  return new Promise((resolve, reject) => {
    const options = { hostname, path, method: 'POST', headers: { ...headers, 'Content-Length': Buffer.byteLength(body) } };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const sig = event.headers['stripe-signature'];
  const rawBody = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;

  if (!verifyStripeSignature(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)) {
    console.error('Webhook signature verification failed');
    return { statusCode: 400, body: 'Webhook signature invalid' };
  }

  let stripeEvent;
  try { stripeEvent = JSON.parse(rawBody); } catch (e) { return { statusCode: 400, body: 'Invalid JSON' }; }

  if (stripeEvent.type !== 'checkout.session.completed') return { statusCode: 200, body: 'OK' };

  // Use the event's session data first (avoids extra API call)
  let session = stripeEvent.data.object;
  const sessionId = session.id;

  console.log('Session ID:', sessionId);
  console.log('Event shipping_details:', JSON.stringify(session.shipping_details));
  console.log('Event customer_details:', JSON.stringify(session.customer_details));
  console.log('Metadata:', JSON.stringify(session.metadata));

  // If shipping_details is missing from the event payload, re-fetch with explicit API version
  if (!session.shipping_details) {
    console.log('shipping_details missing from event — re-fetching session');
    try {
      session = await httpsGet('api.stripe.com', `/v1/checkout/sessions/${sessionId}`, {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Stripe-Version': '2024-06-20',
      });
      console.log('Re-fetched shipping_details:', JSON.stringify(session.shipping_details));
      console.log('Re-fetched customer_details:', JSON.stringify(session.customer_details));
    } catch (err) {
      console.error('Failed to re-fetch session:', err.message);
      return { statusCode: 200, body: 'OK' };
    }
  }

  // Parse fulfillment items from metadata
  let fulfillmentItems = [];
  try { fulfillmentItems = JSON.parse(session.metadata?.fulfillment || '[]'); }
  catch (e) { console.error('Failed to parse fulfillment metadata'); return { statusCode: 200, body: 'OK' }; }

  if (!fulfillmentItems.length) {
    console.error('No fulfillment items for session', sessionId);
    return { statusCode: 200, body: 'OK' };
  }

  // Extract shipping address — only from shipping_details (customer_details.address is billing only)
  const shippingInfo = session.shipping_details || session.shipping;
  const customer = session.customer_details;
  const shippingAddress = shippingInfo?.address;
  const shippingName = shippingInfo?.name || customer?.name;

  console.log('shippingAddress resolved:', JSON.stringify(shippingAddress));
  console.log('shippingName resolved:', shippingName);

  if (!shippingAddress || !shippingAddress.line1) {
    console.error('No valid shipping address (line1 missing). Cannot create Printify order.');
    return { statusCode: 200, body: 'OK' };
  }

  const nameParts = (shippingName || 'Customer').trim().split(/\s+/);
  const firstName = nameParts[0] || 'Customer';
  const lastName  = nameParts.slice(1).join(' ') || '.';

  const orderBody = JSON.stringify({
    external_id: sessionId,
    label: `Stripe ${sessionId.slice(-8)}`,
    line_items: fulfillmentItems.map(item => ({
      product_id: item.p,
      variant_id: item.v,
      quantity: 1,
    })),
    shipping_method: 1,
    send_shipping_notification: true,
    address_to: {
      first_name: firstName,
      last_name:  lastName,
      email:      customer?.email || '',
      phone:      customer?.phone || '0000000000',
      country:    shippingAddress.country,
      region:     shippingAddress.state || '',
      address1:   shippingAddress.line1,
      address2:   shippingAddress.line2 || '',
      city:       shippingAddress.city,
      zip:        shippingAddress.postal_code,
    },
  });

  // Look up real shop ID from Printify
  let shopId = process.env.PRINTIFY_SHOP_ID || '28131206';
  try {
    const shops = await httpsGet('api.printify.com', '/v1/shops.json', {
      'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`,
      'User-Agent': 'PixelThreads/1.0',
    });
    if (Array.isArray(shops) && shops.length > 0) shopId = String(shops[0].id);
  } catch (e) { console.error('Could not fetch shops:', e.message); }

  try {
    const res = await httpsPost(
      'api.printify.com',
      `/v1/shops/${shopId}/orders.json`,
      {
        'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'PixelThreads/1.0',
      },
      orderBody
    );
    if (res.status >= 400) {
      console.error('Printify error:', res.status, res.body);
    } else {
      const order = JSON.parse(res.body);
      console.log('Printify order created:', order.id);
    }
  } catch (err) {
    console.error('Printify API error:', err.message);
  }

  return { statusCode: 200, body: 'OK' };
};
