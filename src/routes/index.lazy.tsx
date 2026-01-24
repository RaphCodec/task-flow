import { createLazyFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Welcome to{' '}
            <span className="bg-linear-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              TaskFlow
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Streamline your workflow and boost productivity with our intuitive task management platform
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button size="lg" className="rounded-full gap-2 text-lg px-8 py-6">
            Get Started
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full text-lg px-8 py-6">
            Learn More
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
          <div className="backdrop-blur-xl bg-card/40 border border-border/40 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Lightning Fast</h3>
            <p className="text-muted-foreground">Experience blazing-fast performance with our optimized platform</p>
          </div>

          <div className="backdrop-blur-xl bg-card/40 border border-border/40 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Secure & Private</h3>
            <p className="text-muted-foreground">Your data is encrypted and protected with enterprise-grade security</p>
          </div>

          <div className="backdrop-blur-xl bg-card/40 border border-border/40 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Team Collaboration</h3>
            <p className="text-muted-foreground">Work together seamlessly with real-time collaboration features</p>
          </div>
        </div>
      </div>
    </main>
  )
}
