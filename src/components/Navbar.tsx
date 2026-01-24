import { Home, User } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="backdrop-blur-xl bg-background/40 dark:bg-background/20 border border-border/40 rounded-full shadow-2xl px-6 py-3">
        <div className="flex items-center gap-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-primary/60 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-primary-foreground"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <span className="font-semibold text-lg">TaskFlow</span>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-border/50" />

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="rounded-full gap-2">
              <Home className="h-4 w-4" />
              Home
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full gap-2">
              <User className="h-4 w-4" />
              Profile
            </Button>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-border/50" />

          {/* Theme Toggle */}
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </nav>
  );
}
