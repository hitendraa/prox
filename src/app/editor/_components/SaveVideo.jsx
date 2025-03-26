"use client"

import { VideoFramesContext } from "@/_context/VideoFramesContext";
import { Button } from "@/components/ui/button"
import axios from "axios"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

function SaveVideo() {
    const pathname = usePathname();
    const videoId = pathname.split('/').pop();
    const { videoFrames, setVideoFrames } = useContext(VideoFramesContext);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
      videoId && GetVideoData();
    }, [videoId])



    const saveVideo = async () => {
        if (!videoId || !videoFrames) {
            toast.error('Missing video data');
            return;
        }

        setIsSaving(true);
        try {
            const { data } = await axios.put('/api/video', {
                videoId,
                videoData: videoFrames
            });
            if (data.result) toast.success('Video saved successfully');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to save video');
        } finally {
            setIsSaving(false);
        }
    }

    const GetVideoData = async () => {
      const result = await axios.get(`/api/video?videoId=${videoId}`);
      setVideoFrames(result?.data?.videoData);
    }

    return (
        <div>
            <Button 
                variant="outline" 
                onClick={saveVideo}
                disabled={isSaving}
            >
                {isSaving ? 'Saving...' : 'Save'}
            </Button>
        </div>
    );
}

export default SaveVideo;