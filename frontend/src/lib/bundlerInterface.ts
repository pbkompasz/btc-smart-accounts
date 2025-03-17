import axios from "axios";
import { signWithMainAccount, signWithSubAccount } from "./account";

const BUNDLER_ENDPOINT = "http://localhost:3000";

const client = axios.create({
  baseURL: BUNDLER_ENDPOINT,
});

export const sendRequestToBundler = async (
  type: "auth" | "auth-init" | "read" | "execute",
  accountId: number,
  transactionData: any[],
  requrestedSessionKey: Buffer
) => {
  // Main account

  let resp, signature;

  switch (type) {
    case "auth-init":
      signature = await signWithMainAccount("CREATE ACCOUNT");

      resp = await client.post("authentication/init", {
        signature,
      });
      return resp.data.salt;

    case "auth":
      signature = await signWithMainAccount("LET ME IN");

      resp = await client.post("authentication", {
        signature,
      });
      return resp.data.isOk;

    case "read":
      return;

    case "execute":
      if (accountId !== -1) {
        signature = signWithSubAccount(accountId, transactionData);
      } else {
        signature = signWithMainAccount(JSON.stringify(transactionData));
      }

      resp = await client.post("call", {
        signature,
        transaction: transactionData,
        requrestedSessionKey,
        accountId,
      });

      return resp.data.result;

    default:
      break;
  }
};
