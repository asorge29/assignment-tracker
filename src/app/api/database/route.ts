import { NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(request: Request) {
  const { env } = getRequestContext();

  try {
    const { query } = await request.json();
    const results = await env.DATABASE.prepare(query).all();
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET() {
  return NextResponse.json(
    { message: "GET method not allowed" },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: "PUT method not allowed" },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: "DELETE method not allowed" },
    { status: 405 }
  );
}
