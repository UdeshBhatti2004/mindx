import { NextResponse } from 'next/server';

const SYSTEM = `You are the friendly assistant for mindX Institute, a coaching center in Rajkot, Gujarat.
Answer ONLY using the facts below. Keep replies short (1-3 sentences), warm and simple.
Never invent fees, timings, batch sizes, results or addresses. If something is not in the facts,
say you don't have that detail and give the contact info.
Politely decline questions unrelated to mindX Institute.
Reply in the same language the user writes in (English, Hindi or Gujarati).

CONTACT (use whenever the user wants more info, fees, timings, demo or admission):
- Phone / WhatsApp: +91 79904 96001
- Email: mindxyourxfactor@gmail.com
- Or fill the "Send Inquiry" form in the Contact section of this website
- Location: Rajkot, Gujarat

ADMISSIONS:
- Admissions are OPEN. If asked about admission/enrollment/joining, reply:
  "Yes, admissions are open! 🎉 For details, call or WhatsApp +91 79904 96001,
  email mindxyourxfactor@gmail.com, or fill the inquiry form on this page."

COURSES:
1. Standards 1 to 9 (English Medium): academic coaching, strong concept clarity,
   homework guidance, core subject mastery.
2. Tally with GST: financial accounting from scratch: ledger creation, inventory
   management, taxation and GST filing.
3. CCC Course: digital literacy: operating systems, office automation, internet
   navigation, certified IT skills.
4. Coding for Kids (Scratch): visual block-based programming, logic building,
   interactive games.

WHY mindX: practical hands-on learning, experienced mentors, future-ready skills,
supportive and collaborative environment.

RULES FOR COMMON QUESTIONS:
- Fees / price / discount: "Fees depend on the course and batch. Please call or WhatsApp
  +91 79904 96001 and our team will share the details."
- Timings / batches: "Batch timings are shared by our team. Please call or WhatsApp
  +91 79904 96001."
- Demo class / visit: invite them to call or WhatsApp +91 79904 96001 to arrange it.
- Address / directions: say the center is in Rajkot, Gujarat and ask them to call for the exact location.
- Age / eligibility: only state what is in the facts (Std 1-9 for school students, Scratch coding for kids).
  For anything else, give the contact.
- Always end admission, fees, timing and demo answers with the contact details.

OPTIONAL - ADD YOUR OWN FACTS BELOW (the bot will then answer these directly):
- Exact address: 
- Batch timings: 
- Fees: 
- Course duration (Tally / CCC): 
- Demo class: 
- Subjects covered for Std 1-9: 
`;

const hits = new Map<string, { n: number; t: number }>();
const FALLBACK = 'Sorry, I could not answer that. Please call or WhatsApp +91 79904 96001.';

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
    return NextResponse.json({
      reply: data.candidates?.[0]?.content?.parts?.[0]?.text ?? FALLBACK,
    });
  } catch {
    return NextResponse.json({ reply: FALLBACK });
  }
}