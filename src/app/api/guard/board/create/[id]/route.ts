import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

type BoardProps = {
    name: string;
};

export async function POST(req: NextRequest, { params }: ParamsProp) {
    const id = params.id;

    try {
        const guard = await prisma.guard.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        const body = await req.text();
        const board: BoardProps = JSON.parse(body);

        if (!board.name) {
            return NextResponse.json(
                { message: "Please provide a name." },
                { status: 400 }
            );
        }

        const res = await prisma.board.create({
            data: {
                name: board.name,
                guard: {
                    connect: { id: guard?.id },
                },
            },
        });

        return NextResponse.json(res, { status: 201 });
    } catch (err) {
        return NextResponse.json(
            { message: "There was an error creating the board.", err },
            { status: 500 }
        );
    }
}
