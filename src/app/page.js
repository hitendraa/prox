import Header from "@/components/Header";
import { Bot, Video, Wand2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center px-4 py-32 text-center">          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-secondary blur-2xl opacity-25"></div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl relative">
              Create Amazing Videos with
              <span className="text-primary"> AI Magic</span>
            </h1>
          </div>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Transform your ideas into stunning videos with our AI-powered platform. 
            No expertise needed - just describe what you want, and watch the magic happen.
          </p>
          <div className="mt-10 flex gap-4">
            <Link href="/sign-up" className="rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:opacity-90 transition">
              Get Started
            </Link>
            <button className="rounded-lg border border-input bg-background px-6 py-3 hover:bg-accent transition">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-16 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Video Generation</h3>
            <p className="text-muted-foreground">
              Create professional videos in minutes using our advanced AI technology.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Wand2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Magic Editing</h3>
            <p className="text-muted-foreground">
              Edit and enhance your videos with just a few clicks using AI-powered tools.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Templates</h3>
            <p className="text-muted-foreground">
              Choose from hundreds of AI-optimized templates for quick video creation.
            </p>
          </div>
        </div>
      </main>
    </>
  );

}