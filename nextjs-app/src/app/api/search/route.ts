import { NextResponse } from 'next/server';
import foodDataModelInstance from '@/lib/model';
import { sanitizePattern, getPositiveInteger } from '@/utils/server-utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const startStr = searchParams.get('start');
  const limitStr = searchParams.get('limit');

  const searchPattern = sanitizePattern(query);
  const start = getPositiveInteger(startStr) || 0;
  const limit = getPositiveInteger(limitStr) || 10;

  try {
    // Add a small delay to simulate network latency, like in the original app
    await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 second delay

    const results = foodDataModelInstance.getResultsFromSearch(searchPattern, start, limit);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ message: 'Error processing search request' }, { status: 500 });
  }
}
