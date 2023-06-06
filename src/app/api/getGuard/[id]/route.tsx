import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        const guard = await prisma.guard.findUnique({
            where: {
                id: id,
            },
            include: {
                users: true,
                boards: true,
            },
        });
        console.log(guard);
        return NextResponse.json(guard, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { message: "There was an error getting the guard", err },
            { status: 500 }
        );
    }
}
