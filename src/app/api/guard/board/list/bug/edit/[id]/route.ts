import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../../../lib/prisma";

export async function PUT(req: NextRequest, { params }: ParamsProp) {
    const id = Number(params.id);
    try {
        const body = await req.text();
        const bug: Bug = JSON.parse(body);

        if (!bug.name) {
            return NextResponse.json(
                { message: "Please provide a name." },
                { status: 400 }
            );
        }

        const res = await prisma.bug.update({
            where: {
                id: id,
            },
            include: {
                list: {
                    include: {
                        board: {
                            include: {
                                guard: true,
                            },
                        },
                    },
                },
            },
            data: {
                name: bug.name,
                description: bug.description,
            },
        });
        const payload = {
            guardId: res.list.board.guard.id,
            boardId: res.list.board.id,
            listId: res.list.id,
            id,
            name: res.name,
            description: res.description,
        };
        return NextResponse.json(payload, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "There was an error updating the guard.", error },
            { status: 500 }
        );
    }
}
