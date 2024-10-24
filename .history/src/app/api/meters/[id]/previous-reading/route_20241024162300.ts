import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // This is a mock implementation. Replace with actual data fetching logic when ready.
  const previousReadings = {
    '1': 950,  // Previous reading for Heidi
    '2': 1900, // Previous reading for Megan
  }

  const previousReading = previousReadings[params.id as keyof typeof previousReadings] || null

  return NextResponse.json({ previousReading })
}
