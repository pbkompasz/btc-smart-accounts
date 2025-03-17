import { NextResponse } from "next/server";
import { submitTransaction } from "~/lib/web3";

export async function GET() {
  return NextResponse.json({ message: "Hello, Next.js API!" });
}

let commands = [];

export async function POST(req: Request) {
  // TODO Validate passkey
  const { signature } = await req.json();

  const exists = false;
  const user = {
    id: "asd",
    salt: "salt",
  };

  const newUser = {
    id: "asd-new",
    salt: "salty",
  };

  let transaction;
  if (exists) {
    // TODO Check if user exists in DB
    // Fetch user and salt if true
    transaction = { id: user.id, salt: user.salt };
  } else {
    // Otherwise create new user
    transaction = { id: newUser.id, salt: newUser.salt };
    // TODO Store in DB
  }

  // Return salt
  return NextResponse.json(transaction, { status: 201 });
}
