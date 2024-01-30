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
    const desiredEngravings = request.nextUrl.searchParams.get('desiredEngravings');
    
    // Perform some server-side processing using the received data

    if (!data || !data.length || !desiredEngravings || !desiredEngravings.length) {
      throw new Error('Data undefined');
    }

    //filter out empty engravings
    let filteredEngravings = JSON.parse(desiredEngravings);
    filteredEngravings = Object.fromEntries(Object.entries(filteredEngravings).filter(([_, value]) => value != ""));

    // Send a modified JSON response back to the client
    const res = await generateBuilds(JSON.parse(data), filteredEngravings);
    return NextResponse.json(res);
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
