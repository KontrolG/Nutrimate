import { NextResponse } from 'next/server';
import foodDataModelInstance from '@/lib/model';

interface Params {
  fdcId: string;
}

export async function GET(request: Request, context: { params: Params }) {
  const { fdcId } = context.params;

  if (!fdcId) {
    return NextResponse.json({ message: 'Food ID (fdcId) is required' }, { status: 400 });
  }

  try {
    // Add a small delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 second delay

    const foodId = /^\d+$/.test(fdcId) ? parseInt(fdcId, 10) : fdcId;
    const result = foodDataModelInstance.getFoodById(foodId);

    if (!result) {
      return NextResponse.json({ message: `Food item with ID ${fdcId} not found` }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error(`API error fetching food ID ${fdcId}:`, error);
    return NextResponse.json({ message: 'Error processing request for food item' }, { status: 500 });
  }
}
