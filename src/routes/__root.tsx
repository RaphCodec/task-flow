import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Navbar } from '@/components/Navbar'
import Aurora from '@/components/Aurora'
import { ThemeProvider, useTheme } from '@/components/ThemeProvider'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  )
}

function RootLayout() {
  const router = useRouterState()
  const { theme } = useTheme()
  const isTasksPage = router.location.pathname === '/tasks'
  const isHomePage = router.location.pathname === '/'

  // Dark mode colors (current)
  const darkModeColors = ["#e66b71","#825cff","#062def"]
  // Light mode colors (softer, pastel-like colors)
  const lightModeColors = ["#9EBDFF","#a78bfa","#FFAE9E"]

  return (
      <div className="relative min-h-screen">
        {/* Aurora Background - only on home page */}
        <div className={`fixed inset-0 -z-10 ${!isHomePage ? 'hidden' : ''}`}>
          <Aurora
            colorStops={theme === 'dark' ? darkModeColors : lightModeColors}
            blend={0.5}
            amplitude={1.0}
            speed={1}
          />
        </div>

        {/* Navbar - only on non-tasks pages */}
        {!isTasksPage && <Navbar />}

        {/* Route Content */}
        <Outlet />
        
        {/* Router Devtools */}
        <TanStackRouterDevtools />
      </div>
  )
}
