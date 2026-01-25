import { createLazyFileRoute } from '@tanstack/react-router'
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Home, Table, CheckSquare } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/tasks')({
  component: TasksPage,
})

// Initial nodes for the flow
const initialNodes = [
  {
    id: '1',
    type: 'default',
    position: { x: 250, y: 100 },
    data: { label: 'Task 1: Planning' },
  },
  {
    id: '2',
    type: 'default',
    position: { x: 250, y: 200 },
    data: { label: 'Task 2: Design' },
  },
  {
    id: '3',
    type: 'default',
    position: { x: 250, y: 300 },
    data: { label: 'Task 3: Development' },
  },
]

// Initial edges for the flow
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
]

function TasksPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="border-none">
          <SidebarHeader className="border-none">
            <Link to="/" className="flex items-center gap-2 px-4 py-4">
              <CheckSquare className="h-5 w-5" />
              <span className="font-semibold">TaskFlow</span>
            </Link>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/">
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/tables">
                        <Table className="h-4 w-4" />
                        <span>Tables</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link to="/tasks">
                        <CheckSquare className="h-4 w-4" />
                        <span>Tasks</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-none mt-auto">
            <div className="flex items-center justify-center px-4 py-3">
              <ThemeToggle />
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="border-b border-border/40">
            <div className="flex h-12 items-center gap-4 px-4">
              <SidebarTrigger />
              <h1 className="text-sm font-medium">Task Flow Board</h1>
            </div>
          </header>
          
          <div className="flex-1 w-full h-full">
            <ReactFlow
              nodes={initialNodes}
              edges={initialEdges}
              fitView
            >
              <Background />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
