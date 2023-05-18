import axios from 'axios';

const fetchAirports = async () => {
  const response = await axios.get(
    `https://airlabs.co/api/v9/airports?api_key=${process.env.AIRLABS_API_KEY}`
  );
  return JSON.stringify(response.data.response);
};

export async function GET(request: Request) {
  return new Response(await fetchAirports());
}
