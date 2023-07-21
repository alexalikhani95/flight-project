import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data } = await axios.get(
      `https://airlabs.co/api/v9/flights?api_key=${process.env.AIRLABS_API_KEY}`
    );

    return NextResponse.json({ data: data.response });
  } catch (error) {
    return new Response('failed to load', { status: 500 });
  }
}
