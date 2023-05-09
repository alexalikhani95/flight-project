import { rest, RestRequest, ResponseComposition } from 'msw';

const fakeAirports = [
  {
    countryCode: 'US',
    iataCode: 'ORD',
    icaoCode: 'KORD',
    lat: 41.978367,
    lng: -87.904712,
    name: 'Chicago OHare International Airport',
  },
  {
    countryCode: 'US',
    iataCode: 'ATL',
    icaoCode: 'KATL',
    lat: 41.978367,
    lng: -87.904712,
    name: 'Hartsfield-Jackson Atlanta International Airport',
  },
  {
    countryCode: 'US',
    iataCode: 'DFW',
    icaoCode: 'KDFW',
    lat: 41.978367,
    lng: -87.904712,
    name: 'Dallas/Fort Worth International Airport',
  },
  {
    countryCode: 'US',
    iataCode: 'LAX',
    icaoCode: 'KLAX',
    lat: 41.978367,
    lng: -87.904712,
    name: 'Los Angeles International Airport',
  },
  {
    countryCode: 'US',
    iataCode: 'CLT',
    icaoCode: 'KCLT',
    lat: 41.978367,
    lng: -87.904712,
    name: 'Charlotte Douglas International Airport',
  },
];

const fakeFlights = [
  {
    aircraft_icao: 'A20N',
    aircraft_iata: '32N',
    airline_icao: 'AAL',
    alt: 10050,
    arr_iata: 'DFW',
    arr_icao: 'KDFW',
    dep_iata: 'ORD',
    dep_icao: 'KORD',
    dir: 7,
    flag: 'US',
    flight_iata: 'AA123',
    flight_icao: 'AAL123',
    flight_number: '1',
    hex: 'A12345',
    lat: 41.978367,
    lng: -87.904712,
    reg_number: 'NA-12345',
    speed: 250,
    squawk: '1234',
    status: 'en-route',
    updated: 1623931200,
    v_speed: 0,
  },
];

