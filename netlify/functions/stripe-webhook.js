const https = require('https');
const crypto = require('crypto');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const sig = req.headers['stripe-signature'];
  const rawBody = await getRawBody(req);

  if (!verifyStripeSignature(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)) {
    console.error('Webhook signature verification failed');
    return res.status(400).send('Webhook signature invalid');
  }

  let stripeEvent;
  try { stripeEvent = JSON.parse(rawBody); } catch (e) { return res.status(400).send('Invalid JSON'); }

  if (stripeEvent.type !== 'checkout.session.completed') return res.status(200).send('OK');

  let session = stripeEvent.data.object;
  const sessionId = session.id;

  console.log('Session ID:', sessionId);
  console.log('Event shipping_details:', JSON.stringify(session.shipping_details));
  console.log('Event customer_details:', JSON.stringify(session.customer_details));

  if (!session.shipping_details) {
    console.log('shipping_details missing — re-fetching session');
    try {
      session = await httpsGet('api.stripe.com', `/v1/checkout/sessions/${sessionId}`, {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Stripe-Version': '2024-06-20',
      });
    } catch (err) {
      console.error('Failed to re-fetch session:', err.message);
      return res.status(200).send('OK');
    }
  }

  let fulfillmentItems = [];
  try { fulfillmentItems = JSON.parse(session.metadata?.fulfillment || '[]'); }
  catch (e) { console.error('Failed to parse fulfillment metadata'); return res.status(200).send('OK'); }

  if (!fulfillmentItems.length) {
    console.error('No fulfillment items for session', sessionId);
    return res.status(200).send('OK');
  }

  const shippingInfo = session.shipping_details || session.shipping;
  const customer = session.customer_details;
  const shippingAddress = (shippingInfo?.address?.line1 ? shippingInfo.address : null) || customer?.address;
  const shippingName = shippingInfo?.name || customer?.name;

  if (!shippingAddress || !shippingAddress.line1) {
    console.error('No valid shipping address');
    return res.status(200).send('OK');
  }

  const nameParts = (shippingName || 'Customer').trim().split(/\s+/);
  const firstName = nameParts[0] || 'Customer';
  const lastName = nameParts.slice(1).join(' ') || '.';

  const orderBody = JSON.stringify({
    external_id: sessionId,
    label: `Stripe ${sessionId.slice(-8)}`,
    line_items: fulfillmentItems.map(item => ({ product_id: item.p, variant_id: item.v, quantity: 1 })),
    shipping_method: 1,
    send_shipping_notification: true,
    address_to: {
      first_name: firstName,
      last_name: lastName,
      email: customer?.email || '',
      phone: customer?.phone || '0000000000',
      country: shippingAddress.country,
      region: shippingAddress.state || '',
      address1: shippingAddress.line1,
      address2: shippingAddress.line2 || '',
      city: shippingAddress.city,
      zip: shippingAddress.postal_code,
    },
  });

  let shopId = process.env.PRINTIFY_SHOP_ID || '28131206';
  try {
    const shops = await httpsGet('api.printify.com', '/v1/shops.json', {
      'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`,
      'User-Agent': 'PixelThreads/1.0',
    });
    if (Array.isArray(shops) && shops.length > 0) shopId = String(shops[0].id);
  } catch (e) { console.error('Could not fetch shops:', e.message); }

  try {
    const result = await httpsPost('api.printify.com', `/v1/shops/${shopId}/orders.json`, {
      'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`,
      'Content-Type': 'application/json',
      'User-Agent': 'PixelThreads/1.0',
    }, orderBody);
    if (result.status >= 400) {
      console.error('Printify error:', result.status, result.body);
    } else {
      console.log('Printify order created:', JSON.parse(result.body).id);
    }
  } catch (err) {
    console.error('Printify API error:', err.message);
  }

  return res.status(200).send('OK');
};

module.exports.config = { api: { bodyParser: false } };

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

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
