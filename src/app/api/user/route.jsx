import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { user } = await req.json();
        console.log("Received user data:", user);
        
        if (!user?.primaryEmailAddress?.email) {
            return NextResponse.json(
                { error: "Invalid user data" },
                { status: 400 }
            );
        }

        const userResult = await db
            .select()
            .from(USER_TABLE)
            .where(eq(USER_TABLE.email, user.primaryEmailAddress.email));

        console.log("User query result:", userResult);

        if (!userResult?.length) {
            const result = await db
                .insert(USER_TABLE)
                .values({
                    name: user.fullName,
                    email: user.primaryEmailAddress.email,
                    image: user.imageUrl,
                    credits: 10
                })
                .returning();
            
            return NextResponse.json(result[0]);
        }

        return NextResponse.json(userResult[0]);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}