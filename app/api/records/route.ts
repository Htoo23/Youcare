import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/records?q=
// Returns a list of patients filtered by optional search query.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim() || undefined
  const patients = await prisma.patient.findMany({
    where: q
      ? {
          OR: [
            { fullName: { contains: q, mode: 'insensitive' } },
            { email: { contains: q, mode: 'insensitive' } },
            { phone: { contains: q, mode: 'insensitive' } },
          ],
        }
      : {},
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(patients)
}