import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

export async function DELETE(req: NextRequest, { params }: ParamsProp) {
    const id = params.id;

    try {
        await prisma.bug.deleteMany({
            where: {
                list: {
                    boardId: Number(id),
                },
            },
        });
        await prisma.list.deleteMany({
            where: {
                boardId: Number(id),
            },
        });
        const resBoard = await prisma.board.delete({
            where: {
                id: Number(id),
            },

            include: {
                guard: true,
            },
        });

        const payload = {
            guardId: resBoard.guard.id,
            boardId: resBoard.id,
        };

        return NextResponse.json(payload, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { message: "There was an error deleting the board.", err },
            { status: 500 }
        );
    }
}
