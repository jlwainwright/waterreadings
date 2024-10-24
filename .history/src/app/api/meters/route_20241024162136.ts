import { NextResponse } from 'next/server'

export async function GET() {
  // This is a mock implementation. Replace with actual data fetching logic when ready.
  const meters = [
    { id: '1', name: 'Heidi', currentReading: 1000 },
    { id: '2', name: 'Megan', currentReading: 2000 },
  ]

  return NextResponse.json(meters)
}
