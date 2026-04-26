export const config = { runtime: 'edge' };

export default async function handler(req) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const { searchParams } = new URL(req.url);
  const path   = searchParams.get('path');
  const params = searchParams.get('params') || '';

  if (!path) {
    return new Response('Missing path', { status: 400, headers: corsHeaders });
  }

  const url = `https://api.mapbox.com/${path}?${params}&access_token=${process.env.MAPBOX_TOKEN}`;
  const upstream = await fetch(url);
  const body = await upstream.arrayBuffer();

  return new Response(body, {
    status: upstream.status,
    headers: {
      ...corsHeaders,
      'Content-Type': upstream.headers.get('Content-Type') || 'application/json',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
