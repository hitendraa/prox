"use client"

import { VideoFramesContext } from "@/_context/VideoFramesContext"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useContext, useEffect, useState } from "react"
import TextAreaBox from "./TextAreaBox"
import SliderField from "./SliderField"
import ColorPicker from "./ColorPicker"
import { Card } from "@/components/ui/card"
import { FontList } from "@/app/_data/List"
import { AnimationCategories, AnimationList, AnimationTimingFunctions } from "@/app/_data/Animations"
import BackgroundField from "./BackgroundField"

function FrameConfig() {
    const { videoFrames, setVideoFrames } = useContext(VideoFramesContext)
    const [frame, setFrame] = useState({})

    useEffect(() => {
        if (videoFrames?.frameList) {
            const currentFrame = videoFrames.frameList[videoFrames.selectedFrame] || {}
            // Set default values if not present
            if (!currentFrame.fontSize) {
                currentFrame.fontSize = 32
            }
            if (!currentFrame.duration) {
                currentFrame.duration = 3
            }
            if (!currentFrame.fontFamily) {
                currentFrame.fontFamily = 'default'
            }
            if (!currentFrame.textColor) {
                currentFrame.textColor = '#ffffff'
            }
            if (!currentFrame.animation) {
                currentFrame.animation = 'none'
            }
            if (!currentFrame.animationDuration) {
                currentFrame.animationDuration = 1
            }
            if (!currentFrame.animationDelay) {
                currentFrame.animationDelay = 0
            }
            if (!currentFrame.animationTiming) {
                currentFrame.animationTiming = 'easeOut'
            }
            setFrame(currentFrame)
        }
    }, [videoFrames?.selectedFrame, videoFrames?.frameList])

    const handleInputChange = (field, value) => {
        const updatedFrame = { ...frame, [field]: value }
        setFrame(updatedFrame)
        
        if (videoFrames?.frameList) {
            const updatedFrameList = [...videoFrames.frameList]
            updatedFrameList[videoFrames.selectedFrame] = updatedFrame
            setVideoFrames(prev => ({
                ...prev,
                frameList: updatedFrameList
            }))
        }
    }

    if (!videoFrames?.selectedFrame && videoFrames?.selectedFrame !== 0) {
        return (
            <div className="text-center p-4">
                Select a frame to edit its properties
            </div>
        )
    }

    return (
        <div className="w-full">
            <Card className="p-4 mb-4">
                <h3 className="font-medium mb-2">Frame {videoFrames.selectedFrame + 1}</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="background-settings">
                        <AccordionTrigger className="hover:bg-accent/50 px-4 rounded-lg">
                            Background Settings
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pt-4">
                            <BackgroundField 
                                background={frame?.background}
                                onChange={(value) => handleInputChange('background', value)}
                            />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="text-settings">
                        <AccordionTrigger className="hover:bg-accent/50 px-4 rounded-lg">
                            Text Settings
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pt-4">
                            <TextAreaBox 
                                frame={frame} 
                                handleInputChange={(value) => handleInputChange('text', value)}
                            />
                            <div className="mt-6 space-y-2">
                                <label className="text-sm font-medium">Font Family</label>
                                <Select
                                    value={frame?.fontFamily || 'default'}
                                    onValueChange={(value) => handleInputChange('fontFamily', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select font" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {FontList.map((font) => (
                                            <SelectItem 
                                                key={font.value} 
                                                value={font.value}
                                                style={{ fontFamily: font.value !== 'default' ? font.value : 'inherit' }}
                                            >
                                                {font.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <ColorPicker
                                label="Text Color"
                                color={frame?.textColor || '#ffffff'}
                                onChange={(value) => handleInputChange('textColor', value)}
                            />
                            <SliderField 
                                defaultValue={frame?.fontSize || 32} 
                                label="Font Size (px)" 
                                handleInputChange={(value) => handleInputChange('fontSize', value)}
                                min={12}
                                max={120}
                            />
                            <SliderField 
                                defaultValue={frame?.duration || 3} 
                                label="Duration (seconds)" 
                                handleInputChange={(value) => handleInputChange('duration', value)}
                                min={1}
                                max={10}
                            />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="animation-settings">
                        <AccordionTrigger className="hover:bg-accent/50 px-4 rounded-lg">
                            Animation Settings
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Animation Type</label>
                                    <Select
                                        value={frame?.animation || 'none'}
                                        onValueChange={(value) => handleInputChange('animation', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select animation" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">No Animation</SelectItem>
                                            {AnimationCategories.map((category) => (
                                                <SelectGroup key={category.category}>
                                                    <SelectLabel>{category.category}</SelectLabel>
                                                    {category.animations.map((animation) => (
                                                        <SelectItem 
                                                            key={animation.value} 
                                                            value={animation.value}
                                                        >
                                                            {animation.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {frame?.animation !== 'none' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Animation Timing</label>
                                            <Select
                                                value={frame?.animationTiming || 'easeOutCubic'}
                                                onValueChange={(value) => handleInputChange('animationTiming', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select timing function" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {AnimationTimingFunctions.map((timing) => (
                                                        <SelectItem 
                                                            key={timing.value} 
                                                            value={timing.value}
                                                        >
                                                            {timing.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <SliderField 
                                            defaultValue={frame?.animationDuration || 1} 
                                            label="Animation Duration (seconds)" 
                                            handleInputChange={(value) => handleInputChange('animationDuration', value)}
                                            min={0.1}
                                            max={5}
                                            step={0.1}
                                        />

                                        <SliderField 
                                            defaultValue={frame?.animationDelay || 0} 
                                            label="Animation Delay (seconds)" 
                                            handleInputChange={(value) => handleInputChange('animationDelay', value)}
                                            min={0}
                                            max={3}
                                            step={0.1}
                                        />

                                        {(frame?.animation === 'bounce' || frame?.animation === 'elastic' || frame?.animation === 'wave') && (
                                            <SliderField 
                                                defaultValue={frame?.animationIntensity || 1} 
                                                label="Animation Intensity" 
                                                handleInputChange={(value) => handleInputChange('animationIntensity', value)}
                                                min={0.1}
                                                max={2}
                                                step={0.1}
                                            />
                                        )}

                                        {frame?.animation === 'typewriter' && (
                                            <SliderField 
                                                defaultValue={frame?.typingSpeed || 1} 
                                                label="Typing Speed" 
                                                handleInputChange={(value) => handleInputChange('typingSpeed', value)}
                                                min={0.5}
                                                max={3}
                                                step={0.1}
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card>
        </div>
    )
}
export default FrameConfig