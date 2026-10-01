import { NextResponse } from 'next/server';

const PHONE = '+91 79904 96001';
const EMAIL = 'mindxyourxfactor@gmail.com';

const SYSTEM = `You are the friendly assistant for mindX Institute, a coaching center in Rajkot, Gujarat.
Answer ONLY using the facts below. Keep replies short (1-3 sentences), warm and simple.
Never invent fees, timings, batch sizes, results or addresses. If something is not in the facts,
say you don't have that detail and give the contact info.
Politely decline questions unrelated to mindX Institute.
Reply in the same language the user writes in (English, Hindi or Gujarati).

CONTACT: Phone/WhatsApp ${PHONE} | Email ${EMAIL} | or the "Send Inquiry" form on this website | Location: Rajkot, Gujarat

ADMISSIONS: Admissions are OPEN.

COURSES:
1. Standards 1 to 9 (English Medium): academic coaching, concept clarity, homework guidance, core subjects.
2. Tally with GST: accounting from scratch: ledgers, inventory, taxation, GST filing.
3. CCC Course: operating systems, office automation, internet, certified IT skills.
4. Coding for Kids (Scratch): block-based programming, logic building, games.

WHY mindX: hands-on learning, experienced mentors, future-ready skills, supportive environment.

ADD YOUR OWN FACTS BELOW:
- Exact address:
- Batch timings:
- Fees:
- Course duration (Tally / CCC):
- Demo class:
- Subjects for Std 1-9:
`;

const FALLBACK = `I can help with Std 1–9 coaching, Tally with GST, CCC and Coding for Kids. For this, please call or WhatsApp ${PHONE} or email ${EMAIL}.`;

/* ---- instant answers: no AI needed, tolerant to typos ---- */
function localAnswer(text: string): string | null {
  const s = text.toLowerCase();

  if (/ad+mi|enrol|join|regist|seat|vacanc|dakhla|pravesh|એડમિશન|એડમીશન|प्रवेश|एडमिशन/.test(s))
    return `Yes, admissions are open! 🎉 For more info, call or WhatsApp ${PHONE}, email ${EMAIL}, or fill the "Send Inquiry" form on this page.`;

  if (/\bfees?\b|price|cost|charge|kitna|paisa|ફી|फीस|शुल्क/.test(s))
    return `Fees depend on the course and batch. Please call or WhatsApp ${PHONE} and our team will share the details.`;

  if (/timing|batch|schedule|samay|સમય|समय/.test(s))
    return `Our team will share the batch timings. Please call or WhatsApp ${PHONE}.`;

  if (/demo|trial|free class|visit/.test(s))
    return `Sure! To arrange a demo class or visit, call or WhatsApp ${PHONE}.`;

  if (/contact|phone|number|whatsapp|call|email|address|location|where|direction|map|kahan|kaha|ક્યાં|कहाँ/.test(s))
    return `We're in Rajkot, Gujarat. Call or WhatsApp ${PHONE}, or email ${EMAIL}. You can also use the inquiry form on this page.`;

  return null;
}

/* ---- Gemini with model fallback + real error logging ---- */
const MODELS = [
  { name: 'gemini-2.5-flash', cfg: { maxOutputTokens: 400, temperature: 0.4, thinkingConfig: { thinkingBudget: 0 } } },
  { name: 'gemini-flash-latest', cfg: { maxOutputTokens: 800, temperature: 0.4 } },
];

async function askGemini(contents: unknown[]): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.error('[chat] GEMINI_API_KEY is missing');
    return null;
  }
  for (const m of MODELS) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${m.name}:generateContent`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM }] },
            contents,
            generationConfig: m.cfg,
          }),
        }
      );
      if (!res.ok) {
        console.error(`[chat] ${m.name} -> ${res.status}`, (await res.text()).slice(0, 300));
        continue;
      }
      const data = await res.json();
      const text = (data.candidates?.[0]?.content?.parts ?? [])
        .map((p: { text?: string }) => p.text ?? '')
        .join('')
        .trim();
      if (text) return text;
      console.error(`[chat] ${m.name} empty reply`, JSON.stringify(data).slice(0, 300));
    } catch (e) {
      console.error(`[chat] ${m.name} fetch failed`, e);
    }
  }
  return null;
}

const hits = new Map<string, { n: number; t: number }>();

export async function POST(req: Request) {
  const { messages } = await req.json().catch(() => ({ messages: null }));
  if (!Array.isArray(messages) || !messages.length)
    return NextResponse.json({ reply: FALLBACK }, { status: 400 });

  // 1) instant local answer
  const last = String(messages[messages.length - 1]?.text ?? '');
  const local = localAnswer(last);
  if (local) return NextResponse.json({ reply: local });

  // 2) rate limit (AI calls only)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'anon';
  const now = Date.now();
  const h = hits.get(ip);
  if (h && now - h.t < 60_000) {
    if (h.n >= 8)
      return NextResponse.json({ reply: 'Too many messages. Please wait a minute.' }, { status: 429 });
    h.n++;
  } else hits.set(ip, { n: 1, t: now });

  // 3) AI answer
  const contents = messages.slice(-10).map((m: { role: string; text: string }) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: String(m.text).slice(0, 500) }],
  }));
  const reply = await askGemini(contents);
  return NextResponse.json({ reply: reply ?? FALLBACK });
}