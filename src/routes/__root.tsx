import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Navbar } from '@/components/Navbar'
import Aurora from '@/components/Aurora'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="dark relative min-h-screen">
      {/* Aurora Background */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#e66b71","#825cff","#062def"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Route Content */}
      <Outlet />
      
      {/* Router Devtools */}
      <TanStackRouterDevtools />
    </div>
  )
}
