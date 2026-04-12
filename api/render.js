export const config = { runtime: 'edge' };

export default async function handler(req) {
  // Only allow POST
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // CORS headers — allow your Vercel domain
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const body = await req.formData();

    // Forward to Stability AI
    const stabilityRes = await fetch(
      'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.STABILITY_KEY}`,
          'Accept': 'application/json',
        },
        body,
      }
    );

    if (!stabilityRes.ok) {
      const err = await stabilityRes.text();
      return new Response(err, {
        status: stabilityRes.status,
        headers: corsHeaders,
      });
    }

    const data = await stabilityRes.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
