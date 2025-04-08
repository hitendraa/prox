"use client";

import { Textarea } from '@/components/ui/textarea';
import Header from '../../components/Header';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import uuid4 from 'uuid4';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VIDEO_AGE_GROUPS, GEMINI_SYSTEM_MESSAGE } from '@/configs/AiModel';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';
import RemotionPlayer from '../editor/_components/RemotionPlayer';
import { Card } from '@/components/ui/card';
import { VideoFramesContext } from '@/_context/VideoFramesContext';

function CreateAiVideo() {
    const router = useRouter();
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [generatedVideo, setGeneratedVideo] = useState(null);

    const [formData, setFormData] = useState({
        subject: '',
        prompt: '',
        ageGroup: '',
        duration: 30
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const onGenerateClick = async () => {
        if (!formData.subject || !formData.prompt || !formData.ageGroup) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsLoading(true);
        try {
            // Call Gemini API
            const response = await fetch('/api/generate-video', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    systemMessage: GEMINI_SYSTEM_MESSAGE,
                    userInput: formData
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            // Create video in database with audio settings
            const videoId = uuid4();
            const videoData = {
                ...data,
                frameList: data.frames,
                selectedFrame: 0,
                audioTrack: data.backgroundMusic?.trackId || data.audioTrack,
                audioVolume: data.audioVolume || 1
            };

            const result = await axios.post('/api/video', {
                videoId,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                videoData
            });

            setGeneratedVideo(videoData);

        } catch (error) {
            toast.error(error.message || 'Failed to generate video');
        } finally {
            setIsLoading(false);
        }
    };

    const goToEditor = (videoId) => {
        router.push(`/editor/${videoId}`);
    };

    return (
        <div className="min-h-screen bg-background pt-16">
            <Header />
            <div className="container max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Generate video content with AI</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2">Subject</label>
                                <Input
                                    value={formData.subject}
                                    onChange={(e) => handleInputChange('subject', e.target.value)}
                                    placeholder="Enter the main subject or topic"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Detailed Prompt</label>
                                <Textarea
                                    value={formData.prompt}
                                    onChange={(e) => handleInputChange('prompt', e.target.value)}
                                    placeholder="Describe what you want in the video..."
                                    className="min-h-[120px]"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Target Age Group</label>
                                <Select
                                    value={formData.ageGroup}
                                    onValueChange={(value) => handleInputChange('ageGroup', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select age group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {VIDEO_AGE_GROUPS.map((group) => (
                                            <SelectItem key={group.value} value={group.value}>
                                                {group.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block mb-2">Duration (seconds)</label>
                                <Input
                                    type="number"
                                    min={10}
                                    max={300}
                                    value={formData.duration}
                                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                                />
                            </div>

                            <Button 
                                className="w-full" 
                                onClick={onGenerateClick}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Generating...' : 'Generate Video'}
                            </Button>
                        </div>
                    </div>

                    <div>
                        {generatedVideo ? (
                            <div className="space-y-6">
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-4">Generated Video Preview</h3>
                                    <div className="aspect-video bg-card rounded-xl overflow-hidden border">
                                        <VideoFramesContext.Provider value={{
                                            videoFrames: generatedVideo,
                                            setVideoFrames: () => {}
                                        }}>
                                            <RemotionPlayer />
                                        </VideoFramesContext.Provider>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-muted-foreground mb-4">{generatedVideo.summary}</p>
                                        <div className="flex gap-4">
                                            <Button
                                                variant="default"
                                                onClick={() => goToEditor(generatedVideo.videoId)}
                                                className="flex-1"
                                            >
                                                Edit Manually
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={onGenerateClick}
                                                className="flex-1"
                                            >
                                                Regenerate
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center text-muted-foreground">
                                    <p>Fill in the form and generate your video</p>
                                    <p className="text-sm">Preview will appear here</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAiVideo;