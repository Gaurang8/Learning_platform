import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {
        params,
    }: {
        params: {
            courseId: string;
        };
    }
) {
    try {

        const { userId } = auth();
        const { courseId } = params;
        const value = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", {
                status: 401,
            });
        }

        let course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...value
            }
        })

        return new NextResponse(JSON.stringify(course), {
            status: 200,
        });

    } catch (error) {
        return new NextResponse("Failed to update title", {
            status: 500,
        });
    }
}
