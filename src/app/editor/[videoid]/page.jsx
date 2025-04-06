import { VideoIcon, Settings2, Film, Music2 } from "lucide-react"
import RemotionPlayer from "../_components/RemotionPlayer"
import TrackList from "../_components/TrackList"
import SaveVideo from "../_components/SaveVideo"
import FrameConfig from "../_components/FrameConfig"
import AudioSettings from "../_components/AudioSettings"

function Editor() {
  return (
    <main className="h-full pt-20 px-8 pb-6 flex flex-col bg-gradient-to-b from-background to-muted/20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 mb-8">
        {/* Video Player Section */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <VideoIcon className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">Preview</h2>
            </div>
            <SaveVideo />
          </div>
          <div className="max-w-[1000px] mx-auto w-full">
            <div className="aspect-video bg-card rounded-xl border shadow-lg backdrop-blur-sm">
              <RemotionPlayer />
            </div>
          </div>
          
          {/* Audio Settings Section */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Music2 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">Background Music</h2>
            </div>
            <AudioSettings />
          </div>
        </div>

        {/* Editing Tools Section */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Settings2 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight">Editing Tools</h2>
          </div>
          <div className="flex-1 bg-card rounded-xl border p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-center h-full text-muted-foreground/80">
              <FrameConfig />
            </div>
          </div>
        </div>
      </div>

      {/* Video Frames Timeline */}
      <div className="min-h-[220px] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Film className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight">Timeline</h2>
          </div>
        </div>
        <div className="relative flex-1 bg-card/50 rounded-xl border shadow-lg backdrop-blur-sm">
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background/80 to-transparent z-10 pointer-events-none" />
          <div className="p-4 overflow-hidden">
            <TrackList />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Editor