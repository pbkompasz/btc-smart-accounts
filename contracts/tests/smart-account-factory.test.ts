import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const wallet1 = accounts.get("wallet_1")!;

/*
  The test below is an example. To learn more, read the testing documentation here:
  https://docs.hiro.so/stacks/clarinet-js-sdk
*/

describe("example tests", () => {
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

  // it("shows an example", () => {
  //   const { result } = simnet.callReadOnlyFn("counter", "get-counter", [], address1);
  //   expect(result).toBeUint(0);
  // });
});
