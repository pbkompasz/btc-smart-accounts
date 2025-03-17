export class Session {
  signature!: Buffer;
  nonce!: number;

  /**
   * @summary This is more of a utility
   */
  buildSessionMiddleware() {}

  /**
   * @summary Steps:
   *      1. Read session nonce for current sub-account
   *      2. Sign the salt
   *      3. Signature is used to submit message to bundler
   */
  private async _sync() {}
}
