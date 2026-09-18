require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_FULL_ACCESS_KEY);

async function getEmail() {
    const { data, error } = await resend.emails.get(
        "YOUR_EMAIL_ID"
    );

    if (error) {
        console.error("Error:", error);
        return;
    }

    console.log("Email:", data);
}

getEmail();
