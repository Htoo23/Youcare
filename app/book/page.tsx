"use client";

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// Define a schema for booking form validation using zod
const schema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  doctor: z.string().min(2, { message: 'Doctor name is required' }),
  reason: z.string().optional(),
  notes: z.string().optional(),
  date: z.string().min(1, { message: 'Date is required' }),
  time: z.string().min(1, { message: 'Time is required' }),
})

type FormData = z.infer<typeof schema>

export default function BookPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormData) {
    // Combine date and time into an ISO string
    const iso = new Date(`${values.date}T${values.time}:00`)
    const resp = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        email: values.email || null,
        date: iso.toISOString(),
      }),
    })
    if (!resp.ok) {
      const e = await resp.json().catch(() => ({}))
      alert('Failed: ' + (e.error || resp.statusText))
      return
    }
    reset()
    alert('Booking submitted!')
  }

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input {...register('fullName')} placeholder="John Smith" />
              {errors.fullName && (
                <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" {...register('email')} placeholder="john@email.com" />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input {...register('phone')} placeholder="+95..." />
            </div>
            <div>
              <label className="text-sm font-medium">Doctor</label>
              <Input {...register('doctor')} placeholder="Dr. Aye Chan" />
              {errors.doctor && (
                <p className="text-xs text-red-600 mt-1">{errors.doctor.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Reason</label>
              <Input {...register('reason')} placeholder="Headache, follow-up..." />
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input type="date" {...register('date')} />
              {errors.date && (
                <p className="text-xs text-red-600 mt-1">{errors.date.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Time</label>
              <Input type="time" {...register('time')} />
              {errors.time && (
                <p className="text-xs text-red-600 mt-1">{errors.time.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Notes</label>
              <Input {...register('notes')} placeholder="Anything the doctor should know?" />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Submitting...' : 'Submit Booking'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}