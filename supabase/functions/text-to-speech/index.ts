import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import OpenAI from 'npm:openai';

const openai = new OpenAI();

Deno.serve(async (req) => {
  const { input } = await req.json();

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'alloy',
    input,
  });

  const buffer = new Uint8Array(await mp3.arrayBuffer());
  const mp3Base64 = btoa(String.fromCharCode(...buffer));

  return new Response(JSON.stringify({ mp3Base64 }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
