import { StacksNetworkName } from "@stacks/network";
import {
  broadcastTransaction,
  Cl,
  makeContractCall,
  makeSTXTokenTransfer,
} from "@stacks/transactions";
import { generateWallet, Wallet } from "@stacks/wallet-sdk";

let wallet: Wallet;

export const createWallet = async () => {
  const seedPhrase = process.env.BUNDLER_SEED_PHRASE;

  if (!seedPhrase) {
    return;
  }

  wallet = await generateWallet({
    secretKey: seedPhrase,
    password: "secret",
  });

  return wallet;
};

type TransactionData = {
  contract: 'smart-account' | 'smart-account-factory',
  method: string,
  functionArgs: any[],
}

// TODO Post condition
export const submitTransaction = async ({
  transactionData,
}: {
  transactionData: TransactionData;
}) => {
  if (!wallet) {
    await createWallet();
  }
  if (!process.env.ENTRYPOINT_ADDRESS) {
    return;
  }

  const { functionArgs } = transactionData;
  const txOptions = {
    contractAddress: process.env.ENTRYPOINT_ADDRESS,
    contractName: "smart-account",
    functionName: "call",
    // TODO Submit it from the sdk like this [Cl.bufferFromUtf8('foo string')],
    functionArgs: functionArgs,
    validateWithAbi: true,
    senderKey: wallet.configPrivateKey,
    network: "devnet" as StacksNetworkName,
  };

  const transaction = await makeContractCall(txOptions);

  // to see the raw serialized tx
  const serializedTx = transaction.serialize();

  // broadcast to the network
  const response = await broadcastTransaction({
    transaction,
    network: "devnet",
  });
  console.log(response.txid);

  return response.txid;
};
