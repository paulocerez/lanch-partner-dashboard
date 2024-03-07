import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function middleware(req: NextRequest) {
  try {
    const authHeader = headers().get("Authorization");

    const hasuraResponse = await fetch(
      "https://eternal-leech-72.hasura.app/v1/graphql",
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: authHeader || "",
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
