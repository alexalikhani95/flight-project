import { rest, RestRequest, ResponseComposition } from 'msw';
import {
  fakeAirports,
  fakeAirport,
  fakeFlights,
  fakeDelayedFlights,
  fakeSchedule,
} from './mockData';

const handlers = [
  rest.get(
    'http://localhost:3000/api/airports',
    (req: RestRequest, res: ResponseComposition, ctx) => {
      // return mock data
      return res(ctx.json(fakeAirports));
    }
  ),
  rest.get(
    'http://localhost:3000/api/airport',
    (req: RestRequest, res: ResponseComposition, ctx) => {
      // return mock data
      return res(ctx.json(fakeAirport));
    }
  ),
  rest.get(
    'http://localhost:3000/api/flights',
    (req: RestRequest, res: ResponseComposition, ctx) => {
      // return mock data
      return res(ctx.json(fakeFlights));
    }
  ),
  rest.get(
    'http://localhost:3000/api/schedule',
    (req: RestRequest, res: ResponseComposition, ctx) => {
      // return mock data
      return res(ctx.json(fakeSchedule));
    }
  ),
  rest.get(
    'http://localhost:3000/api/delays',
    (req: RestRequest, res: ResponseComposition, ctx) => {
      // return mock data
      return res(ctx.json(fakeDelayedFlights));
    }
  ),
];

export { handlers };
