import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../../lib/prisma";

export async function PUT(req: NextRequest, { params }: ParamsProp) {
    const id = Number(params.id);
    try {
        const body = await req.text();
        const list: List = JSON.parse(body);

        if (!list.name) {
            return NextResponse.json(
                { message: "Please provide a name." },
                { status: 400 }
            );
        }

        const res = await prisma.list.update({
            where: {
                id: id,
            },
            include: {
                board: {
                    include: {
                        guard: true,
                    }
                }
            },
            data: {
                name: list.name,
            },
        });

        const payload = {
            id,
            name: res.name,
            boardId: res.board.id,
            guardId: res.board.guard.id,
        }

        return NextResponse.json(payload, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "There was an error updating the guard.", error },
            { status: 500 }
        );
    }
}
