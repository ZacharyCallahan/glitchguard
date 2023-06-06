import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type BoardProps = {
    name: string;
};

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;

    const session = await getServerSession(authOptions);

    // const userEmail = session?.user?.email;
    // if (!userEmail) {
    //     return NextResponse.json({
    //         authenticated: !!session,
    //         session,
    //     });
    // }

    try {
        // const user = await prisma.user.findUnique({
        //     where: {
        //         email: userEmail,
        //     },
        // });

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
            { message: "There was an error creating the guard.", err },
            { status: 500 }
        );
    }
}
