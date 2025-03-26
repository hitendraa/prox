"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { VideoFramesContext } from "@/_context/VideoFramesContext"

const defaultFrame = {
  image: '/placeholder.jpg',
  text: 'New Frame',
  textColor: 'black',
  fontSize: 20,
  duration: 2
}

const TrackList = () => {
  const [frameList, setFrameList] = useState([])
  const [selectedFrame, setSelectedFrame] = useState(0)
  const {videoFrames, setVideoFrames} = useContext(VideoFramesContext)

  // Initialize with default frame if no frames exist
  useEffect(() => {
    if (!frameList || frameList.length === 0) {
      setFrameList([defaultFrame])
    }
  }, [])

  const addNewFrame = () => {
    setFrameList(prev => [...prev, defaultFrame])
  }

  const removeFrame = (indexToRemove) => {
    const updatedFrameList = frameList?.filter((_, index) => index !== indexToRemove)
    setFrameList(updatedFrameList)
    if (selectedFrame === indexToRemove) {
      setSelectedFrame(Math.max(0, indexToRemove - 1))
    }
  }

  useEffect(() => {
    let totalDuration = 0
    frameList.forEach(frame => {
      totalDuration = totalDuration + frame.duration
    })

    setVideoFrames({
      totalDuration: totalDuration,
      frameList: frameList,
      selectedFrame: selectedFrame
    })
  }, [frameList, selectedFrame])

  useEffect(() => {
    if (videoFrames && videoFrames.frameList && videoFrames.frameList.length > 0) {
      setFrameList(videoFrames.frameList)
    }
  }, [videoFrames])

  if (!frameList) return null;

  return (
    <div className="space-y-6">
      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/30 transition-colors py-4 px-2">
        {frameList.map((frame, index) => (
          <Card
            key={index}
            className={`relative group flex-shrink-0 w-[160px] h-[100px] cursor-pointer
              hover:ring-2 hover:ring-primary/50 hover:shadow-lg
              transition-all duration-200 ease-in-out
              ${selectedFrame === index ? 'ring-2 ring-primary shadow-md' : ''}`}
            onClick={() => setSelectedFrame(index)}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
              <h2 className="text-sm font-medium text-foreground/90">{frame.text}</h2>
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 w-7 h-7 opacity-0 scale-90
                group-hover:opacity-100 group-hover:scale-100
                transition-all duration-200 ease-in-out shadow-lg"
              onClick={(e) => {
                e.stopPropagation()
                removeFrame(index)
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </Card>
        ))}
        <Button
          variant="outline"
          className="flex-shrink-0 w-[160px] h-[100px] hover:bg-primary/5
            hover:border-primary/50 transition-colors duration-200 border-dashed"
          onClick={addNewFrame}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Frame
        </Button>
      </div>
    </div>
  )
}

export default TrackList