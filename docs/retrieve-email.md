# Retrieve an Email

This guide shows you how to retrieve information about an email using its ID
and the Resend Node.js SDK.

Retrieving an email is useful when you need information about a previously
created message, including its recipient, subject, content, and latest event.

## Before you begin

You should have:

- Completed [Send Your First Email](send-email.md).
- The ID returned after sending an email.
- A Resend API key with permission to retrieve email information.
- The Resend SDK and `dotenv` installed.

> [!IMPORTANT]
> A Sending Access API key can send email but cannot retrieve an email.
> Attempting to retrieve an email with a sending-only key returns a `401`
> `restricted_api_key` error.

See [Understand API Key Permissions](api-key-permissions.md) for more
information.

## Configure an API key

If your existing key has only Sending Access, create an API key with the
permissions required to retrieve email information.

Store the key in your `.env` file:

```text
RESEND_FULL_ACCESS_KEY=re_your_api_key_here
```

Do not add the actual API key to your JavaScript file or commit your `.env`
file to Git.

## Create the retrieval script

Create a file named `get-email.js`.

Add:

```javascript
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
```

Replace `YOUR_EMAIL_ID` with the ID returned when you sent the email.

For example:

```text
01xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Retrieve the email

Run:

```bash
node get-email.js
```

If the request succeeds, Resend returns information about the email.

A response can resemble:

```javascript
{
  object: "email",
  id: "01xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  to: ["you@example.com"],
  from: "onboarding@resend.dev",
  created_at: "2026-09-18 09:52:00.350000+00",
  subject: "Resend plain-text test",
  bcc: null,
  cc: null,
  reply_to: null,
  last_event: "delivered",
  scheduled_at: null,
  message_id: "<message-id>",
  html: null,
  text: "Hello from Resend!"
}
```

Values in your response will differ.

## Understand the response

Some useful fields include:

| Field | Description |
| --- | --- |
| `id` | Resend identifier for the email |
| `to` | Recipient addresses |
| `from` | Sender address |
| `created_at` | Time the email resource was created |
| `subject` | Email subject |
| `cc` | Carbon-copy recipients, if configured |
| `bcc` | Blind-carbon-copy recipients, if configured |
| `reply_to` | Reply-to address, if configured |
| `last_event` | Most recent recorded event for the email |
| `scheduled_at` | Scheduled sending time, when applicable |
| `message_id` | Message identifier associated with the email |
| `html` | HTML content, when present |
| `text` | Plain-text content, when present |

For the plain-text email used in this project, the response returned:

```text
last_event: "delivered"
html: null
text: "Hello from Resend!"
```

This indicates that the retrieved message contained plain-text rather than HTML
content and that its latest recorded event was `delivered`.

## Sending and retrieving are different operations

Sending an email:

```javascript
resend.emails.send()
```

creates an email and returns its ID.

Retrieving an email:

```javascript
resend.emails.get(emailId)
```

uses an existing ID to request information about that email.

Conceptually:

```text
emails.send()
     ↓
POST /emails
     ↓
Email created
     ↓
Email ID returned


emails.get(emailId)
     ↓
GET /emails/{email_id}
     ↓
Email information returned
```

The two operations can also require different API-key permissions.

## Handle an unknown email ID

If the requested email does not exist, Resend returns a `404` error.

For example:

```text
Error: {
  statusCode: 404,
  message: "Email not found",
  name: "not_found"
}
```

Check that:

- The email ID is correct.
- The ID has not been accidentally truncated or changed.
- You are using the intended Resend account and credentials.

For additional errors, see
[Troubleshoot Resend Errors](troubleshoot-errors.md).

## Next step

Continue to
[Understand API Key Permissions](api-key-permissions.md) to learn why different
credentials can produce different results for Resend API operations.