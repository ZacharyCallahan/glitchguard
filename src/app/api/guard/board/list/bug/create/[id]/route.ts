import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../../../lib/prisma";

export async function POST(req: NextRequest, { params }: ParamsProp) {
    const id = params.id;

    try {
        const body = await req.text();
        console.log("The body:", body);
        const bug: Bug = JSON.parse(body);
        console.log("The bug:", bug);
        const convertedDeadline = new Date(bug.deadline.toString());
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
        if (!bug.deadline) {
            return NextResponse.json(
                { message: "Please provide a deadline for the bug." },
                { status: 400 }
            );
        }
        const list = await prisma.list.findUnique({
            where: {
                id: Number(id),
            },
        });
        console.log("The list:", list);

        const createdBy = await prisma.user.findUnique({
            where: {
                email: bug.createdBy.email,
            },
        });
        console.log("The createdBy:", createdBy);

        const res = await prisma.bug.create({
            data: {
                name: bug.name,
                description: bug.description,
                createdBy: {
                    connect: {
                        id: createdBy?.id,
                    },
                },
                deadline: convertedDeadline,
                priority: bug.priority,
                assignedUsers: {
                    connect: [],
                },
                status: bug.status,
                color: bug.color,
                list: {
                    connect: {
                        id: list?.id,
                    },
                },
            },
        });

        return NextResponse.json(res, { status: 201 });
    } catch (err) {
        console.log("The err:", err);
        return NextResponse.json(
            { message: "There was an error creating the bug.", err },
            { status: 500 }
        );
    }
}
