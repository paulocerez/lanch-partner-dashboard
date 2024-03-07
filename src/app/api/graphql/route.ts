import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Ensure you have HASURA_ADMIN_SECRET in your .env.local file
  const adminSecret = process.env.HASURA_ADMIN_SECRET;
  if (!adminSecret) {
    throw new Error("HASURA_ADMIN_SECRET is not set");
  }

  try {
    const hasuraResponse = await fetch(
      "https://eternal-leech-72.hasura.app/v1/graphql",
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          "x-hasura-admin-secret": adminSecret,
        }),
        body: req.body,
      }
    );

    // Cloning the response to access its headers and status
    const clonedResponse = hasuraResponse.clone();
    const responseBody = await clonedResponse.text();

    const response = new NextResponse(responseBody, {
      status: clonedResponse.status,
      headers: clonedResponse.headers,
    });
    response.headers.set("Content-Type", "application/json");

    return response;
  } catch (error) {
    console.error("Request to Hasura failed:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
  }
}
