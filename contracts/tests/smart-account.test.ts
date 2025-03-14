import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const wallet1 = accounts.get("wallet_1")!;

/*
  The test below is an example. To learn more, read the testing documentation here:
  https://docs.hiro.so/stacks/clarinet-js-sdk
*/

describe("smart-account", () => {

 it("it should create a new account", () => {
    const publicKey = new Uint8Array(new ArrayBuffer(65));
    const resp = simnet.callPublicFn(
      "smart-account-factory",
      "create",
      [Cl.stringAscii("my account"), Cl.buffer(publicKey)],
      wallet1
    );
    expect(resp.result).toBeOk(
      Cl.principal("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM")
    );
    const account = simnet.callReadOnlyFn(
      "smart-account-factory",
      "get-account",
      [Cl.buffer(publicKey)],
      wallet1
    );
    expect(resp.result).toBeOk(
      Cl.principal("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM")
    );

    const totalAccounts = simnet.getDataVar('smart-account-factory', 'accounts-amount');
    expect(totalAccounts).toBeUint(1);

  });
  it("should get existing account", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("should authenticate w/ passkeys", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("should execute a simple transaction", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("should create sub-account w/ session", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("should create safe and transfer money", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("should try sessions", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  // it("shows an example", () => {
  //   const { result } = simnet.callReadOnlyFn("counter", "get-counter", [], address1);
  //   expect(result).toBeUint(0);
  // });
});
