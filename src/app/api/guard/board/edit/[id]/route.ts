import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

export async function PUT(req: NextRequest, { params }: ParamsProp) {
    const id = Number(params.id);
    try {
        const body = await req.text();
        const board: Board = JSON.parse(body);

        if (!board.name) {
            return NextResponse.json(
                { message: "Please provide a name." },
                { status: 400 }
            );
        }

        const res = await prisma.board.update({
            where: {
                id: id,
            },
            include: {
                guard: true,
            },
            data: {
                name: board.name,
            },
        });

        const payload = {
            id,
            name: res.name,
            guardId: res.guard.id,
        }

        return NextResponse.json(payload, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "There was an error updating the guard.", error },
            { status: 500 }
        );
    }
}
