import { Input } from "@/components/ui/input"

function ColorPicker({ label, color, onChange }) {
    return (
        <div className="mt-6 space-y-2">
            <label className="text-sm font-medium">{label}</label>
            <div className="flex gap-2">
                <Input
                    type="color"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-12 h-8 p-1 bg-transparent"
                />
                <Input
                    type="text"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1"
                    placeholder="#000000"
                />
            </div>
        </div>
    )
}

export default ColorPicker