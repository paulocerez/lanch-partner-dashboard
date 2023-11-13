import { adminAuth } from "@/firebase/firebase-admin-config";

// import { customInitApp } from "@/lib/firebase-admin-config";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("GET request", request);

  return NextResponse.json({ isLogged: true }, { status: 200 });
}

export async function POST(request: NextRequest, response: NextResponse) {
  console.log("POST request", request);

  return NextResponse.json({ hello: "world" }, { status: 200 });
}
