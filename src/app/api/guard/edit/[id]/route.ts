import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function PUT(req: NextRequest, { params }: ParamsProp) {
    const id = Number(params.id);
    try {
        const body = await req.text();
        const guard: Guard = JSON.parse(body);

        if (!guard.name) {
            return NextResponse.json(
                { message: "Please provide a name." },
                { status: 400 }
            );
        }

        const res = await prisma.guard.update({
            where: {
                id: id,
            },
            data: {
                name: guard.name,
            },
        });

        return NextResponse.json(res, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "There was an error updating the guard.", error },
            { status: 500 }
        );
    }
}
