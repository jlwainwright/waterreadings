import { NextRequest, NextResponse } from 'next/server'
import { getPreviousReading } from '@/lib/readings'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params; // Ensure params are awaited
  
  try {
    const previousReading = await getPreviousReading(id)
    
    if (!previousReading) {
      return NextResponse.json({ error: 'No previous reading found' }, { status: 404 })
    }
    
    return NextResponse.json(previousReading)
  } catch (error) {
    console.error('Error fetching previous reading:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
