import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const fetchFlights = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.get(
      `https://airlabs.co/api/v9/flights?api_key=${process.env.NEXT_PUBLIC_AIRLABS_API_KEY}`
    );

    res.status(200).json(data.response);
  } catch (error) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default fetchFlights;
