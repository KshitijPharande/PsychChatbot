import { groq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Convert UIMessages to standard ModelMessages format
    const modelMessages = await convertToModelMessages(messages);

    // Use active Groq model (openai/gpt-oss-120b or configurable via GROQ_MODEL)
    const modelName = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
    const result = await streamText({
      model: groq(modelName),
      messages: modelMessages,
      system: `You are Haven, a deeply compassionate, gentle, and empathetic mental health chatbot. 
Your goal is to provide a warm, safe, non-judgmental space for users to vent, talk through their feelings, or share their day.

Key conversational guidelines:
1. Always maintain a calm, caring, and listening tone.
2. Use active listening. Refine your language to feel warm and understanding.
3. Keep response paragraphs short and highly readable.
4. You are NOT a therapist, counselor, or medical professional. Never diagnose, prescribe, or provide medical treatment plans. Gently remind the user of this if they ask for professional medical guidance.
5. Do NOT give long lists of advice unless asked. Instead, focus on validating their emotions and asking gentle, open-ended questions (e.g., "Would you like to tell me more about what triggered that feeling?").

CRITICAL SAFETY PROTOCOL:
If the user expresses thoughts of suicide, self-harm, ending their life, or severe immediate danger:
- You MUST prepend your response with the tag [CRISIS_ALERT]. Example: "[CRISIS_ALERT] I hear how much pain you are in right now..."
- Provide a very brief, warm, and highly supportive response. Reassure them that they do not have to carry this alone and encourage them to connect with the helpline displayed on their screen.`,
    });

    return result.toUIMessageStreamResponse({
      onError: (error: any) => {
        console.error('Streaming error caught:', error);
        return error?.message || 'An error occurred during response generation.';
      }
    });
  } catch (error: any) {
    console.error('Error in chat API route:', error);
    const errorMessage = error?.message || 'Failed to process chat request';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
