import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../../../lib/prisma";

export async function PUT(req: NextRequest, { params }: ParamsProp) {
    const id = Number(params.id);
    try {
        const body = await req.text();
        const bug: Bug = JSON.parse(body);
        const convertedDeadline = new Date(bug.deadline.toString());
        console.log(bug);

        if (!bug.name) {
            return NextResponse.json(
                { message: "Please provide a name." },
                { status: 400 }
            );
        }

        const res = await prisma.bug.update({
            where: {
                id: id,
            },
            include: {
                list: {
                    include: {
                        board: {
                            include: {
                                guard: true,
                            },
                        },
                    },
                },
            },
            data: {
                name: bug.name,
                description: bug.description,
                priority: bug.priority,
                status: bug.status,
                deadline: convertedDeadline,
                color: bug.color,
                // TODO: get assingedUsers working
                // assignedUsers: {
                //     set: bug.assignedUsers,
                // },
            },
        });
        const payload = {
            guardId: res.list.board.guard.id,
            boardId: res.list.board.id,
            listId: res.list.id,
            id,
            name: res.name,
            description: res.description,
            priority: res.priority,
            status: res.status,
            deadline: res.deadline,
            color: res.color,
        };
        return NextResponse.json(payload, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "There was an error updating the guard.", error },
            { status: 500 }
        );
    }
}
