import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

type GuardProps = {
    name: string;
};

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return NextResponse.json({
            authenticated: !!session,
            session,
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
        });

        const body = await req.text();
        const guard: GuardProps = JSON.parse(body);

        if (!guard.name) {
            return NextResponse.json(
                { message: "Please provide a name." },
                { status: 400 }
            );
        }

        const res = await prisma.guard.create({
            data: {
                name: guard.name,
                users: {
                    connect: { id: user?.id },
                },
            },
        });

        const payload = {
            id: res.id,
            name: res.name,
            createdAt: res.createdAt,
            updatedAt: res.updatedAt,
            users: [
                {
                    id: user?.id,
                    name: user?.name,
                    email: user?.email,
                    createdAt: user?.createdAt,
                    updatedAt: user?.updatedAt,
                },
            ],
            boards: [],
        };

        return NextResponse.json(payload, { status: 201 });
    } catch (err) {
        return NextResponse.json(
            { message: "There was an error creating the guard.", err },
            { status: 500 }
        );
    }
}
