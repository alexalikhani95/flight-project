import { rest, RestRequest, ResponseComposition } from 'msw';
import { fakeAirports, fakeFlights, fakeDelayedFlights } from './mockData';

const handlers = [
  rest.get(
    `https://airlabs.co/api/v9/airports?api_key=${process.env.AIRLABS_API_KEY}`,
    (req: RestRequest, res: ResponseComposition, ctx) => {
      // return mock data
      return res(ctx.json(fakeAirports));
    }
  ),
  rest.get(
    `https://airlabs.co/api/v9/flights?api_key=${process.env.AIRLABS_API_KEY}`,
    (req: RestRequest, res: ResponseComposition, ctx) => {
      // return mock data
      return res(ctx.json(fakeFlights));
    }
  ),
  rest.get(
    `https://airlabs.co/api/v9/delays?delay=60&type=departures&api_key=${process.env.AIRLABS_API_KEY}`,
    (req: RestRequest, res: ResponseComposition, ctx) => {
      // return mock data
      return res(ctx.json(fakeDelayedFlights));
    }
  ),
];

export { handlers };
