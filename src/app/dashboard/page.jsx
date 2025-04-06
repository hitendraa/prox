"use client"
import { useEffect, useState } from "react"
import CreateButton from "./_components/CreateButton"
import VideoCreateOptions from "./_components/VideoCreateOptions"
import axios from "axios"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const Dashboard = () => {
  const [videoList, setVideoList] = useState([])
  const {user} = useUser()
  const router = useRouter()

  useEffect(() => {
    user&&GetUserVideoList()
  }, [user])

  const GetUserVideoList=async () => {
    const result = await axios.get('/api/video?userEmail='+user?.primaryEmailAddress?.emailAddress)
    setVideoList(result.data)
  }

  const handleCardClick = (videoId) => {
    router.push(`/editor/${videoId}`)
  }

  if (videoList.length === 0) {
    return (
     <VideoCreateOptions />
    )
  }

  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Your Videos</h1>
        <div className="w-full sm:w-auto">
          <CreateButton />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
        {videoList.map((video, index) => (
          <Card 
            key={index} 
            className="w-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer border-2"
            onClick={() => handleCardClick(video.videoId)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col h-full">
                <div className="w-full relative mb-4">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    {/* Add image or video thumbnail here */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                      {video.title || 'Untitled Video'}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {video.description || 'No description available'}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    <p className="text-sm text-muted-foreground">
                      Created: {video.date || new Date().toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Status: {video.status || 'Draft'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Dashboard