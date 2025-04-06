import { Slider } from "@/components/ui/slider"

function SliderField({label, defaultValue, handleInputChange, min = 1, max = 100}) {
    return (
        <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{label}</label>
                <span className="text-sm text-muted-foreground">{defaultValue}px</span>
            </div>
            <Slider 
                value={[defaultValue]} 
                min={min}
                max={max} 
                step={1} 
                onValueChange={(value) => handleInputChange(value[0])}
                className="w-full"
            />
        </div>
    )
}

export default SliderField