import { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "@/firebase/firebase-admin-config";
import { generateHasuraToken } from "@/utils/jwt"; // You need to create this utility
import { NextRequest } from "next/server";

export default async function signup(req: NextRequest) {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    const jwtToken = generateHasuraToken({
      // Define the user's Hasura roles here
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": decodedToken.uid,
        // ... any other Hasura claims
      },
    });

    // Return the JWT token to the client
    return res.status(200).json({ jwtToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
