import { createLazyFileRoute } from '@tanstack/react-router'
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { ThemeToggle } from '@/components/ThemeToggle'
import { WelcomeModal } from '@/components/WelcomeModal'
import { CheckSquare, Home, Layout, Settings, Users, FileText, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export const Route = createLazyFileRoute('/')({
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
    <>
      <WelcomeModal />
      <TooltipProvider>
        <div className="flex h-screen w-full">
          {/* Minimalist Sidebar */}
          <aside className="w-16 border-r border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 flex flex-col">
            {/* Logo */}
            <div className="h-14 flex items-center justify-center border-b border-border/40">
              <CheckSquare className="h-5 w-5 text-primary" />
            </div>

            {/* Navigation Buttons */}
            <nav className="flex-1 flex flex-col items-center py-4 gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Home className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Layout className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Board</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Calendar className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Calendar</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <FileText className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Notes</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Users className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Team</p>
                </TooltipContent>
              </Tooltip>
            </nav>

            {/* Bottom Section */}
            <div className="flex flex-col items-center py-4 gap-2 border-t border-border/40">
              <ThemeToggle />
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Settings className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
              <div className="flex h-14 items-center justify-between px-6">
                <h1 className="text-lg font-semibold">TaskFlow</h1>
              </div>
            </header>
            
            <main className="flex-1 w-full h-full">
              <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                fitView
              >
                <Background />
                <Controls />
                <MiniMap />
              </ReactFlow>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </>
  )
}
