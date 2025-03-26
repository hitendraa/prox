"use client"
import { useState } from "react"
import CreateButton from "./_components/CreateButton"
import VideoCreateOptions from "./_components/VideoCreateOptions"

const Dashboard = () => {
  const [videoList, setVideoList] = useState([])

  if (videoList.length === 0) {
    return (
     <VideoCreateOptions />
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Your Videos</h1>
        <div className="w-full sm:w-auto">
          <CreateButton />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {videoList.map((video, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-3 sm:p-4">
              <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
                {/* Add image or video thumbnail here */}
              </div>
              <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
                {video.title || 'Untitled Video'}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {video.date || new Date().toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Dashboard