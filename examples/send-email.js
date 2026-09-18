require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail() {
    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "YOUR_RESEND_ACCOUNT_EMAIL",
        subject: "My first Resend email",
        html: "<p>Hello from Resend!</p>",
    });

    if (error) {
        console.error("Error:", error);
        return;
    }

    console.log("Email sent:", data);
}

sendEmail();