import { adminAuth } from "@/firebase/firebase-admin-config";
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import generateHasuraJWT from "@/utils/generateHasuraJWT";

// API route to validate the Authorization Header

export async function GET(request: NextRequest): Promise<NextResponse> {
  const authorization = headers().get("Authorization");

  if (authorization?.startsWith("Bearer ")) {
    const sessionCookie = authorization.split("Bearer ")[1];

    try {
      await adminAuth.verifySessionCookie(sessionCookie);
      const response = new NextResponse(
        JSON.stringify({ message: "successful validation!" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Return the response with the Hasura JWT token
      return response;
    } catch (error) {
      console.error("Failed to validate session cookie:", error);
      return new NextResponse(
        JSON.stringify({
          error: "Failed to validate session cookie",
        }),
        { status: 401 }
      );
    }
  }

  return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
  });
}
