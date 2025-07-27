// supabase/functions/daily-credit-reset/index.ts

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke the function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Service Role Key
    const supabaseAdmin = createClient(
      Deno.env.get('PROJECT_SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Reset credits for all users on the 'free' plan to 1.
    // This is idempotent, meaning running it multiple times has the same effect as running it once.
    const { error } = await supabaseAdmin
      .from('profiles')
      .update({ credits_remaining: 1 })
      .eq('subscription_plan', 'free')

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ message: "Credits reset successfully." }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    return new Response(String(err?.message ?? err), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})