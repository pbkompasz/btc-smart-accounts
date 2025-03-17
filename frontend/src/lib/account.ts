import secp256k1 from "secp256k1";
import crypto from "crypto";
import { Session } from "./session";

type AccountSession = {};
type AccountConfig = {};

type SubAccountType = "permanent" | "temporary";

export class SubAccount {
  type!: SubAccountType;
  session!: Session;
  hasActiveSession: boolean = false;
  creationSignature: string;

  /**
   *
   * @summary The mainAccount creates this object and signs a createSignature message.
   *      This is sent by the sub-account object and that creates a new session object.
   * @param creationSignature
   */
  constructor(creationSignature: string) {
    this.creationSignature = creationSignature;
  }

  async signWithSubAccount(transactionData: any[]) {
    const transactionHash = crypto
      .createHash("sha256")
      .update(JSON.stringify(transactionData))
      .digest();

    return secp256k1.ecdsaSign(transactionHash, this.session.signature);
  }
}

export class Account {
  session: AccountSession | undefined;
  config: AccountConfig;
  private synced: boolean = false;
  subAccounts: Map<number, SubAccount> = new Map();

  constructor(config: AccountConfig) {
    this.config = config;
  }

  /**
   * @summary Sync account from bundler
   */
  private _sync() {
    this.synced = true;
  }

  public async createSubAccount(type: SubAccountType, creationSignature: string): Promise<SubAccount> {
    if (!creationSignature) {
      signWithMainAccount("LET ME IN");
    }
    return new SubAccount(creationSignature);
  }

  public getSubAccount(accountId: number): SubAccount | undefined {
    return this.subAccounts.get(accountId);
  }

  public async signWithSubAccount(transactionData: any[]) {
    const transactionHash = crypto
      .createHash("sha256")
      .update(JSON.stringify(transactionData))
      .digest();
  }

  public async destroySubAccount() {}

  public async fundSubAccount(subAccountId: number) {}

  // social recovery

  // safe
}

const account = new Account({});

export const signWithSubAccount = (
  accountId: number,
  transactionData: any[]
) => {
  const subAccount = account.getSubAccount(accountId);

  if (!subAccount) {
    throw new Error(`No sub-account with id: ${accountId}`);
  }

  const signature = subAccount.signWithSubAccount(transactionData);

  return signature;
};

export const  signWithMainAccount = async (message: string) => {

}
