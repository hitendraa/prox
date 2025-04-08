"use client"

import { useState, useEffect, useContext } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { VideoFramesContext } from '@/_context/VideoFramesContext';
import { AudioTracks } from '@/app/_data/AudioTracks';

function AudioSettings() {
    const { videoFrames, setVideoFrames } = useContext(VideoFramesContext);
    const [volume, setVolume] = useState(1);
    const [selectedTrack, setSelectedTrack] = useState('none');

    useEffect(() => {
        if (videoFrames?.audioTrack) {
            setSelectedTrack(videoFrames.audioTrack);
            setVolume(videoFrames.audioVolume || 1);
        }
    }, [videoFrames?.audioTrack, videoFrames?.audioVolume]);

    const handleTrackChange = (value) => {
        setSelectedTrack(value);
        setVideoFrames(prev => ({
            ...prev,
            frameList: prev.frameList,
            audioTrack: value,
            audioVolume: volume
        }));
    };

    const handleVolumeChange = (newVolume) => {
        const volumeValue = newVolume[0];
        setVolume(volumeValue);
        setVideoFrames(prev => ({
            ...prev,
            frameList: prev.frameList,
            audioTrack: selectedTrack,
            audioVolume: volumeValue
        }));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Select Track</label>
                    {videoFrames?.backgroundMusic?.reason && (
                        <span className="text-xs text-muted-foreground">
                            AI Suggestion: {videoFrames.backgroundMusic.reason}
                        </span>
                    )}
                </div>
                <Select value={selectedTrack} onValueChange={handleTrackChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Choose background music" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">No Music</SelectItem>
                        {AudioTracks.map((track) => (
                            <SelectItem key={track.id} value={track.id}>
                                {track.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {selectedTrack !== 'none' && (
                <div className="space-y-2">
                    <label className="text-sm font-medium">Volume</label>
                    <Slider
                        value={[volume]}
                        max={1}
                        min={0}
                        step={0.1}
                        onValueChange={handleVolumeChange}
                    />
                </div>
            )}
        </div>
    );
}

export default AudioSettings;