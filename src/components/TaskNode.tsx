import { Handle, Position } from '@xyflow/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { TaskData } from '@/lib/markdown'

interface TaskNodeProps {
  id: string
  data: TaskData
  isConnectable?: boolean
  selected?: boolean
}

export function TaskNode({ id, data, isConnectable, selected }: TaskNodeProps) {
  return (
    <div
      className={
        `rounded-md p-3 min-w-[250px] max-w-[400px] transition-all duration-200 cursor-pointer relative border-2 shadow-sm hover:shadow-lg bg-card ` +
        (selected ? 'ring-4 ring-primary/14 shadow-lg' : 'ring-0')
      }
      style={{ borderColor: 'hsl(var(--muted-foreground))' }}
    >
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />

      <div className="flex justify-between items-start mb-3 gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm leading-5 text-foreground truncate" title={data.title}>
            {data.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">{data.date}</span>
            {data.due ? (
              <span className="text-xs text-red-500 font-medium">Due: {data.due}</span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="text-sm leading-6 text-foreground max-h-[300px] overflow-y-auto pr-2">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
          }}
        >
          {data.content || '*Click to add content*'}
        </ReactMarkdown>
      </div>

      <div className="text-xs text-muted-foreground mt-2 text-center italic opacity-60">Click to edit</div>

      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
    </div>
  )
}
