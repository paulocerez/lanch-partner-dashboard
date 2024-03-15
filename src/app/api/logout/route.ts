import { adminAuth } from "@/firebase/firebase-admin-config";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { useAuth } from "@/app/context/AuthContext";

// const { setHasuraToken } = useAuth();

export async function POST(request: NextRequest) {
  cookies().delete("session");
  //   setHasuraToken(null);

  return NextResponse.json({ isLogged: false }, { status: 200 });
}
