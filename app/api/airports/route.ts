import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await axios.get(
      `https://airlabs.co/api/v9/airports?api_key=${process.env.AIRLABS_API_KEY}`
    );

    return NextResponse.json({ data: data.response });
  } catch (error) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
