import { NextResponse } from 'next/server'

export async function GET() {
  // This is a mock implementation. Replace with actual data fetching logic when ready.
  const meters = [
    { id: '1', name: 'Meter 1', currentReading: 1000 },
    { id: '2', name: 'Meter 2', currentReading: 2000 },
    { id: '3', name: 'Meter 3', currentReading: 3000 },
  ]

  return NextResponse.json(meters)
}
