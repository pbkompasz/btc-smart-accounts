// This is stored in a cookie
// This can be a mnemonic

export const createCredential = async () => {
  const resp = await fetch("/authenticate/init");
  const serializedResp = await resp.json();
  const { challenge } = serializedResp;

  const publicKeyCredentialCreationOptions = {
    challenge: challenge.buffer,
    rp: {
      name: "Example Corp",
    },
    user: {
      id: new Uint8Array([
        /* user ID */
      ]).buffer,
      name: "john.doe@example.com",
      displayName: "John Doe",
    },
    pubKeyCredParams: [
      {
        type: "public-key" as "public-key",
        alg: -7, // ES256 algorithm
      },
    ],
    timeout: 60000,
    attestation: "none" as AttestationConveyancePreference,
  };

  const credential = await navigator.credentials.create({
    publicKey: publicKeyCredentialCreationOptions,
  });

  if (!credential) return;
};

export const getCredential = async () => {
  let challenge = localStorage.getItem("challenge");
  // Check if challenge is stored locally
  if (!challenge) {
    const resp = await fetch("/authenticate");
    const serializedResp = await resp.json();
    challenge = serializedResp.challenge as string;
  }

  // Otherwise fetch challenge from the bundler

  const publicKeyCredentialRequestOptions = {
    challenge: new Buffer(challenge),
    userVerification: "preferred" as UserVerificationRequirement,
    timeout: 60000,
  };

  const credential = await navigator.credentials.get({
    publicKey: publicKeyCredentialRequestOptions,
  });
};
