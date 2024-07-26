import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import OpenAI, { toFile } from 'npm:openai';

const openai = new OpenAI();

Deno.serve(async (req) => {
  const { audioBase64 } = await req.json();

  const audioBuffer = Uint8Array.from(atob(audioBase64), (c) => c.charCodeAt(0));

  const file = await toFile(audioBuffer, 'audio.m4a', {
    type: 'm4a',
  });

  const transcription = await openai.audio.transcriptions.create({
    file,
    model: 'whisper-1',
  });

  return new Response(JSON.stringify(transcription), { headers: { 'Content-Type': 'application/json' } });
});
