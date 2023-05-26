import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const fetchAirports = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.get(
      `https://airlabs.co/api/v9/airports?api_key=${process.env.AIRLABS_API_KEY}`
    );

    res.status(200).json(data.response);
  } catch (error) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default fetchAirports;
