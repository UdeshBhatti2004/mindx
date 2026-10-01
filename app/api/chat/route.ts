import { NextResponse } from 'next/server';

const SYSTEM = `You are the assistant for mindx Institute, a coaching center in Rajkot, Gujarat.
Answer ONLY using the facts below. Be short, friendly, 1-3 sentences.
If you don't know something (fees, exact timings, etc.), don't guess. Say
"Please call +91 79904 96001 or use the contact form" instead.
Politely decline unrelated questions.

FACTS:
- Std 1-9 academic coaching, English medium: concept clarity, homework help, core subjects
- Tally with GST: ledgers, inventory, taxation, GST filing, from scratch
- CCC: operating systems, office automation, internet, certified IT skills
- Coding for Kids: Scratch, block-based programming, games
- Location: Rajkot, Gujarat  | Phone: +91 79904 96001 | Email: mindxyourxfactor@gmail.com
- ADD: address, timings, batch sizes, fees (if you want the bot to answer them)`;

const hits = new Map<string, { n: number; t: number }>();
const FALLBACK = 'Sorry, I could not answer that. Please call +91 79904 96001.';

export async function POST(req: Request) {
  // basic rate limit (per instance; fine for a small site)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'anon';
  const now = Date.now();
  const h = hits.get(ip);
  if (h && now - h.t < 60_000) {
    if (h.n >= 8)
      return NextResponse.json({ reply: 'Too many messages. Please wait a minute.' }, { status: 429 });
    h.n++;
  } else hits.set(ip, { n: 1, t: now });

  const { messages } = await req.json();
  if (!Array.isArray(messages) || !messages.length)
    return NextResponse.json({ reply: FALLBACK }, { status: 400 });

  const contents = messages.slice(-10).map((m: { role: string; text: string }) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: String(m.text).slice(0, 500) }],
  }));

  try {
    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY!,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents,
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.4,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      }
    );
    
    if (!res.ok) return NextResponse.json({ reply: FALLBACK });
    const data = await res.json();
    return NextResponse.json({ reply: data.candidates?.[0]?.content?.parts?.[0]?.text ?? FALLBACK });
  } catch {
    return NextResponse.json({ reply: FALLBACK });
  }
}