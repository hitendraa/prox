import { Textarea } from '@/components/ui/textarea'

function TextAreaBox({ frame, handleInputChange }) {
    return (
        <div>
            <label className="block mb-2">Content</label>
            <Textarea 
                value={frame?.text || ''}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Enter text here..."
            />
        </div>
    )
}

export default TextAreaBox