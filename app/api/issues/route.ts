import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";
import { createIssueSchema } from "../../validationSchemas/createIssueSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const newIssue = await prisma.issue.create({
    data: validation.data,
  });

  if (!newIssue) {
    return NextResponse.json(
      { error: "An error occurred while creating the issue" },
      { status: 500 }
    );
  }
  return NextResponse.json(newIssue, { status: 201 });
}
