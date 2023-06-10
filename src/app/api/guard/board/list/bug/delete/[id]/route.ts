import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../../../lib/prisma";

export async function DELETE(req: NextRequest, { params }: ParamsProp) {
    const id = params.id;

    try {
        const res = await prisma.bug.delete({
            where: {
                id: Number(id),
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
        });
        const payload = {
            guardId: res.list.board.guard.id,
            boardId: res.list.board.id,
            listId: res.list.id,
            bugId: res.id,
        };
        return NextResponse.json(payload, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { message: "There was an error deleting the bug.", err },
            { status: 500 }
        );
    }
}
