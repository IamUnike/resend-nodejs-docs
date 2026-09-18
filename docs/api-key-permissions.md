# Understand API Key Permissions

Resend API keys authenticate requests and control which operations an
application can perform.

Choosing the appropriate permissions limits what a credential can do if it is
accidentally exposed or misused.

## Authentication and authorization

Authentication answers:

> Is this a valid Resend API key?

Authorization answers:

> Is this API key allowed to perform this operation?

The distinction becomes important when troubleshooting API requests.

For example, an invalid API key can produce:

```text
401
API key is invalid
```

A valid key without sufficient permissions can also produce a `401` response,
but with a different error:

```text
401
restricted_api_key
This API key is restricted to only send emails
```

In the second case, authentication succeeded far enough for Resend to identify
the key and its restrictions, but the credential does not have permission to
perform the requested operation.

## Choose API key permissions

When creating an API key in Resend, choose permissions based on what the
application needs to do.

For an application that only sends email, a key with **Sending Access** is
usually more appropriate than a broadly privileged key.

For example:

```text
Application only sends email
        ↓
Sending Access
        ↓
resend.emails.send()
```

If your application also performs operations that require broader permissions,
use a key with the necessary access.

During testing for this documentation, a Sending Access key successfully sent
email but could not retrieve an email:

```text
Sending Access key
        │
        ├── Send email       ✓
        │
        └── Retrieve email   ✗
                              ↓
                       401 restricted_api_key
```

A key with sufficient permissions was required for the retrieval operation.

> [!TIP]
> Grant an API key only the permissions required by the application. Avoid
> choosing broader access simply because it is more convenient during
> development.

## Store API keys outside source code

Do not place an API key directly in your JavaScript:

```javascript
// Do not do this.
const resend = new Resend("re_actual_api_key");
```

Hard-coded credentials can accidentally be exposed through:

- Git commits.
- Public repositories.
- Code reviews.
- Shared files.
- Logs or screenshots.

Instead, store the credential in an environment variable.

For local development, your `.env` file can contain:

```text
RESEND_API_KEY=re_your_api_key_here
```

Then load the value in your application:

```javascript
require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
```

The application receives the credential at runtime without embedding it in the
source file.

## Exclude `.env` from Git

Add `.env` to `.gitignore`:

```gitignore
.env
node_modules/
```

Before committing changes, run:

```bash
git status
```

Verify that `.env` is not listed among the files Git will track.

> [!IMPORTANT]
> Adding `.env` to `.gitignore` does not remove a secret that has already been
> committed. If an API key is accidentally exposed, revoke or rotate the key
> in Resend and replace it with a new credential.

## Use separate keys when appropriate

Different applications or environments should not automatically share the same
API key.

For example:

```text
Application A ──→ API key A

Application B ──→ API key B
```

Using separate credentials can make it easier to:

- Grant different permissions.
- Revoke one application's access without affecting another.
- Identify which credential is being used.
- Rotate credentials independently.

The same principle can be applied when development and production environments
have different security requirements.

## Diagnose permission errors

If a request returns:

```text
401
restricted_api_key
```

check the permissions assigned to the API key before changing application
code.

The request itself may be valid while the credential lacks permission for the
operation.

Do not automatically solve the problem by granting the broadest available
access. Determine what permission the operation requires and grant only the
access necessary for the application.

For other authentication and request failures, see
[Troubleshoot Resend Errors](troubleshoot-errors.md).

## Next step

Continue to
[Troubleshoot Resend Errors](troubleshoot-errors.md) for solutions to the
authentication, permission, validation, testing-domain, and resource errors
that can occur while working with the Resend API.
