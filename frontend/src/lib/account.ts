type AccountSession = {};
type AccountConfig = {};

type SubAccountType = "permanent" | "temporary";

export class SubAccount {
  type!: SubAccountType;
}

export class Account {
  session: AccountSession | undefined;
  config: AccountConfig;

  constructor(config: AccountConfig) {
    this.config = config;
  }

  /**
   * @summary Sync account from contract
   */
  private _sync() {}

  public async createSubAccount(type: SubAccountType): Promise<SubAccount> {
    return {
      type,
    };
  }

  public async destroySubAccount() {}

  public async fundSubAccount(subAccountId: string) {}

  // social recovery

  // safe
}
