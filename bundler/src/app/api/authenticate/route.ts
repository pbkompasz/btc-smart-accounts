import { NextResponse } from "next/server";
import { submitTransaction } from "~/lib/web3";
import { Cl } from "@stacks/transactions";

export async function GET() {
  return NextResponse.json({ message: "Hello, Next.js API!" });
}

let commands = [];

export async function POST(req: Request) {
  const { signature, requestedSessionKey, msgHash, publicKey } =
    await req.json();

  const factoryTransactionData = {
    method: "get-account",
    contract: "smart-account-factory" as "smart-account-factory",
    functionArgs: [Cl.buffer(publicKey)],
  };

  const accountId = await submitTransaction({
    transactionData: factoryTransactionData,
  });
  if (!accountId) {
    return NextResponse.json(
      {
        error: "No account to authenticate into",
      },
      { status: 404 },
    );
  }

  const authTransactionData = {
    method: "authenticate",
    contract: "smart-account" as "smart-account",
    functionArgs: [
      Cl.buffer(msgHash),
      Cl.buffer(Buffer.from(signature.signature)),
      Cl.uint(0),
      Cl.buffer(requestedSessionKey),
    ],
  };

  try {
    const authResponse = await submitTransaction({
      transactionData: authTransactionData,
    });
    return NextResponse.json(
      {
        accountId: authResponse,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Authentication failed",
        txError: (error as Error).message,
      },
      { status: 404 },
    );
  }
}
