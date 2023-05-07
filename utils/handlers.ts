// import { AirportData } from '@/app/components/Airports';
// import { rest, RestRequest, ResponseComposition } from 'msw';

// const fakeAirports: AirportData[] = [
//   {
//     countryCode: 'US',
//     iataCode: 'ORD',
//     icaoCode: 'KORD',
//     lat: 41.978367,
//     lng: -87.904712,
//     name: 'Chicago OHare International Airport',
//   },
//   {
//     countryCode: 'US',
//     iataCode: 'ATL',
//     icaoCode: 'KATL',
//     lat: 41.978367,
//     lng: -87.904712,
//     name: 'Hartsfield-Jackson Atlanta International Airport',
//   },
//   {
//     countryCode: 'US',
//     iataCode: 'DFW',
//     icaoCode: 'KDFW',
//     lat: 41.978367,
//     lng: -87.904712,
//     name: 'Dallas/Fort Worth International Airport',
//   },
//   {
//     countryCode: 'US',
//     iataCode: 'LAX',
//     icaoCode: 'KLAX',
//     lat: 41.978367,
//     lng: -87.904712,
//     name: 'Los Angeles International Airport',
//   },
//   {
//     countryCode: 'US',
//     iataCode: 'CLT',
//     icaoCode: 'KCLT',
//     lat: 41.978367,
//     lng: -87.904712,
//     name: 'Charlotte Douglas International Airport',
//   },
// ];

// const handlers = [
//   rest.get(
//     `https://airlabs.co/api/v9/airports?api_key=${process.env.AIRLABS_API_KEY}`,
//     (req: RestRequest, res: ResponseComposition, ctx) => {
//       // return mock data
//       return res(ctx.json(fakeAirports));
//     }
//   ),
//   rest.get(
//     `https://airlabs.co/api/v9/airports?api_key=${process.env.AIRLABS_API_KEY}`,
//     (req: RestRequest, res: ResponseComposition, ctx) => {
//       // return mock data
//       return res(ctx.json(fakeAirports));
//     }
//   ),
// ];

// export { handlers };
