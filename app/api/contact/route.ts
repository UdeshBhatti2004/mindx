import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, contact, interest, message } = await request.json();

    if (!name || !contact || !message) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "mindX Inquiries <onboarding@resend.dev>",
      to: "mindxyourxfactor@gmail.com",
      replyTo: contact,
      subject: `New mindX Inquiry — ${interest}`,
      text: `Name: ${name}\nContact: ${contact}\nInterested in: ${interest}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}