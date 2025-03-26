import { NextResponse } from "next/server"
import { db } from "@/configs/db"
import { VIDEO_RAW_TABLE } from "@/configs/schema"

export async function POST(req) {
    try {
        const {videoId, userEmail} = await req.json();

        const result = await db.insert(VIDEO_RAW_TABLE).values({
            videoId: videoId,
            createdBy: userEmail,
            type: 'raw'  // Add default type
        }).returning();

        return NextResponse.json({result});
    } catch (error) {
        console.error('Error creating video:', error);
        return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
    }
}

export async function PUT(req) {


    const {videoId, videoData} = await req.json();
    const result = await db.update(VIDEO_RAW_TABLE).set({
        videoData: videoData,
    }).where(eq(VIDEO_RAW_TABLE.videoId,videoId)).returning(VIDEO_RAW_TABLE);

    return NextResponse.json({result})
}