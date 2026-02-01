import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export function WelcomeModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Check if the user has seen the welcome modal
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome')
    if (!hasSeenWelcome) {
      setOpen(true)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('hasSeenWelcome', 'true')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold text-center mb-4">
            Welcome to{' '}
            <span className="bg-linear-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              TaskFlow
            </span>
          </DialogTitle>
          <DialogDescription className="text-center text-lg mb-6">
            Streamline your workflow and boost productivity with our intuitive task management platform
          </DialogDescription>
        </DialogHeader>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="backdrop-blur-xl bg-card/40 border border-border/40 rounded-xl p-4 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">Experience blazing-fast performance with our optimized platform</p>
          </div>

          <div className="backdrop-blur-xl bg-card/40 border border-border/40 rounded-xl p-4 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Secure & Private</h3>
            <p className="text-sm text-muted-foreground">Your data is encrypted and protected with enterprise-grade security</p>
          </div>

          <div className="backdrop-blur-xl bg-card/40 border border-border/40 rounded-xl p-4 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Team Collaboration</h3>
            <p className="text-sm text-muted-foreground">Work together seamlessly with real-time collaboration features</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
