// -> /api/create-chat

import { getErrorMessage } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log(file_key, file_name);
    return NextResponse.json({ message: "Success" });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.log(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
