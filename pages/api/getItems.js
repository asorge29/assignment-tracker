import { NextResponse } from 'next/server';

export const runtime = 'edge';

export default async function POST(request) {
  try {
    // Read the request body
    const { query } = await request.json();

    // Fetch data from an external API
    const response = await fetch('https://assignment-tracker-worker.oceans4496.workers.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "GET method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ message: "PUT method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ message: "DELETE method not allowed" }, { status: 405 });
}
