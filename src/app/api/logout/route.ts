import { adminAuth } from "@/firebase/firebase-admin-config";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  cookies().delete("session");

  return NextResponse.json({ isLogged: false }, { status: 200 });
}
