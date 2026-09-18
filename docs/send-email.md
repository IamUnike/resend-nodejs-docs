# Send Your First Email

This guide shows you how to send an email from a Node.js application using the
Resend SDK and verify that Resend accepted the request.

## Before you begin

Complete [Get Started with Resend and Node.js](getting-started.md) before
continuing.

You should have:

- The Resend SDK installed.
- `dotenv` installed.
- A Resend API key stored in `.env`.
- A Sending Access API key or another key with permission to send email.

For this guide, you can use Resend's testing sender,
`onboarding@resend.dev`. For your first test, use the email address associated with your Resend
account as the recipient. Resend also provides test addresses for specific
testing scenarios.

## Create the email script

Create a file named `send-email.js` in your project root.

Add the following code:

```javascript
require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail() {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "YOUR_EMAIL_ADDRESS",
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
```

Replace `YOUR_EMAIL_ADDRESS` with the email address associated with your
Resend account.

## Understand the request

The following method sends the email:

```javascript
resend.emails.send()
```

The request contains four important fields:

| Field | Purpose |
| --- | --- |
| `from` | Email address used as the sender |
| `to` | Recipient email address |
| `subject` | Subject displayed to the recipient |
| `html` | HTML content of the email |

The Resend client gets its API key from:

```javascript
process.env.RESEND_API_KEY
```

This keeps the credential separate from the source code.

## Send the email

Run:

```bash
node send-email.js
```

If Resend accepts the request, the terminal returns an object containing an
email ID:

```text
Email sent: { id: '01xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' }
```

The exact ID will be different for each email.

Save the ID if you plan to retrieve information about the email later.

## Verify delivery

Receiving an email ID means Resend accepted the request. It does not by itself
mean that the message has reached the recipient's inbox.

Check the recipient inbox and confirm that the message arrived.

You can also open **Emails** in the Resend dashboard and select the message to
view its status and delivery events.

Depending on the message lifecycle, you may see events such as:

```text
Sent → Delivered → Opened
```

Delivery and engagement events depend on what happens after Resend accepts the
request.

## Send plain-text content

Resend can also send plain-text email.

Replace the `html` field:

```javascript
html: "<p>Hello from Resend!</p>",
```

with:

```javascript
text: "Hello from Resend!",
```

For example:

```javascript
const { data, error } = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "YOUR_EMAIL_ADDRESS",
  subject: "Resend plain-text test",
  text: "Hello from Resend!",
});
```

Run the script again:

```bash
node send-email.js
```

A successful request returns another email ID.

## Send to other recipients

The `onboarding@resend.dev` sender is intended for testing and is not a
general-purpose sender for arbitrary recipient addresses.

To send production email to your own recipients, verify a domain in Resend
and use a `from` address associated with that domain.

To send email to other recipients, verify a domain in Resend and use a `from`
address associated with that domain.

For example, after verifying `example.com`, a sender could resemble:

```text
notifications@example.com
```

Do not replace `onboarding@resend.dev` with an address on a domain you do not
control.

## Handle errors

The example checks the `error` value returned by the SDK:

```javascript
if (error) {
  console.error("Error:", error);
  return;
}
```

If the request fails, this prevents the script from treating the operation as
successful and displays the returned error information.

For solutions to authentication, permission, recipient, and request errors,
see [Troubleshoot Resend Errors](troubleshoot-errors.md).

## Next step

You now know how to create an email and capture its ID.

Continue to [Retrieve an Email](retrieve-email.md) to use that ID to retrieve
information about the message.
