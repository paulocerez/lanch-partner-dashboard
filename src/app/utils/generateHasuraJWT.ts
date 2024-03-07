// utils/generateHasuraJWT.js
import jwt from "jsonwebtoken";

interface HasuraClaims {
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": string[];
    "x-hasura-default-role": string;
    "x-hasura-user-id": string;
  };
}

interface JWTPayload {
  sub: string; // The subject of the JWT (the user ID in this case)
  iat: number; // Issued at time
  "https://hasura.io/jwt/claims": HasuraClaims["https://hasura.io/jwt/claims"];
}

const generateHasuraJWT = (userId: string): string => {
  const payload: JWTPayload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),

    // Hasura claims
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-default-role": "user",
      "x-hasura-user-id": userId.toString(),
    },
  };

  const secretKey = process.env.HASURA_GRAPHQL_JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "The HASURA_GRAPHQL_JWT_SECRET_KEY environment variable is not set."
    );
  }

  return jwt.sign(payload, secretKey, { algorithm: "HS256" });
};

export default generateHasuraJWT;
