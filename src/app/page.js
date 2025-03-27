import Header from "@/components/Header";
import { Video, Wand2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center px-4 py-32 text-center space-y-8">
          <div className="relative max-w-3xl">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/50 to-primary/30 blur-2xl opacity-25" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl relative bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              Create Amazing Videos with
              <span className="text-primary"> AI Magic</span>
            </h1>
          </div>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Transform your ideas into stunning videos with our AI-powered platform. 
            No expertise needed - just describe what you want, and watch the magic happen.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/sign-up">Get Started</Link>
            </Button>
            <Button variant="secondary" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-16 max-w-6xl mx-auto">
          <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="space-y-1">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">AI Video Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Create professional videos in minutes using our advanced AI technology.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="space-y-1">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wand2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Magic Editing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Edit and enhance your videos with just a few clicks using AI-powered tools.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="space-y-1">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Smart Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Choose from hundreds of AI-optimized templates for quick video creation.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}