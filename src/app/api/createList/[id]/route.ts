import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: ParamsProp) {
    const id = params.id;

    try {
        const board = await prisma.board.findUnique({
            where: {
                id: Number(params.boardId),
            },
        });

        const body = await req.text();
        const list: List = JSON.parse(body);

        if (!list.name) {
            return NextResponse.json(
                { message: "Please provide a name for the list." },
                { status: 400 }
            );
        }

        const res = await prisma.list.create({
            data: {
                name: list.name,
                board: {
                    connect: {
                        id: board?.id,
                    },
                },
            },
        });

        return NextResponse.json(res, { status: 201 });
    } catch (err) {
        return NextResponse.json(
            { message: "There was an error creating the list.", err },
            { status: 500 }
        );
    }
}
