const https = require('https');

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET, OPTIONS' }, body: '' };
  }
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const sessionId = event.queryStringParameters?.session;
  if (!sessionId || !sessionId.startsWith('cs_')) {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Invalid session ID' }) };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return { statusCode: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Not configured' }) };
  }

  return new Promise((resolve) => {
    const options = {
      hostname: 'api.stripe.com',
      path: `/v1/checkout/sessions/${sessionId}?expand[]=line_items`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Stripe-Version': '2024-06-20',
      },
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const session = JSON.parse(data);
          if (session.error) {
            resolve({ statusCode: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: session.error.message }) });
            return;
          }
          // Return only the fields the frontend needs
          const order = {
            id: session.id,
            created: session.created,
            amount_total: session.amount_total,
            currency: session.currency,
            customer_email: session.customer_details?.email,
            customer_name: session.customer_details?.name,
            shipping: session.shipping_details || session.shipping,
            line_items: (session.line_items?.data || []).map(item => ({
              name: item.description,
              quantity: item.quantity,
              amount: item.amount_total,
            })),
          };
          resolve({ statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(order) });
        } catch (e) {
          resolve({ statusCode: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Failed to parse response' }) });
        }
      });
    });
    req.on('error', () => resolve({ statusCode: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Request failed' }) }));
    req.end();
  });
};
