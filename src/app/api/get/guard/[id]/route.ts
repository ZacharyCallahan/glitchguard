import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: NextRequest, { params }: ParamsProp) {
  try {
    const id = parseInt(params.id);

    const guard = await prisma.guard.findUnique({
      where: {
        id: id,
      },
      include: {
        users: true,
        boards: {
          include: {
            lists: {
              include: {
                bugs: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(guard, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "There was an error getting the guard", err },
      { status: 500 }
    );
  }
}
