import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import OpenAI from 'npm:openai';

const openai = new OpenAI();

Deno.serve(async (req) => {
  const { input, from, to } = await req.json();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are a translator. You translate from ${from} to ${to}. You output only the translated text`,
      },
      { role: 'user', content: input },
    ],
    model: 'gpt-4o',
  });

  console.log(completion.choices[0]);

  return new Response(JSON.stringify(completion.choices[0].message), {
    headers: { 'Content-Type': 'application/json' },
  });
});
