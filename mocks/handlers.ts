import { rest, RestRequest, ResponseComposition } from 'msw';
import { fakeAirports, fakeFlights, fakeDelayedFlights } from './mockData';

const handlers = [
  rest.get(
    'https://airlabs.co/api/v9/airports',
    (req: RestRequest, res: ResponseComposition, ctx) => {
      // return mock data
      return res(ctx.json(fakeAirports));
    }
  ),
  rest.get(
    'https://airlabs.co/api/v9/flights',
    (req: RestRequest, res: ResponseComposition, ctx) => {
      // return mock data
      return res(ctx.json(fakeFlights));
    }
  ),
  rest.get(
    'https://airlabs.co/api/v9/delays',
    (req: RestRequest, res: ResponseComposition, ctx) => {
      // return mock data
      return res(ctx.json(fakeDelayedFlights));
    }
  ),
];

export { handlers };
