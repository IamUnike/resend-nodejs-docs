# Resend Node.js Developer Guide

An independent developer documentation project demonstrating how to integrate
the Resend email API into a Node.js application.

The documentation is based on hands-on testing with the official Resend
Node.js SDK and covers setup, sending and retrieving email, API-key
permissions, and common integration errors.

> [!NOTE]
> This is an independent technical writing portfolio project and is not
> official Resend documentation.

## Documentation

### Get started

- [Get Started with Resend and Node.js](docs/getting-started.md)
- [Send Your First Email](docs/send-email.md)

### Work with email resources

- [Retrieve an Email](docs/retrieve-email.md)

### Security and troubleshooting

- [Understand API Key Permissions](docs/api-key-permissions.md)
- [Troubleshoot Resend API Errors](docs/troubleshoot-errors.md)

## Developer journey

The documentation follows a developer from initial setup through successful
API interaction and troubleshooting:

```text
Set up Node.js
      ↓
Configure API credentials
      ↓
Send an email
      ↓
Capture the email ID
      ↓
Verify delivery
      ↓
Retrieve the email
      ↓
Diagnose API errors
```

## What I tested

The documentation was developed through hands-on interaction with the Resend
Node.js SDK rather than from documentation alone.

Testing included:

- Installing and configuring the Resend Node.js SDK.
- Loading API credentials from environment variables.
- Sending HTML email.
- Sending plain-text email.
- Receiving an email ID from a successful request.
- Verifying sent, delivered, and opened events.
- Retrieving an email by ID.
- Testing Sending Access and broader API-key permissions.
- Reproducing authentication, authorization, validation, testing-domain, and
  resource-not-found errors.

## Verified error scenarios

| Scenario | HTTP status | Observed error |
| --- | ---: | --- |
| Invalid API key | `401` | `validation_error` |
| Insufficient API-key permission | `401` | `restricted_api_key` |
| Testing sender used with another recipient | `403` | `validation_error` |
| Unknown email ID | `404` | `not_found` |
| Invalid recipient format | `422` | `validation_error` |
| Missing subject | `422` | `validation_error` |

See [Troubleshoot Resend API Errors](docs/troubleshoot-errors.md) for causes
and resolutions.

## Example code

The [`examples`](examples/) directory contains sanitized versions of the
Node.js scripts used during testing:

```text
examples/
├── send-email.js
└── get-email.js
```

Before using the examples, create your own `.env` file from `.env.example`
and replace the placeholder values with your credentials.

Never commit your `.env` file or API keys.

## Testing scope

Initial email tests use Resend's `onboarding@resend.dev` testing sender.

Testing confirmed that this sender can be used for initial integration testing
with the email address associated with the Resend account. Sending to other
recipients requires domain verification and a sender address associated with
the verified domain.

Custom-domain sending was not tested as part of this project.

This distinction separates behavior verified through hands-on testing from
functionality described but not exercised in the test environment.

## Repository structure

```text
resend-nodejs-docs/
├── docs/
│   ├── getting-started.md
│   ├── send-email.md
│   ├── retrieve-email.md
│   ├── api-key-permissions.md
│   └── troubleshoot-errors.md
├── examples/
│   ├── send-email.js
│   └── get-email.js
├── .env.example
├── .gitignore
└── README.md
```

## Documentation approach

This project emphasizes:

- Task-oriented developer documentation.
- Hands-on technical verification.
- Reproducible code examples.
- Clear separation between authentication and authorization errors.
- Least-privilege API credential practices.
- Troubleshooting based on reproduced failures.
- Separation between verified behavior and untested functionality.
- Protection of credentials and personal test data.

## Skills demonstrated

- Developer documentation
- API and SDK documentation
- JavaScript and Node.js
- REST API concepts
- Authentication and authorization
- Error documentation
- Technical troubleshooting
- Markdown
- Git and GitHub
- Docs-as-Code
- Technical verification
- Information architecture

## Disclaimer

This repository is an independent documentation sample created for technical
writing and educational purposes.

Resend and its SDK are maintained by their respective owners. Refer to the
official Resend documentation for current product requirements and API
information.
