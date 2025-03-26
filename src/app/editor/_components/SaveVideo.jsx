"use client"

import { VideoFramesContext } from "@/_context/VideoFramesContext";
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useParams } from "next/navigation"
import { useContext } from "react";
import { toast } from "sonner";

function SaveVideo () {

    const {videoId} = useParams();
    const {videoFrames, setVideoFrames} = useContext(VideoFramesContext)


    const saveVideo = async () => {
        const result = await axios.put('/api/video', {
            videoId: videoId,
            videoData: videoFrames
        })

        toast.success('Video saved successfully')
    }


  return (
    <div>
        <Button variant="outline" onClick={() => saveVideo()}>Save</Button>
    </div>
  )
}
export default SaveVideo