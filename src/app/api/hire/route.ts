import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type HirePayload = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HirePayload;
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const company = String(body.company || "").trim();
    const projectType = String(body.projectType || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const to = process.env.CONTACT_TO || user;

    if (!user || !pass || !to) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass: pass.replace(/\s+/g, ""),
      },
    });

    const text = [
      "New project inquiry from your portfolio",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      `Project type: ${projectType}`,
      "",
      "Brief:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.5;color:#0a0e12">
        <p style="margin:0 0 16px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#0d5c4d">
          Portfolio inquiry
        </p>
        <h2 style="margin:0 0 20px;font-size:22px">New project brief</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;border-bottom:1px solid #e6e9ee;width:120px;color:#5c6670">Name</td><td style="padding:8px 0;border-bottom:1px solid #e6e9ee">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #e6e9ee;color:#5c6670">Email</td><td style="padding:8px 0;border-bottom:1px solid #e6e9ee"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          ${
            company
              ? `<tr><td style="padding:8px 0;border-bottom:1px solid #e6e9ee;color:#5c6670">Company</td><td style="padding:8px 0;border-bottom:1px solid #e6e9ee">${escapeHtml(company)}</td></tr>`
              : ""
          }
          <tr><td style="padding:8px 0;border-bottom:1px solid #e6e9ee;color:#5c6670">Project</td><td style="padding:8px 0;border-bottom:1px solid #e6e9ee">${escapeHtml(projectType)}</td></tr>
        </table>
        <p style="margin:24px 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#5c6670">Brief</p>
        <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Hammad Portfolio" <${user}>`,
      to,
      replyTo: email,
      subject: `New inquiry from ${name}: ${projectType}`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Hire form email failed:", error);
    return NextResponse.json(
      { error: "Could not send your inquiry. Please try again." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
