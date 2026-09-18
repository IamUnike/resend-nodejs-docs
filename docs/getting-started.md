# Get Started with Resend and Node.js

This guide shows you how to set up a Node.js project to send email with the
Resend SDK.

By the end of this guide, you will have a Node.js project configured with a
Resend API key stored as an environment variable.

## Prerequisites

Before you begin, make sure you have:

- A Resend account.
- Node.js and npm installed.
- A code editor or IDE.
- Access to a terminal.

Verify that Node.js and npm are installed:

```bash
node --version
npm --version
```

Both commands should return installed version numbers.

## Create a Node.js project

Create a directory for your project and move into it:

```bash
mkdir resend-email-project
cd resend-email-project
```

Initialize the project:

```bash
npm init -y
```

The command creates a `package.json` file containing the project's Node.js
configuration and dependencies.

## Install the Resend SDK

Install the Resend Node.js SDK:

```bash
npm install resend
```

The `resend` package provides the methods your application uses to interact
with the Resend API.

## Create an API key

Sign in to your Resend account and open **API Keys**.

Create an API key for your application.

If the application only needs to send email, use a key with **Sending Access**
rather than granting broader permissions.

> [!IMPORTANT]
> Treat an API key like a password. Do not include it directly in application
> source code or commit it to a Git repository.

## Store the API key in an environment variable

Install `dotenv`:

```bash
npm install dotenv
```

Create a `.env` file in the project root:

```text
RESEND_API_KEY=re_your_api_key_here
```

Replace `re_your_api_key_here` with your Resend API key.

Your application can now read the key from the `RESEND_API_KEY` environment
variable instead of storing the credential in source code.

## Protect the environment file

Create a `.gitignore` file and add:

```gitignore
.env
node_modules/
```

This prevents the `.env` file and installed dependencies from being added to
the Git repository.

Before committing your project, verify that `.env` is ignored:

```bash
git status
```

The `.env` file should not appear as an untracked or modified file.

## Project structure

Your project should now resemble:

```text
resend-email-project/
├── node_modules/
├── .env
├── .gitignore
├── package-lock.json
└── package.json
```

Your Node.js environment is now ready to use the Resend SDK.

## Next step

Continue to [Send Your First Email](send-email.md) to make your first request
with the Resend SDK.