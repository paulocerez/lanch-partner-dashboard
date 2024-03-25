import { adminAuth } from "@/firebase/firebase-admin-config";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import generateHasuraJWT from "@/app/utils/generateHasuraJWT";

export async function POST(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");

    if (authorizationHeader?.startsWith("Bearer ")) {
      const idToken = authorizationHeader.split("Bearer ")[1];
      if (!idToken) {
        return new NextResponse(
          JSON.stringify({ message: "No token provided" }),
          { status: 401 }
        );
      }

      // Verify Firebase ID Token and extract UID
      const decodedToken = await adminAuth.verifyIdToken(idToken);

      // Generate a new JWT for Hasura with custom claims
      const jwtToken = generateHasuraJWT(decodedToken.uid);

      // Return the Hasura JWT token
      return new NextResponse(JSON.stringify({ jwtToken }), { status: 200 });
    } else {
      return new NextResponse(
        JSON.stringify({
          message:
            "Authorization header is missing or not in the correct format",
        }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
