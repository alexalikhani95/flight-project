import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const iata_code = searchParams.get('iata_code');

    // return NextResponse.json({ iata_code });

    if (!iata_code) {
      // Handle the case when `iata_code` is missing or not provided
      return new Response('iata_code is required', { status: 400 });
    }

    console.log(iata_code);
    console.log(process.env.AIRLABS_API_KEY);

    // https://airlabs.co/api/v9/airports?iata_code=CDG&api_key=c0756ec2-5735-4a75-90e8-fa17e281ad48

    const { data } = await axios.get(
      `https://airlabs.co/api/v9/airports?iata_code=${iata_code}&api_key=${process.env.AIRLABS_API_KEY}`
    );

    return NextResponse.json({ data: data.response });
  } catch (error) {
    console.log({ error });
    return new Response('failed to load', { status: 500 });
  }
}

// import { NextResponse } from 'next/server'

// export async function GET(request: Request) {
// const { searchParams } = new URL(request.url)
// const id = searchParams.get('id')
//   const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   })
//   const product = await res.json()

//   return NextResponse.json({ product })
// }
