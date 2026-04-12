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
  const path = searchParams.get('path'); // e.g. "geocoding/v5/mapbox.places/90210.json"
  const rest = searchParams.get('params') || ''; // other query params

  if (!path) {
    return new Response('Missing path', { status: 400, headers: corsHeaders });
  }

  const token = process.env.MAPBOX_TOKEN;
  const url = `https://api.mapbox.com/${path}?${rest}&access_token=${token}`;

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
