import generateBuilds from '@/app/utils/generateBuilds';
import { NextRequest, NextResponse } from 'next/server';
import { jsonParser } from '../../middleware/parseBody';
import { NextApiRequest, NextApiResponse } from 'next';

interface IParams {
  data: any;
}

export async function POST(
    req: Request,
) {
  try {
    // const data = req.nextUrl.searchParams.get('data');
    // const desiredEngravings = req.nextUrl.searchParams.get('desiredEngravings');
    const data = await req.json();
    
    // Perform some server-side processing using the received data

    // if (!data || !data.length || !data.desiredEngravings || !data.desiredEngravings.length) {
    //   throw new Error('Data undefined');
    // }

    //filter out empty engravings
    let filteredEngravings = data.desiredEngravings;
    filteredEngravings = Object.fromEntries(Object.entries(filteredEngravings).filter(([_, value]) => value != ""));
    // Send a modified JSON response back to the client
    const res = await generateBuilds(data, filteredEngravings);
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
