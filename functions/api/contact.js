/**
 * Contact Form Handler — Cloudflare Pages Function
 * Handles POST requests from the contact form and sends email via Resend API
 */

export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        // 1. Parse JSON body
        const body = await request.json();
        const { name, email, message, website } = body;

        // 2. Validate required fields
        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // 3. Honeypot check — if website field is filled, it's a bot
        if (website) {
            // Silent success — trick the bot
            return new Response(
                JSON.stringify({ ok: true, message: "Message received" }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // 4. Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ error: "Invalid email address" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // 5. Send email via Resend API
        const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Portfolio Contact <noreply@danielevercelli.it>",
                to: env.CONTACT_EMAIL,
                reply_to: email,
                subject: `[Portfolio] New message from ${name}`,
                text: `
Name: ${name}
Email: ${email}

Message:
${message}
        `.trim(),
                html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
    .label { font-weight: 600; color: #6b7280; font-size: 12px; text-transform: uppercase; }
    .value { margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="value">
        <div class="label">Name</div>
        <div>${name}</div>
      </div>
      <div class="value">
        <div class="label">Email</div>
        <div><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="value">
        <div class="label">Message</div>
        <div>${message.replace(/\n/g, "<br>")}</div>
      </div>
    </div>
  </div>
</body>
</html>
        `.trim(),
            }),
        });

        if (!resendResponse.ok) {
            const errorData = await resendResponse.json();
            console.error("Resend API error:", errorData);
            return new Response(
                JSON.stringify({ error: "Failed to send email" }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // 6. Success
        return new Response(
            JSON.stringify({ ok: true, message: "Message sent successfully" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
