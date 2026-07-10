const https = require('https');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const sessionId = req.query.session;
  if (!sessionId || !sessionId.startsWith('cs_')) {
    return res.status(400).json({ error: 'Invalid session ID' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return res.status(500).json({ error: 'Not configured' });

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
    const request = https.request(options, response => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        try {
          const session = JSON.parse(data);
          if (session.error) { res.status(400).json({ error: session.error.message }); return resolve(); }
          res.status(200).json({
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
          });
          resolve();
        } catch (e) { res.status(500).json({ error: 'Failed to parse response' }); resolve(); }
      });
    });
    request.on('error', () => { res.status(500).json({ error: 'Request failed' }); resolve(); });
    request.end();
  });
};
