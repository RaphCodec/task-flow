import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ThemeProvider } from '@/components/ThemeProvider'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        {/* Route Content */}
        <Outlet />
        
        {/* Router Devtools */}
        <TanStackRouterDevtools />
      </div>
    </ThemeProvider>
  )
}
