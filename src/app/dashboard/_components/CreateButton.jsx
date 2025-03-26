"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sparkles, Plus } from "lucide-react"

const CreateButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto justify-start sm:justify-center gap-3">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Create Video</span>
          <span className="sm:hidden">New</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[95vw] sm:w-full p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-lg sm:text-xl font-semibold mb-4">
            Choose Creation Method
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Button 
            variant="outline" 
            className="flex flex-col h-24 sm:h-32 items-center justify-center gap-2 hover:border-primary transition-colors"
            onClick={() => window.location.href = '/dashboard/create/ai'}
          >
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <span className="font-medium text-sm sm:text-base">Generate with AI</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground">Create using AI assistance</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col h-32 items-center justify-center gap-2 hover:border-primary"
            onClick={() => window.location.href = '/editor'}
          >
            <Plus className="h-8 w-8 text-primary" />
            <span className="font-medium">Create from Scratch</span>
            <span className="text-xs text-muted-foreground">Manual video creation</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateButton