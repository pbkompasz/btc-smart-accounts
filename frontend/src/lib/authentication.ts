// This is stored in a cookie
// This can be a mnemonic

export const createCredential = async (challenge: Buffer) => {
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

  return credential;
};

export const getCredential = async (challenge: Buffer) => {
  const publicKeyCredentialRequestOptions = {
    challenge: new Buffer(challenge),
    userVerification: "preferred" as UserVerificationRequirement,
    timeout: 60000,
  };

  const credential = await navigator.credentials.get({
    publicKey: publicKeyCredentialRequestOptions,
  });

  return credential;
};

export const derivePrivateKey = async (
  challenge: Buffer,
  credential?: CredentialType | null
) => {

  if (!credential) {
    // Request signature using WebAuthn
    credential = await createCredential(challenge);
  }

  if (!credential) return;

  // Extract signed response
  // @ts-expect-error
  const signedData = new Uint8Array(credential.response.signature);

  // Hash the signed data using SHA-256 to create a deterministic private key
  const hashBuffer = await crypto.subtle.digest("SHA-256", signedData);
  return new Uint8Array(hashBuffer);
};
