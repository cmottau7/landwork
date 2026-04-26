export const config = { runtime: 'edge' };

export default function handler() {
  return new Response(
    JSON.stringify({
      supabaseUrl:  process.env.SUPABASE_URL  || '',
      supabaseKey:  process.env.SUPABASE_KEY  || '',
      mapboxToken:  process.env.MAPBOX_TOKEN  || '',
      // STABILITY_KEY intentionally excluded — server-side only
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    }
  );
}
