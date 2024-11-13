import { NextRequest, NextResponse } from 'next/server';
import { rateDog } from '@/lib/db';

export async function POST(
  request: NextRequest,
) {
  try {
    const { rating, dogId } = await request.json();
    const result = await rateDog(dogId, rating);
    return NextResponse.json({
      message: 'Dog rated successfully',
      result,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to rate dog' },
      { status: 500 }
    );
  }
}