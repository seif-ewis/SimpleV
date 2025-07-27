import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { GoogleGenerativeAI } from '@google/generative-ai'; 
import { CVData } from '@/lib/types';

// Initialize Google AI Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  const cvData: CVData = await request.json();
  const supabase = await createClient(); // ✅ Use await here

  // 1. Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 2. Check if user has credits
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('credits_remaining')
    .eq('id', user.id)
    .single();

  if (profileError || !profile || profile.credits_remaining <= 0) {
    return new NextResponse('Not enough credits', { status: 402 });
  }

  try {
    // 3. Craft the AI Prompt
    const prompt = `
      Based on the following JSON data, generate a professional, ATS-compliant CV in Markdown format.
      Focus on using strong action verbs and quantifiable achievements. The tone should be formal and professional.
      Do not include a photo section.

      JSON Data:
      ${JSON.stringify(cvData, null, 2)}

      CV Output:
    `;

    // 4. Call Google Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const generatedCvText = result.response.text();

    // 5. Decrement user credits
    const newCredits = profile.credits_remaining - 1;
    await supabase
      .from('profiles')
      .update({ credits_remaining: newCredits })
      .eq('id', user.id);

    // 6. Return the generated CV
    return NextResponse.json({ generatedCv: generatedCvText });

  } catch (error) {
    console.error('AI generation error:', error);
    return new NextResponse('Error generating CV', { status: 500 });
  }
}
