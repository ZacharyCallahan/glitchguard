import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const userEmail = url.searchParams.get("session[user][email]");

    if (!userEmail)
        return NextResponse.json({ message: "No user email" }, { status: 400 });

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
            include: {
                guards: {
                    include: {
                        boards: true,
                    },
                },
            },
        });

        return NextResponse.json(user?.guards, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { message: "There was an getting guards", err },
            { status: 500 }
        );
    }
}
