import { adminAuth } from "@/firebase/firebase-admin-config";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import generateHasuraJWT from "@/app/utils/generateHasuraJWT";

export async function POST(req: NextRequest) {
  try {
    const authorizationHeader = headers().get("Authorization");

    if (authorizationHeader?.startsWith("Bearer ")) {
      const idToken = authorizationHeader.split("Bearer ")[1];
      if (!idToken) {
        return new NextResponse(
          JSON.stringify({ message: "No token provided" }),
          { status: 401 }
        );
      }

      const decodedToken = await adminAuth.verifyIdToken(idToken);
      const jwtToken = generateHasuraJWT(decodedToken.uid);
      console.log(jwtToken);
      return new NextResponse(JSON.stringify({ jwtToken }), { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
