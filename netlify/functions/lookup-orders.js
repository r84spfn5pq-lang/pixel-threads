const https = require('https');

function httpsGet(hostname, path, headers) {
  return new Promise((resolve, reject) => {
    const options = { hostname, path, method: 'GET', headers };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { reject(e); } });
    });
    req.on('error', reject);
    req.end();
  });
}

exports.handler = async function(event) {
  const cors = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { ...cors, 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET, OPTIONS' }, body: '' };
  }
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: cors, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const email = (event.queryStringParameters?.email || '').trim().toLowerCase();
  if (!email || !email.includes('@') || !email.includes('.')) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'Valid email required' }) };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return { statusCode: 500, headers: cors, body: JSON.stringify({ error: 'Not configured' }) };

  const stripeHdrs = { 'Authorization': `Bearer ${secretKey}`, 'Stripe-Version': '2024-06-20' };

  try {
    // Find customer by email
    const search = await httpsGet('api.stripe.com',
      `/v1/customers/search?query=email:"${encodeURIComponent(email)}"&limit=3`,
      stripeHdrs
    );

    if (!search.data || search.data.length === 0) {
      return { statusCode: 200, headers: cors, body: JSON.stringify({ orders: [] }) };
    }

    const customerId = search.data[0].id;

    // List checkout sessions for this customer (expand line_items)
    const sessions = await httpsGet('api.stripe.com',
      `/v1/checkout/sessions?customer=${customerId}&limit=20&expand[]=data.line_items`,
      stripeHdrs
    );

    const orders = (sessions.data || [])
      .filter(s => s.payment_status === 'paid')
      .map(s => ({
        id: s.id,
        created: s.created,
        amount_total: s.amount_total,
        currency: s.currency || 'usd',
        line_items: (s.line_items?.data || []).map(item => ({
          name: (item.description || '').replace(/^PIXEL THREADS - /i, ''),
          quantity: item.quantity,
          amount: item.amount_total,
        })),
        shipping_name: s.shipping_details?.name || s.customer_details?.name,
      }));

    return { statusCode: 200, headers: cors, body: JSON.stringify({ orders }) };

  } catch(err) {
    console.error('Lookup error:', err.message);
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: 'Lookup failed. Please try again.' }) };
  }
};
