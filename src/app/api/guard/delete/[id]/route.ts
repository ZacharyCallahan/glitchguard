import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function DELETE(req: NextRequest, { params }: ParamsProp) {
    const id = params.id;

    try {
        await prisma.bug.deleteMany({
            where: {
                list: {
                    board: {
                        guardId: Number(id),
                    },
                },
            },
        });
        await prisma.list.deleteMany({
            where: {
                board: {
                    guardId: Number(id),
                },
            },
        });
        await prisma.board.deleteMany({
            where: {
                guardId: Number(id),
            },
        });

        await prisma.guard.delete({
            where: {
                id: Number(id),
            },
        });

        const payload = {
            guardId: Number(id),
        };

        return NextResponse.json(payload, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { message: "There was an error deleting the board.", err },
            { status: 500 }
        );
    }
}
