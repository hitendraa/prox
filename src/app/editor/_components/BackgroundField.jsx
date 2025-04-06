import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ColorPicker from "./ColorPicker";

function BackgroundField({ background, onChange }) {
    const [type, setType] = useState(background?.type || "color");

    const handleChange = (updates) => {
        onChange({ type, ...background, ...updates });
    };

    return (
        <div className="space-y-4">
            <Select
                value={type}
                onValueChange={(value) => {
                    setType(value);
                    handleChange({ type: value });
                }}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select background type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="color">Solid Color</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="image">Image URL</SelectItem>
                </SelectContent>
            </Select>

            {type === "color" && (
                <ColorPicker
                    label="Background Color"
                    color={background?.color || "#000000"}
                    onChange={(value) => handleChange({ color: value })}
                />
            )}

            {type === "gradient" && (
                <div className="space-y-4">
                    <ColorPicker
                        label="Gradient Start"
                        color={background?.gradientStart || "#000000"}
                        onChange={(value) => handleChange({ gradientStart: value })}
                    />
                    <ColorPicker
                        label="Gradient End"
                        color={background?.gradientEnd || "#000000"}
                        onChange={(value) => handleChange({ gradientEnd: value })}
                    />
                </div>
            )}

            {type === "image" && (
                <div className="space-y-2">
                    <label className="text-sm font-medium">Image URL</label>
                    <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={background?.url || ""}
                        onChange={(e) => handleChange({ url: e.target.value })}
                    />
                </div>
            )}
        </div>
    );
}

export default BackgroundField;