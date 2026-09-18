# Troubleshoot Resend API Errors

This guide explains common errors you may encounter when sending or retrieving
email with the Resend Node.js SDK.

The examples focus on authentication, permissions, request validation, testing
restrictions, and email retrieval.

## Quick reference

| Status | Error or message | Common cause |
| --- | --- | --- |
| `401` | `API key is invalid` | Invalid API key |
| `401` | `restricted_api_key` | API key lacks permission for the operation |
| `403` | Testing email restriction | Testing sender used with another recipient |
| `404` | `not_found` | Requested email does not exist |
| `422` | Invalid `to` field | Recipient address is malformed |
| `422` | Missing `subject` field | Required subject was omitted |

The HTTP status alone may not identify the problem. Check the error name and
message returned with the response.

## 401: API key is invalid

### Symptom

The request returns:

```text
Error: {
  statusCode: 401,
  name: "validation_error",
  message: "API key is invalid"
}
```

### Cause

Resend cannot authenticate the request with the API key provided by the
application.

Possible reasons include:

- The API key is incorrect.
- The key was copied incompletely.
- The key has been revoked or replaced.
- The application is loading a different environment variable than expected.

### Resolution

Verify that your `.env` file contains the expected variable:

```text
RESEND_API_KEY=re_your_api_key_here
```

Then verify that the application reads the same variable:

```javascript
const resend = new Resend(process.env.RESEND_API_KEY);
```

Do not print the complete API key to the terminal while troubleshooting.

If the credential has been exposed or you cannot determine whether it is
still trustworthy, revoke or rotate it in Resend and update your environment
with the replacement.

## 401: `restricted_api_key`

### Symptom

An operation returns:

```text
Error: {
  statusCode: 401,
  message: "This API key is restricted to only send emails",
  name: "restricted_api_key"
}
```

### Cause

The API key is valid but does not have sufficient permission for the requested
operation.

For example, a key with Sending Access can be used to send an email, but it
cannot be used to retrieve an email.

### Resolution

Check the permissions assigned to the API key and compare them with the
operation your application needs to perform.

Use a credential with the required permission.

Do not grant broader access than the application requires simply to eliminate
the error.

For more information, see
[Understand API Key Permissions](api-key-permissions.md).

## 403: You can only send testing emails to your own email address

### Symptom

Sending from `onboarding@resend.dev` to another valid recipient returns a
`403` error similar to:

```text
You can only send testing emails to your own email address.
```

The response may also instruct you to verify a domain and change the `from`
address.

### Cause

`onboarding@resend.dev` is intended for testing a Resend integration. When
using the testing sender, you cannot use it as a general-purpose sender for
arbitrary recipients.

### Resolution

For initial testing, set `to` to the email address associated with your Resend
account.

For example:

```javascript
const { data, error } = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "YOUR_RESEND_ACCOUNT_EMAIL",
  subject: "Resend test",
  text: "Hello from Resend!",
});
```

To send email to other recipients, verify a domain in Resend and use a sender
address associated with that domain.

For example:

```text
notifications@example.com
```

Do not use an address on a domain you do not control.

## 404: Email not found

### Symptom

Retrieving an email returns:

```text
Error: {
  statusCode: 404,
  message: "Email not found",
  name: "not_found"
}
```

### Cause

Resend cannot find an email corresponding to the supplied ID.

The ID may be:

- Incorrect.
- Incomplete.
- Accidentally modified.
- Associated with a different account or context.

### Resolution

Check the ID returned when the email was created:

```text
Email sent: { id: "01xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }
```

Use that value with:

```javascript
resend.emails.get("01xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
```

If you copied the ID manually, check for missing or changed characters.

## 422: Invalid `to` field

### Symptom

The request returns:

```text
Error: {
  statusCode: 422,
  name: "validation_error",
  message: "Invalid `to` field. The email address needs to follow the `email@example.com` or `Name <email@example.com>` format."
}
```

### Cause

The value supplied in `to` is not a valid email-address format.

For example:

```javascript
to: "not-an-email-address",
```

### Resolution

Provide a properly formatted email address:

```javascript
to: "user@example.com",
```

or a name and address:

```javascript
to: "Example User <user@example.com>",
```

If you are using `onboarding@resend.dev`, remember that a correctly formatted
address can still produce a `403` error when it is not the email address
allowed for testing. Format validation and testing-sender restrictions are
separate issues.

## 422: Missing `subject` field

### Symptom

The request returns:

```text
Error: {
  statusCode: 422,
  name: "validation_error",
  message: "Missing `subject` field."
}
```

### Cause

The email request does not contain the required `subject` field.

For example:

```javascript
const { data, error } = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "YOUR_RESEND_ACCOUNT_EMAIL",
  text: "Hello from Resend!",
});
```

### Resolution

Add a subject:

```javascript
const { data, error } = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "YOUR_RESEND_ACCOUNT_EMAIL",
  subject: "Resend test",
  text: "Hello from Resend!",
});
```

Run the request again.

## Read the complete error response

Different problems can return the same HTTP status or error name.

For example, during testing both of these requests returned `401`:

```text
Invalid API key
    ↓
401 validation_error
    ↓
"API key is invalid"


Valid sending-only key
    ↓
401 restricted_api_key
    ↓
"This API key is restricted to only send emails"
```

Similarly, multiple request-validation problems can return `422
validation_error`.

When troubleshooting, inspect:

1. The HTTP status code.
2. The error `name`.
3. The error `message`.
4. The operation your application attempted.
5. The permissions assigned to the API key.

Do not diagnose the problem from the status code alone.

## Protect credentials while troubleshooting

Do not paste API keys into:

- Error reports.
- GitHub issues.
- Screenshots.
- Logs intended for sharing.
- Documentation examples.

If you accidentally expose an API key, revoke or rotate it rather than relying
only on deleting the visible copy.

## Related guides

- [Get Started with Resend and Node.js](getting-started.md)
- [Send Your First Email](send-email.md)
- [Retrieve an Email](retrieve-email.md)
- [Understand API Key Permissions](api-key-permissions.md)
