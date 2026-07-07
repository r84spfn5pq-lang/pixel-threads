import { getStore } from '@netlify/blobs';

const MAX_ENTRIES = 10;
const MAX_SCORE = 99999999;

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  const store = getStore('leaderboard');

  if (req.method === 'GET') {
    const scores = (await store.get('scores', { type: 'json' })) || [];
    return Response.json(scores, { headers: corsHeaders() });
  }

  if (req.method === 'POST') {
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response('Invalid JSON', { status: 400, headers: corsHeaders() });
    }

    const rawName = typeof body.name === 'string' ? body.name : '';
    const name = rawName.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3).padEnd(3, '-');
    const score = Math.max(0, Math.min(Math.floor(Number(body.score)) || 0, MAX_SCORE));

    if (score <= 0) {
      return new Response('Invalid score', { status: 400, headers: corsHeaders() });
    }

    let scores = (await store.get('scores', { type: 'json' })) || [];
    scores.push({ name, score, ts: Date.now() });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, MAX_ENTRIES);

    await store.setJSON('scores', scores);
    return Response.json(scores, { headers: corsHeaders() });
  }

  return new Response('Method not allowed', { status: 405, headers: corsHeaders() });
};

export const config = { path: '/api/leaderboard' };
