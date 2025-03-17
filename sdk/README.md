# SDK

The SDK consists of two parts:
  - the frontend SDK implements authentication, initiating transaction, interface with the bundler, etc.
  - the backend SDK can be used to pregenerate wallets, send airdrops, etc.

## Frontend

The SDK should be simple for a non-web3 developer to understand.
A middleware that sends the authToken & refreshToken.
GET request read data, POST request submit data, PUT requests modify data.
An object keeps track of sessions and accounts.
Everything else is built dynamically, which is safe e.g. BYBIT hack and easy for the developer.

## Backend

This SDK is used to pregenerate wallets, and interact w/ your users.
