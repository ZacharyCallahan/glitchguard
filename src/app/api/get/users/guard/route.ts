import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
    const url = new URL(req.nextUrl.toString());
    const userEmail = url.searchParams.get("email");

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
                        users: true,
                        boards: {
                            include: {
                                lists: {
                                    include: {
                                        bugs: true,
                                    },
                                },
                            },
                        },
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
