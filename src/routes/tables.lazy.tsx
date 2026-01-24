import { createLazyFileRoute } from '@tanstack/react-router'
import { DataTable } from '@/components/DataTable'
import { columns } from '@/components/columns'
import type { Payment } from '@/components/columns'

export const Route = createLazyFileRoute('/tables')({
  component: TablesPage,
})

// Dummy data for the table
const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "9kf83jd2",
    amount: 489,
    status: "success",
    email: "john.doe@example.com",
  },
  {
    id: "2h3k5j6l",
    amount: 623,
    status: "processing",
    email: "jane.smith@email.com",
  },
  {
    id: "8n4m2k1j",
    amount: 156,
    status: "failed",
    email: "bob.wilson@test.com",
  },
  {
    id: "7p9q8r5s",
    amount: 942,
    status: "success",
    email: "alice.johnson@demo.com",
  },
  {
    id: "4t6u7v8w",
    amount: 534,
    status: "processing",
    email: "charlie.brown@sample.com",
  },
]

function TablesPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Payment Tables</h1>
          <p className="text-muted-foreground mt-2">
            Manage and view payment transactions with advanced filtering and sorting
          </p>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