const fakeDelayedFlights = [
  {
    aircraft_icao: 'ABC123',
    airline_iata: 'PT',
    airline_icao: 'PDT',
    arr_actual: '2023-05-08 16:42',
    arr_actual_ts: 1683578520,
    arr_actual_utc: '2023-05-08 20:42',
    arr_baggage: 'B123',
    arr_delayed: 132,
    arr_estimated: '2023-05-08 16:42',
    arr_estimated_ts: 1683578520,
    arr_estimated_utc: '2023-05-08 20:42',
    arr_gate: '37',
    arr_iata: 'PHL',
    arr_icao: 'KPHL',
    arr_terminal: 'F',
    arr_time: '2023-05-08 14:30',
    arr_time_ts: 1683570600,
    arr_time_utc: '2023-05-08 18:30',
    cs_airline_iata: 'CS',
    cs_flight_iata: 'CS123',
    cs_flight_number: '123',
    delayed: 132,
    dep_actual: '2023-05-08 15:16',
    dep_actual_ts: 1683573360,
    dep_actual_utc: '2023-05-08 19:16',
    dep_delayed: 145,
    dep_estimated: '2023-05-08 15:16',
    dep_estimated_ts: 1683573360,
    dep_estimated_utc: '2023-05-08 19:16',
    dep_gate: '24',
    dep_iata: 'PWM',
    dep_icao: 'KPWM',
    dep_terminal: 'T1',
    dep_time: '2023-05-08 12:51',
    dep_time_ts: 1683564660,
    dep_time_utc: '2023-05-08 16:51',
    duration: 99,
    flight_iata: 'PT5969',
    flight_icao: 'PDT5969',
    flight_number: '5969',
    status: 'landed',
  },
  {
    aircraft_icao: 'XYZ789',
    airline_iata: 'LH',
    airline_icao: 'DLH',
    arr_actual: '2023-05-08 19:15',
    arr_actual_ts: 1683588900,
    arr_actual_utc: '2023-05-08 23:15',
    arr_baggage: 'B456',
    arr_delayed: 50,
    arr_estimated: '2023-05-08 19:15',
    arr_estimated_ts: 1683588900,
    arr_estimated_utc: '2023-05-08 23:15',
    arr_gate: '21',
    arr_iata: 'FRA',
    arr_icao: 'EDDF',
    arr_terminal: '2',
    arr_time: '2023-05-08 17:45',
    arr_time_ts: 1683583500,
    arr_time_utc: '2023-05-08 21:45',
    cs_airline_iata: 'CS',
    cs_flight_iata: 'CS456',
    cs_flight_number: '456',
    delayed: 50,
    dep_actual: '2023-05-08 18:20',
    dep_actual_ts: '',
    dep_actual_utc: '2023-05-08 19:16',
    dep_delayed: 145,
    dep_estimated: '2023-05-08 15:16',
    dep_estimated_ts: 1683573360,
    dep_estimated_utc: '2023-05-08 19:16',
    dep_gate: '24',
    dep_iata: 'PWM',
    dep_icao: 'KPWM',
    dep_terminal: 'T1',
    dep_time: '2023-05-08 12:51',
    dep_time_ts: 1683564660,
    dep_time_utc: '2023-05-08 16:51',
    duration: 99,
    flight_iata: 'PT5969',
    flight_icao: 'PDT5969',
    flight_number: '9757',
    status: 'landed',
  },
  {
    aircraft_icao: 'XYZ789',
    airline_iata: 'LH',
    airline_icao: 'DLH',
    arr_actual: '2023-05-08 19:15',
    arr_actual_ts: 1683588900,
    arr_actual_utc: '2023-05-08 23:15',
    arr_baggage: 'B456',
    arr_delayed: 50,
    arr_estimated: '2023-05-08 19:15',
    arr_estimated_ts: 1683588900,
    arr_estimated_utc: '2023-05-08 23:15',
    arr_gate: '21',
    arr_iata: 'FRA',
    arr_icao: 'EDDF',
    arr_terminal: '2',
    arr_time: '2023-05-08 17:45',
    arr_time_ts: 1683583500,
    arr_time_utc: '2023-05-08 21:45',
    cs_airline_iata: 'CS',
    cs_flight_iata: 'CS456',
    cs_flight_number: '456',
    delayed: 50,
    dep_actual: '2023-05-08 18:20',
    dep_actual_ts: '',
    dep_actual_utc: '2023-05-08 19:16',
    dep_delayed: 145,
    dep_estimated: '2023-05-08 15:16',
    dep_estimated_ts: 1683573360,
    dep_estimated_utc: '2023-05-08 19:16',
    dep_gate: '24',
    dep_iata: 'PWM',
    dep_icao: 'KPWM',
    dep_terminal: 'T1',
    dep_time: '2023-05-08 12:51',
    dep_time_ts: 1683564660,
    dep_time_utc: '2023-05-08 16:51',
    duration: 99,
    flight_iata: 'PT5969',
    flight_icao: 'PDT5969',
    flight_number: '0754',
    status: 'landed',
  },
  {
    aircraft_icao: 'XYZ789',
    airline_iata: 'LH',
    airline_icao: 'DLH',
    arr_actual: '2023-05-08 19:15',
    arr_actual_ts: 1683588900,
    arr_actual_utc: '2023-05-08 23:15',
    arr_baggage: 'B456',
    arr_delayed: 50,
    arr_estimated: '2023-05-08 19:15',
    arr_estimated_ts: 1683588900,
    arr_estimated_utc: '2023-05-08 23:15',
    arr_gate: '21',
    arr_iata: 'FRA',
    arr_icao: 'EDDF',
    arr_terminal: '2',
    arr_time: '2023-05-08 17:45',
    arr_time_ts: 1683583500,
    arr_time_utc: '2023-05-08 21:45',
    cs_airline_iata: 'CS',
    cs_flight_iata: 'CS456',
    cs_flight_number: '456',
    delayed: 50,
    dep_actual: '2023-05-08 18:20',
    dep_actual_ts: '',
    dep_actual_utc: '2023-05-08 19:16',
    dep_delayed: 145,
    dep_estimated: '2023-05-08 15:16',
    dep_estimated_ts: 1683573360,
    dep_estimated_utc: '2023-05-08 19:16',
    dep_gate: '24',
    dep_iata: 'PWM',
    dep_icao: 'KPWM',
    dep_terminal: 'T1',
    dep_time: '2023-05-08 12:51',
    dep_time_ts: 1683564660,
    dep_time_utc: '2023-05-08 16:51',
    duration: 99,
    flight_iata: 'PT5969',
    flight_icao: 'PDT5969',
    flight_number: '0435',
    status: 'landed',
  },
  {
    aircraft_icao: 'XYZ789',
    airline_iata: 'LH',
    airline_icao: 'DLH',
    arr_actual: '2023-05-08 19:15',
    arr_actual_ts: 1683588900,
    arr_actual_utc: '2023-05-08 23:15',
    arr_baggage: 'B456',
    arr_delayed: 50,
    arr_estimated: '2023-05-08 19:15',
    arr_estimated_ts: 1683588900,
    arr_estimated_utc: '2023-05-08 23:15',
    arr_gate: '21',
    arr_iata: 'FRA',
    arr_icao: 'EDDF',
    arr_terminal: '2',
    arr_time: '2023-05-08 17:45',
    arr_time_ts: 1683583500,
    arr_time_utc: '2023-05-08 21:45',
    cs_airline_iata: 'CS',
    cs_flight_iata: 'CS456',
    cs_flight_number: '456',
    delayed: 50,
    dep_actual: '2023-05-08 18:20',
    dep_actual_ts: '',
    dep_actual_utc: '2023-05-08 19:16',
    dep_delayed: 145,
    dep_estimated: '2023-05-08 15:16',
    dep_estimated_ts: 1683573360,
    dep_estimated_utc: '2023-05-08 19:16',
    dep_gate: '24',
    dep_iata: 'PWM',
    dep_icao: 'KPWM',
    dep_terminal: 'T1',
    dep_time: '2023-05-08 12:51',
    dep_time_ts: 1683564660,
    dep_time_utc: '2023-05-08 16:51',
    duration: 99,
    flight_iata: 'PT5969',
    flight_icao: 'PDT5969',
    flight_number: '4545',
    status: 'landed',
  },
  {
    aircraft_icao: 'XYZ789',
    airline_iata: 'LH',
    airline_icao: 'DLH',
    arr_actual: '2023-05-08 19:15',
    arr_actual_ts: 1683588900,
    arr_actual_utc: '2023-05-08 23:15',
    arr_baggage: 'B456',
    arr_delayed: 50,
    arr_estimated: '2023-05-08 19:15',
    arr_estimated_ts: 1683588900,
    arr_estimated_utc: '2023-05-08 23:15',
    arr_gate: '21',
    arr_iata: 'FRA',
    arr_icao: 'EDDF',
    arr_terminal: '2',
    arr_time: '2023-05-08 17:45',
    arr_time_ts: 1683583500,
    arr_time_utc: '2023-05-08 21:45',
    cs_airline_iata: 'CS',
    cs_flight_iata: 'CS456',
    cs_flight_number: '456',
    delayed: 50,
    dep_actual: '2023-05-08 18:20',
    dep_actual_ts: '',
    dep_actual_utc: '2023-05-08 19:16',
    dep_delayed: 145,
    dep_estimated: '2023-05-08 15:16',
    dep_estimated_ts: 1683573360,
    dep_estimated_utc: '2023-05-08 19:16',
    dep_gate: '24',
    dep_iata: 'PWM',
    dep_icao: 'KPWM',
    dep_terminal: 'T1',
    dep_time: '2023-05-08 12:51',
    dep_time_ts: 1683564660,
    dep_time_utc: '2023-05-08 16:51',
    duration: 99,
    flight_iata: 'PT5969',
    flight_icao: 'PDT5969',
    flight_number: '11345',
    status: 'landed',
  },
];

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
