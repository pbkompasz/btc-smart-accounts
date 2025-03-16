import { beforeAll, describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";
import crypto, { sign } from "node:crypto";
import secp256k1 from "secp256k1";

const accounts = simnet.getAccounts();
const wallet1 = accounts.get("wallet_1")!;

/*
  The test below is an example. To learn more, read the testing documentation here:
  https://docs.hiro.so/stacks/clarinet-js-sdk
*/

describe("smart-account", () => {
  beforeAll(async () => {
    const sourceCode = `
    ;; title: smart-account
    ;; version:
    ;; summary: This the account entrypoint
    ;; description:   i.e. an account w/ social recovery, sub-accounts and sessions

    ;; traits
    ;;
    (define-trait account
        (

          ;; @param signature
          ;; @param name
          ;; @param type
          ;; @returns sub-account address
          (create-sub-account ((buff 40) (string-utf8 100) uint) (response uint uint))

          ;; @returns eventId
          (destroy-sub-account (uint) (response uint uint))

          ;; Authenticate user
          ;; @param proof
          (authenticate ((buff 40)) (response uint uint))

          ;; @param pubkey
          ;; @param signature
          ;; @param duration
          (call ((buff 40) (buff 100) uint) (response uint uint))

          ;; @param signature
          ;; @param transaction TODO Figure this out
          (submit-transaction ((buff 100) (buff 100)) (response uint uint))
          
          ;; @param signature
          (create-safe ((buff 40)) (response principal uint))

          ;; @param signature
          ;; @param transaction TODO Figure this out
          (transfer-to-safe ((buff 100) (buff 100)) (response uint uint))

          ;; @param auth type
          ;; @param signature
          ;; @param transaction TODO Figure this out
          (transfer-to-eoa (principal uint (buff 100) (buff 100)) (response uint uint))


          (is-contract-new () (response bool uint))
        )
    )

    ;; token definitions
    ;;

    ;; constants
    ;;

    ;; data vars
    ;;
    (define-data-var accounts-amount uint u0)
    (define-data-var init bool false)

    ;; Each authentication assumes that a user signs the nonce and the nonce is increased
    (define-data-var nonce uint u0)

    ;; data maps
    ;;
    (define-map accounts (buff 65) { account-name : (string-ascii 40) })
    (define-map sub-accounts int { name: (string-ascii 40), type: uint })

    ;; public functions
    ;;

    ;; @params pub-key Compressed public-key
    (define-public (add-new-pub-key-to-account (name (string-ascii 40)) (current-pub-key (buff 33)) (new-pub-key (buff 33)) (signature (buff 65)))
      (let
        ;; Verify ownership of account
        (
          (signer-public-key (unwrap!  (secp256k1-recover? (sha256 new-pub-key) signature) (err "error recovering pub key")))
        )
        (asserts! (is-eq current-pub-key signer-public-key) (err "not the owner"))
        (asserts! (> (len name) u0) (err "empty name"))
        
        (print (concat "Submit new public key for " name)) 
        (map-set accounts new-pub-key { account-name: name })
        (var-set accounts-amount (+ (var-get accounts-amount) u1))
        (ok (var-get accounts-amount))
      )
    )


    ;; @param signature
    ;; @param name
    ;; @param type
    ;; @returns sub-account address
    (define-public (create-sub-account (signature (buff 40)) (name (string-utf8 100)) (type uint)) (ok true))

    ;; @returns eventId
    (define-public (destroy-sub-account (sub-account-id uint)) (ok true))

    ;; Authenticate user
    ;; @param proof
    ;; @param auth-type
    (define-public (authenticate (proof (buff 40)) (auth-type uint)) (ok true))

    ;; @param pubkey
    ;; @param signature
    ;; @param duration
    (define-public (create-session (pub-key (buff 40)) (signature (buff 100)) (duration uint))  (ok true))

    ;; @param signature
    (define-public (create-safe (signature (buff 40))) (ok true))

    ;; @param signature
    (define-public (transfer-to-safe (signature (buff 100)) (amount uint)) (ok true))

    ;; @param signature
    ;; @param transaction TODO Figure this out
    (define-public (transfer-to-eoa (eoa-address principal) (signature (buff 100))) (ok true))

    ;; This has to be SIP-005 compatible; https://github.com/stacksgov/sips/blob/main/sips/sip-005/sip-005-blocks-and-transactions.md
    (define-public (call (owner principal)
                          (authType uint)
                          (signature (buff 100))
                          (transaction (buff 100))
                          (requested-session-key (buff 33))) 
        (let
          ;; Deconstruct the transaction
          ((t (from-consensus-buff? { to: principal, amount: int } transaction)))
          (get to t)
          (get amount t)

          ;; Submit transaction

          (ok u1))
    )

    (define-public (is-contract-new) (ok (var-get init)))

    ;; read only functions
    ;;

    ;; private functions
    ;;
  `;

    simnet.deployContract(
      "smart-account-asd",
      sourceCode,
      null,
      simnet.deployer
    );
  });
  it("it should create a new account", () => {
    // Compressed public key
    const publicKey = new Uint8Array(new ArrayBuffer(33));
    const resp = simnet.callPublicFn(
      "smart-account-factory",
      "create-account",
      [
        Cl.stringAscii("my account"),
        Cl.buffer(publicKey),
        // TODO Use newly deployed contract (maybe read-block something...)
        Cl.contractPrincipal(
          "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
          "smart-account"
        ),
        Cl.principal("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"),
      ],
      wallet1
    );
    expect(resp.result).toBeOk(Cl.uint(1));

    const account = simnet.callReadOnlyFn(
      "smart-account-factory",
      "get-account",
      [Cl.buffer(publicKey)],
      wallet1
    );
    expect(account.result).toBeSome(
      Cl.tuple({
        "account-name": Cl.stringAscii("my account"),
        address: Cl.principal("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"),
      })
    );

    const totalAccounts = simnet.getDataVar(
      "smart-account-factory",
      "accounts-amount"
    );
    expect(totalAccounts).toBeUint(1);
  });

  it("should authenticate w/ passkeys(encryption variant)", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("should get read-only data", () => {
    let privateKey;
    do {
      privateKey = crypto.randomBytes(32);
    } while (!secp256k1.privateKeyVerify(privateKey));

    // Generate the compressed (33-byte) public key
    const publicKey = secp256k1.publicKeyCreate(privateKey, true); // true for compressed

    // const publicKey = Buffer.from('0xde5b9eb9e7c5592930eb2e30a01369c36586d872082ed8181ee83d2a0ec20f04');
    let resp = simnet.callPublicFn(
      "smart-account-factory",
      "create-account",
      [
        Cl.stringAscii("my account"),
        Cl.buffer(publicKey),
        // TODO Use newly deployed contract (maybe read-block something...)
        Cl.contractPrincipal(
          "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
          "smart-account"
        ),
        Cl.principal("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"),
      ],
      wallet1
    );
    expect(resp.result).toBeOk(Cl.uint(1));

    const account = simnet.callReadOnlyFn(
      "smart-account-factory",
      "get-account",
      [Cl.buffer(publicKey)],
      wallet1
    );

    // TODO Deploy contract and pass the principal
    simnet.callPublicFn(
      "smart-account",
      "init-account",
      [Cl.buffer(publicKey)],
      wallet1
    );

    const message = "Hello, blockchain!";
    const messageHash = crypto.createHash("sha256").update(message).digest();
    const signature = secp256k1.ecdsaSign(messageHash, privateKey);

    resp = simnet.callPublicFn(
      "smart-account",
      "authenticate",
      [Cl.buffer(messageHash), Cl.buffer(Buffer.from(signature.signature)), Cl.uint(0), Cl.buffer(publicKey)],
      wallet1
    )

    expect(resp.result).toBeOk(Cl.bool(true));

 

    const subAccountsCount = simnet.callReadOnlyFn(
      "smart-account",
      "get-total-sub-accounts",
      [],
      wallet1
    );

    expect(subAccountsCount.result).toBeOk(Cl.int(1));

    const subAccount = simnet.callPublicFn(
      "smart-account",
      "create-sub-account",
      [Cl.buffer(messageHash), Cl.buffer(Buffer.from(signature.signature)), Cl.stringAscii('sub-acc'), Cl.buffer(publicKey), Cl.uint(0)],
      wallet1
    );
    
    expect(subAccount.result).toBeOk(Cl.int(1));

    // const subAccounts = [firstSubAccount];
    //       for (let index = firstSubAccount.result + 1; index < subAccountsCount.result; index++) {
    //     const subAccount= simnet.callReadOnlyFn(
    //         "smart-account",
    //         "get-total-sub-accounts",
    //         [],
    //         wallet1,
    //       )
    //       subAccounts.push(subAccount);
  });

  it("should execute a simple transaction", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("should create sub-account w/ session", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("should create safe and transfer tokens", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("should try sessions", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it.skip("should authenticate w/ passkeys", () => {
    expect(simnet.blockHeight).toBeDefined();
  });
});
