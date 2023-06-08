import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../../lib/prisma";

export async function DELETE(req: NextRequest, { params }: ParamsProp) {
    const id = params.id;

    try {
        const resBug = await prisma.bug.deleteMany({
            where: {
                listId: Number(id),
            },
        });
        const resList = await prisma.list.delete({
            where: {
                id: Number(id),
            },
            include: {
                board: {
                    include: {
                        guard: true,
                    },
                },
            },
        });

        return NextResponse.json(
            { resList: resList, resBug: resBug },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "There was an error deleting the list.", err },
            { status: 500 }
        );
    }
}
