import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('req query', req.query);
    const { slug } = req.query;

    if (!slug) {
      // Handle the case when `slug` is missing or not provided
      return res.status(400).json({ error: 'IATA Code error' });
    }

    const { data } = await axios.get(
      `https://airlabs.co/api/v9/airports?iata_code=${slug}&api_key=${process.env.AIRLABS_API_KEY}`
    );

    return NextResponse.json({ data: data.response });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: 'failed to load data' });
  }
}
