import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: NextRequest, { params }: ParamsProp) {
  try {
    const id = params.id;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        assignedBugs: true,
        createdBugs: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "There was an error getting the user", err },
      { status: 500 }
    );
  }
}
