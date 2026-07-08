const https = require('https');

function stripePost(path, secretKey, params) {
  // Keys keep literal brackets — only values are URI-encoded (matches how Stripe SDK sends requests)
  const body = Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
    .join('&');

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.stripe.com',
      path,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(new Error('Invalid JSON from Stripe: ' + data.slice(0, 200))); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { items } = JSON.parse(event.body);
    if (!items || !items.length) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No items in cart' }) };
    }

    const origin = event.headers.origin || 'https://pixelthreads.netlify.app';
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }

    const fulfillment = JSON.stringify(
      items.map(item => ({ p: item.productId, v: item.variantId }))
    );
    console.log('fulfillment:', fulfillment);
    console.log('first item keys:', Object.keys(items[0]).join(','));

    const params = {
      mode: 'payment',
      success_url: `${origin}/?order=success&session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?order=cancelled`,
      'payment_method_types[0]': 'card',
      'shipping_address_collection[allowed_countries][0]': 'US',
      'shipping_address_collection[allowed_countries][1]': 'CA',
      'shipping_address_collection[allowed_countries][2]': 'GB',
      'shipping_address_collection[allowed_countries][3]': 'AU',
      'shipping_address_collection[allowed_countries][4]': 'NZ',
      'shipping_address_collection[allowed_countries][5]': 'DE',
      'shipping_address_collection[allowed_countries][6]': 'FR',
      'shipping_address_collection[allowed_countries][7]': 'JP',
      'custom_text[submit][message]': 'Your order will be printed and shipped within 3-5 business days.',
      'metadata[fulfillment]': fulfillment,
    };

    items.forEach((item, i) => {
      params[`line_items[${i}][price_data][currency]`] = 'usd';
      params[`line_items[${i}][price_data][product_data][name]`] = `PIXEL THREADS - ${item.name}`;
      params[`line_items[${i}][price_data][product_data][description]`] = `${item.colorName} / ${item.size}`;
      params[`line_items[${i}][price_data][product_data][images][0]`] = item.img;
      params[`line_items[${i}][price_data][unit_amount]`] = Math.round(parseFloat(item.price) * 100);
      params[`line_items[${i}][quantity]`] = 1;
    });

    const session = await stripePost('/v1/checkout/sessions', secretKey, params);

    if (session.error) {
      console.error('Stripe API error:', JSON.stringify(session.error));
      throw new Error(session.error.message);
    }

    if (!session.url) {
      console.error('No URL in Stripe response:', JSON.stringify(session));
      throw new Error('Stripe did not return a checkout URL');
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('Checkout error:', err.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
