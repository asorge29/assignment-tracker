import { NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { auth } from "@/auth";

export const runtime = "edge";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { env } = getRequestContext();

  try {
    const { action, params } = await request.json();

    let query;

    switch (action) {
      case "createClass":
        query = `insert into classes (name, email) values (?, ${session.user?.email})`;
        break;
      case "createAssignment":
        query = `insert into assignments (title, link, due_date, class, email) values (?, ?, ?, ?, ${session.user?.email})`;
        break;
      case "deleteClass":
        query = `delete from classes where id = ? AND email = ${session.user?.email}`;
        break;
      case "deleteAssignment":
        query = `DELETE FROM assignments WHERE id = ? AND email = ${session.user?.email}`;
        break;
      case "getClasses":
        break;
      case "getAssignments":
        break;
      case "updateAssignment":
        break;
      default:
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 },
        );
    }

    const statement = await env.DATABASE.prepare(query);
    const results = await statement.bind(...params).all();
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
export async function GET() {
  return NextResponse.json(
    { message: "GET method not allowed" },
    { status: 405 },
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: "PUT method not allowed" },
    { status: 405 },
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: "DELETE method not allowed" },
    { status: 405 },
  );
}
