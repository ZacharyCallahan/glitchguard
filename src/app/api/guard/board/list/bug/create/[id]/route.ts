import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../../../lib/prisma";

export async function POST(req: NextRequest, { params }: ParamsProp) {
    const id = params.id;

    try {
        const list = await prisma.list.findUnique({
            where: {
                id: Number(id),
            },
        });

        const body = await req.text();
        const bug: Bug = JSON.parse(body);

        if (!bug.name) {
            return NextResponse.json(
                { message: "Please provide a name for the bug." },
                { status: 400 }
            );
        }
        if (!bug.description) {
            return NextResponse.json(
                { message: "Please provide a description for the bug." },
                { status: 400 }
            );
        }

        const res = await prisma.bug.create({
            data: {
                name: bug.name,
                description: bug.description,
                list: {
                    connect: {
                        id: list?.id,
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
