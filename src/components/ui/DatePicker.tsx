import * as React from 'react'
import * as Popover from '@radix-ui/react-popover'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { Button } from './button'

type DatePickerProps = {
  value?: string
  onChange: (value: string) => void
  label?: string
}

function formatDate(d?: Date | null) {
  if (!d) return ''
  return d.toISOString().split('T')[0]
}

export function DatePicker({ value, onChange, label }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Date | undefined>(() => (value ? new Date(value) : undefined))

  React.useEffect(() => setSelected(value ? new Date(value) : undefined), [value])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button variant="outline" size="sm">{value ? value : (label || 'Select date')}</Button>
      </Popover.Trigger>

      <Popover.Content side="bottom" align="start" className="z-50 rounded-md border bg-card p-3 shadow-lg">
        <div className="w-[260px]">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(d) => {
              setSelected(d || undefined)
              onChange(formatDate(d || null))
            }}
          />
        </div>

        <div className="flex gap-2 justify-end mt-2">
          <Popover.Close asChild>
            <Button variant="outline" onClick={() => { setSelected(undefined); onChange('') }}>Clear</Button>
          </Popover.Close>
          <Popover.Close asChild>
            <Button onClick={() => setOpen(false)}>Done</Button>
          </Popover.Close>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}
