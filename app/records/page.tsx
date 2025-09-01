"use client";

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Patient {
  id: string
  fullName: string
  email?: string | null
  phone?: string | null
  gender?: string | null
  dob?: string | null
  allergies?: string | null
  conditions?: string | null
}

export default function RecordsPage() {
  const [q, setQ] = React.useState('')
  const [data, setData] = React.useState<Patient[]>([])
  async function load() {
    const res = await fetch(`/api/records?q=${encodeURIComponent(q)}`, { cache: 'no-store' })
    const json = await res.json()
    setData(json)
  }
  React.useEffect(() => {
    load()
  }, [])
  return (
    <div className="container py-10">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Patient Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search name/email/phone"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <Button onClick={load}>Search</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Phone</th>
                  <th className="py-2">Allergies</th>
                  <th className="py-2">Conditions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((p) => (
                  <tr key={p.id} className="border-t border-border">
                    <td className="py-2">{p.fullName}</td>
                    <td className="py-2">{p.email ?? '-'}</td>
                    <td className="py-2">{p.phone ?? '-'}</td>
                    <td className="py-2">{p.allergies ?? '-'}</td>
                    <td className="py-2">{p.conditions ?? '-'}</td>
                  </tr>
                ))}
                {!data.length && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No patients yet.
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