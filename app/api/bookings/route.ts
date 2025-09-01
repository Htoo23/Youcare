import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/bookings?q=&status=
// Returns a list of bookings, optionally filtered by a search query or status.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim() || undefined
  const status = searchParams.get('status') || undefined
  const bookings = await prisma.booking.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(q
        ? {
            OR: [
              { doctor: { contains: q, mode: 'insensitive' } },
              { reason: { contains: q, mode: 'insensitive' } },
              { notes: { contains: q, mode: 'insensitive' } },
              { patient: { fullName: { contains: q, mode: 'insensitive' } } },
            ],
          }
        : {}),
    },
    include: { patient: true },
    orderBy: { date: 'asc' },
  })
  return NextResponse.json(bookings)
}

// POST /api/bookings
// Creates a new booking, upserting the patient by email (if provided)
export async function POST(req: Request) {
  const body = await req.json()
  try {
    const date = new Date(body.date)
    if (isNaN(date.valueOf())) {
      return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
    }
    const patient = await prisma.patient.upsert({
      where: { email: body.email ?? `no-email-${crypto.randomUUID()}` },
      update: {
        fullName: body.fullName,
        phone: body.phone ?? null,
        gender: body.gender ?? null,
        dob: body.dob ? new Date(body.dob) : null,
        allergies: body.allergies ?? null,
        conditions: body.conditions ?? null,
      },
      create: {
        fullName: body.fullName,
        email: body.email ?? null,
        phone: body.phone ?? null,
        gender: body.gender ?? null,
        dob: body.dob ? new Date(body.dob) : null,
        allergies: body.allergies ?? null,
        conditions: body.conditions ?? null,
      },
    })
    const booking = await prisma.booking.create({
      data: {
        date,
        doctor: body.doctor,
        reason: body.reason ?? null,
        notes: body.notes ?? null,
        status: body.status ?? 'pending',
        patientId: patient.id,
      },
      include: { patient: true },
    })
    return NextResponse.json(booking, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

// PATCH /api/bookings
// Updates the status of an existing booking. Expects { id, status } in body.
export async function PATCH(req: Request) {
  const body = await req.json()
  if (!body.id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }
  try {
    const booking = await prisma.booking.update({
      where: { id: body.id },
      data: { status: body.status },
      include: { patient: true },
    })
    return NextResponse.json(booking)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}