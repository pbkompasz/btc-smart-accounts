# BTC Access

## Overview

Our goal with BTC Access is to create an easy and secure way to manage assets and interact with the Bitcoin ecosystem. To achieve this, we introduce Account Abstraction, a new paradigm that replaces the traditional externally owned account (EOA) with a smart account-based wallet.

With account abstraction, users can interact with any cryptographic signature scheme and customize their wallets in various ways.

## Smart Accounts

We propose Smart Accounts, which decompose the traditional wallet into three distinct parts:

- Main Account – Handles transaction signing, authentication, and asset transfers between sub-accounts.
- Sub-Accounts – Temporary accounts created for specific purposes, with limited assets.
- Safe – A long-term storage account, accessible only via the Main Account.

For authentication, we leverage passkeys and session keys:

- Passkeys: The primary entry point into an account.
- Session Keys: Linked to sub-accounts, enabling seamless transactions.
  To confirm a transaction, a user can either:

Sign the transaction with a passkey, or

1. Use a session key to transmit authorization.
2. This approach minimizes friction, making Bitcoin UX more intuitive and secure.

## Developer Integration: 3 Simple Steps

Integrating BTC Access into an application is straightforward:

### 1. Wrap Your Application in a Provider

```tsx
<SmartAccountProvider>
  <App />
</SmartAccountProvider>
```

### 2. Inject the Authentication Modal

```tsx
<button onClick={() => setShowModal(true)}>Sign in</button>
```

### 3. Use Our Custom Hook to Submit a Transaction

```tsx
const [transfer, isSubmitted, isLoading, isSuccess, isError] = sendBTC(
  RECEIVER_ADDRESS,
  0.01,
  account: "MAIN"// Or specify a sub-account e.g. "SHOPPING-1"
);

// Render UI based on transaction status

{
  !isSubmitted ? (
    <button onClick={() => transfer()}>Send BTC</button>
  ) : (
    <>{isSuccess ? "Congrats! Transaction Successful." : "Processing..."}</>
  );
}
```

This approach ensures a seamless and developer-friendly experience while enhancing Bitcoin wallet security and usability.

## Architecture

![Alt text](images/auth-flow.png)

## Roadmap

| Features                      | Component Status  | Integration Status |
| ----------------------------- | ----------------- | ------------------ |
| Passkeys authentication (v1)  | ✅ Completed      | 🚧 In-development  |
| Passkeys authentication (v2)  | 🚧 In-development | ❌ Not started     |
| Account dashboard             | 🚧 In-development | 🚧 In-development  |
| Bundler dashboard             | ❌ Not started    | ❌ Not started     |
| Session keys                  | 🚧 In-development | 🚧 In-development  |
| Various DIDs authentication   | ❌ Not started    | ❌ Not started     |
| Frontend SDK                  | 🚧 In-development | ❌ Not started     |
| Backend SDK                   | 🚧 In-development | ❌ Not started     |
| Bundler as a deployed service | 🚧 In-development | ❌ Not started     |
| Social recovery               | ❌ Not started    | ❌ Not started     |
| The Safe                      | ❌ Not started    | ❌ Not started     |

## Authentication

Currently there is 1 authentication flow that is fully implemented with more planned including:

- [x] Derive a private key from a passkey credential
- [ ] Native passkey verification on-chain using P-256 verifier, see `contracts/contracts/auth/passkeysv2.clar`
- [ ] Verify email authentication permissionlessly, see [here](https://docs.zk.email/architecture/on-chain)
- [ ] Verify identity using your password, see [here](https://docs.self.xyz/technical-docs/architecture)
- [ ] Verify identity using Aadhaar ID, see [here](https://documentation.anon-aadhaar.pse.dev/docs/proof)

## Directory structure

Directory Structure

- **bundler**  
  Handles transaction submission on behalf of the user.  
  _Extra feature:_ Pre-generates wallets.

- **contracts**  
  Contains smart contracts, including:

  - `smart-account.clar`
  - `smart-account-factory.clar`
  - `safe.clar`
  - `authenticate.clar`
  - `256-lib/*.clar` including a contract to verify secp256r1 signatures on-chain.

- **frontend**  
  User interface for managing accounts.

- **sdk**  
  SDK for authentication and transaction implementation.

## How to run

In 3 different terminals run the following commands:

```bash
# 1
cd frontend
yarn
yarn run dev

# 2
cd bundler
./start-database.sh
yarn
yarn db:generate
yarn run dev

# 3, this might take longer
cd contracts
yarn
yarn run dev
```
