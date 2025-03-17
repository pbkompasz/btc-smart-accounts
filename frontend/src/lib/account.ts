import secp256k1 from "secp256k1";
import crypto from "crypto";
import { Session } from "./session";
import { sendRequestToBundler } from "./bundlerInterface";
import { createCredential, derivePrivateKey } from "./authentication";

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
  config: AccountConfig;
  private synced: boolean = false;
  private inited: boolean = false;
  private privateKey!: Uint8Array<ArrayBuffer>;
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

  public async init() {
    if (this.inited) return;
    // Initiate the account creation process
    // Request salt from bundler
    const salt = await sendRequestToBundler("auth-init");
    // Create credential
    const credential = await createCredential(salt);
    // Derive a private key
    const privateKey = await derivePrivateKey(salt, credential); 

    if (!privateKey) {
      throw new Error("Cannot create private key");
    }
    this.privateKey = privateKey;
  }

  public async createSubAccount(
    type: SubAccountType,
    creationSignature: string
  ): Promise<SubAccount> {
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

export const signWithMainAccount = async (message: string) => {};
