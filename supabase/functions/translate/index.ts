import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import OpenAI from 'npm:openai';

import { corsHeaders } from '../_shared/cors.ts';

const openai = new OpenAI();

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

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
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
