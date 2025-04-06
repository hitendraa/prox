"use client";

import { Player } from "@remotion/player";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RemotionComposition from "./RemotionComposition";
import { useContext, useEffect, useRef, useState } from "react";
import { VideoFramesContext } from "@/_context/VideoFramesContext";

const VIDEO_SIZES = {
  "16:9 (1920x1080)": { width: 1920, height: 1080 },
  "9:16 (1080x1920)": { width: 1080, height: 1920 },
  "1:1 (1080x1080)": { width: 1080, height: 1080 },
};

function RemotionPlayer() {
  const [screenSize, setScreenSize] = useState({
    width: 1920,
    height: 1080,
  });

  const handleSizeChange = (value) => {
    setScreenSize(VIDEO_SIZES[value]);
  };

  const {videoFrames, setVideoFrames} = useContext(VideoFramesContext);
  const playerRef = useRef(null);


  useEffect(() => {
    if(videoFrames?.selectedFrame !== undefined && videoFrames?.frameList) {
        let skipDuration = 0;
        for (let i = 0; i < videoFrames.selectedFrame; i++) {
            skipDuration = skipDuration + videoFrames.frameList[i].duration;
        }
        playerRef.current?.seekTo(skipDuration * 30);
    }
  } ,[videoFrames?.selectedFrame]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute right-3 top-3 z-10">
        <Select onValueChange={handleSizeChange} defaultValue="16:9 (1920x1080)">
          <SelectTrigger className="h-8 w-[140px] text-xs bg-popover/30 backdrop-blur-md border-border hover:bg-accent/20 transition-colors shadow-sm">
            <SelectValue placeholder="Select size" className="text-popover-foreground" />
          </SelectTrigger>
          <SelectContent className="min-w-[140px] bg-popover/95 backdrop-blur-md border-border">
            {Object.keys(VIDEO_SIZES).map((size) => (
              <SelectItem 
                key={size} 
                value={size}
                className="text-xs py-1.5 text-popover-foreground hover:bg-accent focus:bg-accent focus:text-accent-foreground"
              >
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div 
        className="w-full h-full flex items-center justify-center"
      >
        <div 
          style={{ 
            aspectRatio: `${screenSize.width}/${screenSize.height}`,
            height: screenSize.width > screenSize.height ? 'auto' : '100%',
            width: screenSize.width > screenSize.height ? '100%' : 'auto',
          }}
          className="relative"
        >
            {videoFrames?.totalDuration &&
          <Player
            ref={playerRef}
            component={RemotionComposition}
            durationInFrames={Number(videoFrames.totalDuration) * 30}
            compositionWidth={screenSize.width}
            compositionHeight={screenSize.height}
            fps={30}
            controls
            style={{
              width: '100%',
              height: '100%',
              borderRadius: "0.75rem",
            }}
            inputProps={{
                frameList: videoFrames.frameList,
                audioTrack: videoFrames.audioTrack,
                audioVolume: videoFrames.audioVolume
            }}
          />}
        </div>
      </div>
    </div>
  );
}

export default RemotionPlayer;
