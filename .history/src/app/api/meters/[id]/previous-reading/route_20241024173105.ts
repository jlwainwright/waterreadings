import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  // Your logic here
  return NextResponse.json({ previousReading: 100, id }) // Replace with actual data
}
