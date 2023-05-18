import axios from 'axios';

const fetchFlights = async () => {
  const response = await axios.get(
    `https://airlabs.co/api/v9/delays?delay=60&type=departures&api_key=${process.env.AIRLABS_API_KEY}`
  );
  return JSON.stringify(response.data.response);
};

export async function GET(request: Request) {
  return new Response(await fetchFlights());
}
