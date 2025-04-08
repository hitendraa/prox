"use client"

import { createContext } from "react";

export const VideoFramesContext = createContext({
    videoFrames: {
        frameList: [],
        selectedFrame: 0,
        totalDuration: 0,
        audioTrack: null,
        audioVolume: 1,
        backgroundMusic: {
            trackId: null,
            reason: ''
        }
    },
    setVideoFrames: () => {}
});