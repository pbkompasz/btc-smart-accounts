# Bundler


This package provides an API that frontends can use to read blockchain data, authenticate and send transactions.
Available API endpoints:

`POST /authenticate/init`  
  Initiate an account authentication session. The bundler fetches or creates a user record and returns a salt, which users use to create the authentication key.

`POST /authenticate`
  Authenticate a user and optionally request a new session key for a sub-account.

`POST /call`
  Submit any transaction to the blockchain. The message has to contain a valid signature, the account that submits the transaction and the transaction information in SIP-005 compatible serialization.

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

The bundler is a component that is used by the service provider manage the accounts.
It receives operations and submits them on behalf of a user.
From here you can pregenrate accounts for a user.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
