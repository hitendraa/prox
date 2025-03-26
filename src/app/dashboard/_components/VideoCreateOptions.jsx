import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { Plus, Sparkles, VideoIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import uuid4 from "uuid4"
import axios from "axios"

function VideoCreateOptions() {
    const { user } = useUser()
    const router = useRouter()

    const CreateNewScratchVideo = async () => {
        try {
            const videoId = uuid4()  // uuid4 is already correctly used
            
            const result = await axios.post('/api/video', {
                videoId,
                userEmail: user?.primaryEmailAddress?.emailAddress
            })

            if (result.data) {
                router.push(`/editor/${videoId}`)
            }
        } catch (error) {
            console.error('Error creating video:', error);
            // You might want to add error handling UI here
        }
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center max-w-4xl w-full mx-auto">
        <div className="rounded-full bg-primary/10 p-4 mb-10">
        <VideoIcon className="w-16 h-16 sm:w-20 sm:h-20 text-primary" />
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6">
        Create Your First Video
      </h2>
      <p className="text-lg sm:text-xl text-muted-foreground text-center max-w-2xl mb-16">
        Choose how you want to create your video
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
        <Button 
          variant="outline" 
          className="flex flex-col h-52 items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 transition-all group p-8"
          onClick={() => window.location.href = '/dashboard/create/ai'}
        >
          <div className="rounded-full bg-primary/10 p-5 group-hover:bg-primary/20 transition-colors">
            <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
          </div>
          <span className="font-semibold text-2xl">Generate with AI</span>
          <p className="text-sm text-muted-foreground text-center">
            Let AI help you create professional videos in minutes
          </p>
        </Button>

        <Button 
          variant="outline" 
          className="flex flex-col h-52 items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 transition-all group p-8"
          onClick={CreateNewScratchVideo}
        >
          <div className="rounded-full bg-primary/10 p-5 group-hover:bg-primary/20 transition-colors">
            <Plus className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
          </div>
          <span className="font-semibold text-2xl">Create from Scratch</span>
          <p className="text-sm text-muted-foreground text-center">
            Full creative control with our professional editor
          </p>
        </Button>
      </div>

      <div className="mt-16 text-center text-sm text-muted-foreground">
        Need help getting started? 
        <a href="#" className="text-primary hover:underline ml-1">Watch tutorial</a> or
        <a href="#" className="text-primary hover:underline ml-1">read documentation</a>
      </div>
    </div>
  </div>
  )
}
export default VideoCreateOptions