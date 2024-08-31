import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        let { userId } = auth();
        let { title } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        let course = await db.course.create({
            data: {
                title,
                userId,
            },
        });

        return NextResponse.json(course);
    }
    catch (error) {
        console.log(error);
    }
} 