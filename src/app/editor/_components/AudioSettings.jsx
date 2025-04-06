"use client"

import { useContext, useEffect } from "react";
import { VideoFramesContext } from "@/_context/VideoFramesContext";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AudioTracks } from "@/app/_data/AudioTracks";
import { Badge } from "@/components/ui/badge";
import { Volume2, VolumeX } from "lucide-react";
import SliderField from "./SliderField";
import { Card } from "@/components/ui/card";

function AudioSettings() {
    const { videoFrames, setVideoFrames } = useContext(VideoFramesContext);

    // Initialize audio settings if they don't exist
    useEffect(() => {
        if (!videoFrames?.audioTrack) {
            setVideoFrames(prev => ({
                ...prev,
                audioTrack: 'none',
                audioVolume: 1
            }));
        }
    }, []);

    const handleAudioChange = (updates) => {
        setVideoFrames(prev => ({
            ...prev,
            ...updates
        }));
    };

    return (
        <Card className="p-4">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Background Music</label>
                    <Select
                        value={videoFrames?.audioTrack || "none"}
                        onValueChange={(value) => handleAudioChange({ audioTrack: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select background music" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">No Music</SelectItem>
                            {Object.entries(AudioTracks.reduce((acc, track) => {
                                const mainTag = track.tags[0];
                                if (!acc[mainTag]) acc[mainTag] = [];
                                acc[mainTag].push(track);
                                return acc;
                            }, {})).map(([category, tracks]) => (
                                <SelectGroup key={category}>
                                    <SelectLabel className="capitalize">{category}</SelectLabel>
                                    {tracks.map((track) => (
                                        <SelectItem key={track.id} value={track.id}>
                                            <div className="flex flex-col gap-1">
                                                <span>{track.name}</span>
                                                <div className="flex gap-1">
                                                    {track.tags.slice(1).map((tag) => (
                                                        <Badge key={tag} variant="secondary" className="text-[10px] px-1">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {videoFrames?.audioTrack && videoFrames.audioTrack !== "none" && (
                    <SliderField 
                        defaultValue={videoFrames?.audioVolume ? videoFrames.audioVolume * 100 : 100}
                        label={
                            <div className="flex items-center gap-2">
                                {videoFrames?.audioVolume === 0 ? (
                                    <VolumeX className="w-4 h-4" />
                                ) : (
                                    <Volume2 className="w-4 h-4" />
                                )}
                                <span>Volume</span>
                            </div>
                        }
                        handleInputChange={(value) => handleAudioChange({ audioVolume: value / 100 })}
                        min={0}
                        max={100}
                    />
                )}
            </div>
        </Card>
    );
}

export default AudioSettings;