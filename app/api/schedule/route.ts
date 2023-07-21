import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const iata_code = searchParams.get('iata_code');

    if (!iata_code) {
      // Handle the case when `iata_code` is missing or not provided
      return new Response('iata_code is required', { status: 400 });
    }

    console.log(iata_code);
    console.log(process.env.AIRLABS_API_KEY);

    const { data } = await axios.get(
      `https://airlabs.co/api/v9/schedules?dep_iata=${iata_code}&api_key=${process.env.AIRLABS_API_KEY}`
    );

    return NextResponse.json({ data: data.response });
  } catch (error) {
    console.log({ error });
    return new Response('failed to load', { status: 500 });
  }
}
