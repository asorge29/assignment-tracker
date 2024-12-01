import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const key = request.headers.get("key");
    const { query } = await request.json();

    const response = await fetch(
      "https://assignment-tracker-worker.oceans4496.workers.dev",
      {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: {
          "Content-Type": "application/json",
          "key": key as string,
        },
      }
    );

    if (!response.ok) {
      new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
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
