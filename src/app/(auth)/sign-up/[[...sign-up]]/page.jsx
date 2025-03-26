import { SignUp } from '@clerk/nextjs'
import { Card } from "@/components/ui/card"

export default function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.5),rgba(255,255,255,0.8))]" />
      <Card className="w-full max-w-md p-6 shadow-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
        <SignUp appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-none bg-transparent",
          }
        }}/>
      </Card>
    </div>
  )
}