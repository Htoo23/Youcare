"use client";

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'

interface Booking {
  id: string
  date: string
  doctor: string
  reason?: string | null
  notes?: string | null
  status: string
  patient: {
    fullName: string
    email?: string | null
    phone?: string | null
  }
}

export default function BookingsPage() {
  const [q, setQ] = React.useState('')
  const [data, setData] = React.useState<Booking[]>([])

  async function load() {
    const res = await fetch(`/api/bookings?q=${encodeURIComponent(q)}`, { cache: 'no-store' })
    const json = await res.json()
    setData(json)
  }
  React.useEffect(() => {
    load()
  }, [])

  async function setStatus(id: string, status: string) {
    const res = await fetch('/api/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    if (res.ok) {
      load()
    }
  }

  return (
    <div className="container py-10">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search name/doctor/reason"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <Button onClick={load}>Search</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="py-2">Patient</th>
                  <th className="py-2">Doctor</th>
                  <th className="py-2">Date/Time</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((b) => (
                  <tr key={b.id} className="border-t border-border">
                    <td className="py-2">{b.patient.fullName}</td>
                    <td className="py-2">{b.doctor}</td>
                    <td className="py-2">{format(new Date(b.date), 'MMM d, yyyy HH:mm')}</td>
                    <td className="py-2 capitalize">{b.status}</td>
                    <td className="py-2">
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setStatus(b.id, 'confirmed')}>
                          Confirm
                        </Button>
                        <Button variant="outline" onClick={() => setStatus(b.id, 'cancelled')}>
                          Cancel
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!data.length && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No bookings yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}