import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { AudioTracks } from "@/app/_data/AudioTracks";

export async function POST(req) {
    try {
        const body = await req.json();
        const { systemMessage, userInput } = body;

        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            throw new Error('Gemini API key not configured');
        }

        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `${systemMessage}

USER REQUEST:
Subject: ${userInput.subject}
Description: ${userInput.prompt}
Target Age Group: ${userInput.ageGroup}
Desired Duration: ${userInput.duration} seconds

Please generate a video content plan following the exact format specified above. 
Remember to include appropriate background music from the available tracks and set both audioTrack and audioVolume in the response.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract the JSON object from the response
        const jsonStr = text.substring(
            text.indexOf('{'),
            text.lastIndexOf('}') + 1
        );

        const videoData = JSON.parse(jsonStr);

        // Validate audio track exists
        if (videoData.backgroundMusic?.trackId && !AudioTracks.find(t => t.id === videoData.backgroundMusic.trackId)) {
            throw new Error('Invalid audio track selected by AI');
        }

        // Ensure audio settings are present
        if (!videoData.audioTrack) {
            videoData.audioTrack = videoData.backgroundMusic?.trackId || 'none';
        }
        if (typeof videoData.audioVolume !== 'number') {
            videoData.audioVolume = 1;
        }

        return NextResponse.json(videoData);
    } catch (error) {
        console.error('Error generating video:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate video content' },
            { status: 500 }
        );
    }
}