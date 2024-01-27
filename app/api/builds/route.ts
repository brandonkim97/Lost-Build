import generateBuilds from '@/app/utils/generateBuilds';
import { NextRequest, NextResponse } from 'next/server';

interface IParams {
  data: any;
}

export async function GET(
    request: NextRequest
) {
  try {
    const data = request.nextUrl.searchParams.get('data');
    // Perform some server-side processing using the received data

    if (!data || typeof data === "undefined") return;

    // Send a modified JSON response back to the client
    generateBuilds(JSON.parse(data));
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error processing data:', error);

    // Send an error response back to the client with the error message in the body
    return new Response(JSON.stringify({ error: 'Internal Server Error', message: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
