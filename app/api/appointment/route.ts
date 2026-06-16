import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // ElevenLabs webhook parameters can be mapped from request body
        // Typically passed as custom tool arguments
        const name = String(body?.name ?? body?.properties?.name ?? "").trim();
        const email = String(body?.email ?? body?.properties?.email ?? "").trim();
        const date = String(body?.date ?? body?.properties?.date ?? "").trim();
        const time = String(body?.time ?? body?.properties?.time ?? "").trim();
        const notes = String(body?.notes ?? body?.message ?? body?.properties?.notes ?? "").trim();

        if (!name || !email || !date || !time) {
            return NextResponse.json(
                { error: 'Missing required appointment fields (name, email, date, time)' },
                { status: 400 }
            );
        }

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            return NextResponse.json(
                { error: 'Email service is not configured' },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Sending to yourself
            replyTo: email,
            subject: `📅 AI voice Appointment Booked: ${name}`,
            text: `
New Appointment Scheduled via ElevenLabs AI Agent!

Name: ${name}
Email: ${email}
Date: ${date}
Time: ${time}

Additional Details:
${notes || 'None provided'}
            `,
            html: `
<h3>📅 New Appointment Booked via AI Voice Assistant</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Date:</strong> ${date}</p>
<p><strong>Time:</strong> ${time}</p>
<br/>
<p><strong>Additional Details:</strong></p>
<p>${(notes || 'None').replace(/\n/g, '<br>')}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Appointment email sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error handling appointment booking:', error);
        return NextResponse.json(
            { error: 'Failed to book appointment', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
