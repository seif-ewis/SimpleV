import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Create Supabase client (must be awaited)
  const supabase = await createClient();

  // Get current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If session exists, sign out
  if (session) {
    await supabase.auth.signOut();
  }

  // Redirect to login page
  return NextResponse.redirect(new URL('/login', req.url), {
    status: 302,
  });
}
