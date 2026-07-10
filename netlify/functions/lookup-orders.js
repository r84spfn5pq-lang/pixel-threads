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

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const email = (req.query.email || '').trim().toLowerCase();
  if (!email || !email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return res.status(500).json({ error: 'Not configured' });

  const stripeHdrs = { 'Authorization': `Bearer ${secretKey}`, 'Stripe-Version': '2024-06-20' };

  try {
    const search = await httpsGet('api.stripe.com',
      `/v1/customers/search?query=email:"${encodeURIComponent(email)}"&limit=3`,
      stripeHdrs
    );

    if (!search.data || search.data.length === 0) return res.status(200).json({ orders: [] });

    const sessions = await httpsGet('api.stripe.com',
      `/v1/checkout/sessions?customer=${search.data[0].id}&limit=20&expand[]=data.line_items`,
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

    return res.status(200).json({ orders });
  } catch(err) {
    console.error('Lookup error:', err.message);
    return res.status(500).json({ error: 'Lookup failed. Please try again.' });
  }
};
