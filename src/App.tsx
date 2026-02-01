import { useState, useCallback, useEffect } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react'
import type { Connection, NodeTypes } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Button } from "@/components/ui/button"
import { TaskNode } from '@/components/TaskNode'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Plus, Save, Trash2, CheckSquare, Home, Layout, Settings, Users, Calendar } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { DatePicker } from '@/components/ui/DatePicker'
import type { TaskData } from '@/lib/markdown'
import { generateTaskId, createDefaultTask } from '@/lib/markdown'
import './App.css'

const nodeTypes: NodeTypes = {
  task: TaskNode,
}

const initialNodes = [
  {
    id: '1',
    type: 'task',
    position: { x: 100, y: 100 },
    data: {
      title: 'Task 1: Planning',
      date: new Date().toISOString().split('T')[0],
      content: '- Define requirements\n- Create timeline',
    } as TaskData,
  },
  {
    id: '2',
    type: 'task',
    position: { x: 400, y: 100 },
    data: {
      title: 'Task 2: Design',
      date: new Date().toISOString().split('T')[0],
      content: '- Create wireframes\n- Design mockups',
    } as TaskData,
  },
  {
    id: '3',
    type: 'task',
    position: { x: 700, y: 100 },
    data: {
      title: 'Task 3: Development',
      date: new Date().toISOString().split('T')[0],
      content: '- Set up project\n- Implement features',
    } as TaskData,
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
]

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null)
  const [editingData, setEditingData] = useState<TaskData | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  const isValidDateString = (s?: string) => {
    if (!s) return false
    const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (!m) return false
    const y = Number(m[1])
    const mo = Number(m[2])
    const d = Number(m[3])
    const dt = new Date(y, mo - 1, d)
    return dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d
  }

  // When changing the required "date" field, only persist when the date is valid.
  const handleDateChange = (field: 'date' | 'due', value: string) => {
    if (!editingData || !editingNodeId) return

    if (field === 'date') {
      if (!value || value.length === 0) {
        // don't wipe the date; show validation error instead
        setValidationError('Date is required and must be YYYY-MM-DD')
        return
      }
      if (!isValidDateString(value)) {
        setValidationError('Date is required and must be YYYY-MM-DD')
        return
      }
      // valid: update editingData, nodes, and save immediately
      const next: TaskData = { ...editingData, date: value }
      setEditingData(next)
      setNodes((nds) => nds.map((n) => (n.id === editingNodeId ? { ...n, data: next } : n)))
      setValidationError(null)
      saveToStorage()
      return
    }

    // due is optional
    const next: TaskData = { ...editingData, due: value }
    setEditingData(next)
    setValidationError(null)
  }

  // Handle edge connection
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds))
      saveToStorage()
    },
    [setEdges]
  )

  // Delete an edge on double-click
  const onEdgeDoubleClick = useCallback((event: MouseEvent, edge: any) => {
    event.preventDefault()
    setEdges((eds) => eds.filter((e) => e.id !== edge.id))
    saveToStorage()
  }, [setEdges])

  // Keyboard shortcut: Delete / Backspace removes selected nodes and edges
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Delete' && e.key !== 'Backspace') return

      let removed = false

      setEdges((eds) => {
        const remaining = eds.filter((edge) => !edge.selected)
        if (remaining.length !== eds.length) removed = true
        return remaining
      })

      setNodes((nds) => {
        const remaining = nds.filter((node) => !node.selected)
        if (remaining.length !== nds.length) removed = true
        return remaining
      })

      if (removed) saveToStorage()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setEdges, setNodes])

  // Save node edits
  const handleSaveNode = useCallback(() => {
    if (!editingNodeId || !editingData) return

    // validate before saving
    const err = (() => {
      if (!editingData.title || editingData.title.trim().length === 0) return 'Title is required'
      const isValidDate = (s?: string) => {
        if (!s) return false
        const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
        if (!m) return false
        const y = Number(m[1])
        const mo = Number(m[2])
        const d = Number(m[3])
        const dt = new Date(y, mo - 1, d)
        return dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d
      }
      if (!isValidDate(editingData.date)) return 'Date is required and must be YYYY-MM-DD'
      if (editingData.due && editingData.due.length > 0 && !isValidDate(editingData.due)) return 'Due date must be YYYY-MM-DD'
      return null
    })()

    if (err) {
      setValidationError(err)
      return
    }

    setNodes((nds) =>
      nds.map((node) =>
        node.id === editingNodeId
          ? { ...node, data: editingData }
          : node
      )
    )

    saveToStorage()
    setEditingNodeId(null)
    setEditingData(null)
    setValidationError(null)
  }, [editingNodeId, editingData, setNodes])

  // Delete node
  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId))
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    )
    saveToStorage()
  }, [setNodes, setEdges])

  // Create new node
  const handleAddNode = useCallback(() => {
    const newNodeId = generateTaskId()
    const newNode = {
      id: newNodeId,
      type: 'task',
      position: { 
        x: Math.random() * 400, 
        y: Math.random() * 400 
      },
      data: createDefaultTask(`New Task ${nodes.length + 1}`),
    }
    setNodes((nds) => [...nds, newNode])
    saveToStorage()
  }, [nodes.length, setNodes])

  // Save to localStorage
  const saveToStorage = useCallback(() => {
    const flowState = {
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data,
      })),
      edges,
    }
    localStorage.setItem('taskFlowState', JSON.stringify(flowState))
  }, [nodes, edges])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('taskFlowState')
    if (saved) {
      try {
        const flowState = JSON.parse(saved)
        setNodes(flowState.nodes)
        setEdges((flowState.edges || []).map((e: any) => ({ ...e, animated: true })))
      } catch (e) {
        console.error('Failed to load saved flow:', e)
      }
    }
  }, [])

  // Compute dependent (incoming) counts for each node so node components update immediately.
  useEffect(() => {
    setNodes((prevNodes) => {
      let changed = false
      const next = prevNodes.map((n) => {
        const incoming = edges.filter((e) => e.target === n.id)
        const sources = incoming.map((e) => e.source)
        const completed = sources.reduce((acc, sid) => {
          const node = prevNodes.find((x) => x.id === sid)
          return acc + (node?.data?.status === 'done' ? 1 : 0)
        }, 0)
        const related = sources.length
        const percent = related > 0 ? Math.round((completed / related) * 100) : n.data?.status === 'done' ? 100 : 0

        const currentRelated = (n.data as any)?._relatedCount ?? null
        const currentCompleted = (n.data as any)?._completedCount ?? null
        const currentPercent = (n.data as any)?._progressPercent ?? null

        if (currentRelated !== related || currentCompleted !== completed || currentPercent !== percent) {
          changed = true
          return { ...n, data: { ...n.data, _relatedCount: related, _completedCount: completed, _progressPercent: percent } }
        }
        return n
      })

      return changed ? next : prevNodes
    })
  }, [edges, nodes])

  // Update editing data
  const updateNodeData = (field: keyof TaskData, value: string) => {
    if (!editingData) return
    const next: TaskData = {
      ...editingData,
      [field]: value,
    }
    setEditingData(next)

    // realtime validation
    const isValidDate = (s?: string) => {
      if (!s) return false
      const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
      if (!m) return false
      const y = Number(m[1])
      const mo = Number(m[2])
      const d = Number(m[3])
      const dt = new Date(y, mo - 1, d)
      return dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d
    }

    if (!next.title || next.title.trim().length === 0) {
      setValidationError('Title is required')
      return
    }
    if (!isValidDate(next.date)) {
      setValidationError('Date is required and must be YYYY-MM-DD')
      return
    }
    if (next.due && next.due.length > 0 && !isValidDate(next.due)) {
      setValidationError('Due date must be YYYY-MM-DD')
      return
    }
    setValidationError(null)
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full">
        <aside className="w-16 border-r border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 flex flex-col">
          <div className="h-14 flex items-center justify-center border-b border-border/40">
            <CheckSquare className="h-5 w-5 text-primary" />
          </div>

          <nav className="flex-1 flex flex-col items-center py-4 gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Home className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right"><p>Home</p></TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Layout className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right"><p>Board</p></TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Calendar className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right"><p>Calendar</p></TooltipContent>
            </Tooltip>

            {/* Notes removed per user request */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Users className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right"><p>Team</p></TooltipContent>
            </Tooltip>
          </nav>

          <div className="flex flex-col items-center py-4 gap-2 border-t border-border/40">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right"><p>Settings</p></TooltipContent>
            </Tooltip>
          </div>
        </aside>

        <div className="flex-1 flex flex-col bg-background">
          <header className="border-b border-border/40 h-16 flex items-center justify-between px-6">
            <h1 className="text-2xl font-bold">TaskFlow</h1>
            <div className="flex items-center gap-4">
              <Button onClick={handleAddNode} size="sm" variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />New Task
              </Button>
              <Button onClick={saveToStorage} size="sm" variant="outline" className="gap-2">
                <Save className="h-4 w-4" />Save
              </Button>
              <ThemeToggle />
            </div>
          </header>

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                onNodeClick={(event, node) => {
                  setEditingNodeId(node.id)
                  setEditingData({ ...node.data })
                }}
              >
                <Background />
                <Controls />
                <MiniMap />
              </ReactFlow>
            </div>

            {editingNodeId && editingData && (
              <div className="w-80 border-l border-border/40 p-6 overflow-y-auto flex flex-col gap-4 bg-card">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Edit Task</h2>
                  <button onClick={() => setEditingNodeId(null)} className="text-muted-foreground hover:text-foreground text-xl">✕</button>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    value={editingData.status || 'new'}
                    onChange={(e) => updateNodeData('status', e.target.value as any)}
                    className="px-3 py-2 rounded border border-input bg-background text-foreground"
                  >
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Title</label>
                  <input type="text" value={editingData.title} onChange={(e) => updateNodeData('title', e.target.value)} className="px-3 py-2 rounded border border-input bg-background text-foreground" placeholder="Task title" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Created</label>
                  <div className="px-3 py-2 rounded border border-input bg-background text-foreground">{editingData.date}</div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Due date (optional)</label>
                  <DatePicker value={editingData.due || ''} onChange={(v) => updateNodeData('due', v)} label="Due date" />
                </div>

                <div className="flex flex-col gap-2 flex-1 min-h-0">
                  <label className="text-sm font-medium">Content (Markdown)</label>
                  <textarea value={editingData.content} onChange={(e) => updateNodeData('content', e.target.value)} className="px-3 py-2 rounded border border-input bg-background text-foreground font-mono text-xs flex-1 resize-none" placeholder="# Heading\n- Bullet point\n**Bold text**" />
                </div>

                {validationError ? (
                  <div className="text-sm text-red-500">{validationError}</div>
                ) : null}

                <div className="flex gap-2 pt-4 border-t border-border/40">
                  <Button onClick={handleSaveNode} className="flex-1" size="sm" disabled={!!validationError}>Save Changes</Button>
                  <Button onClick={() => { handleDeleteNode(editingNodeId); setEditingNodeId(null); setEditingData(null); }} variant="destructive" size="sm" className="gap-2">
                    <Trash2 className="h-4 w-4" />Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default App