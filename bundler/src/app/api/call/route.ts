import { Cl } from "@stacks/transactions";
import { NextResponse } from "next/server";
import { submitTransaction } from "~/lib/web3";

export async function GET() {
  return NextResponse.json({ message: "Submit transaction data" });
}

let commands = [];

export async function POST(req: Request) {
  const {
    signature,
    transaction,
    transactionHash,
    requestedSessionKey,
    accountId,
  } = await req.json();
  // Verify inputs are valid
  const txid = await submitTransaction({
    transactionData: {
      // Fetch actual contract from DB
      contract: "smart-account",
      method: "call",
      functionArgs: [
        Cl.uint(0),
        Cl.buffer(signature),
        Cl.buffer(transaction),
        Cl.buffer(transactionHash),
        Cl.buffer(requestedSessionKey ?? new Buffer(33)),
        Cl.int(accountId),
      ],
    },
  });

  // TODO Store in database
  const newTransaction = { id: commands.length, signature, txid };
  return NextResponse.json(newTransaction, { status: 201 });
}
