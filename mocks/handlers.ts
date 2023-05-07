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
    aircraft_icao: 'A20N', // alphanumeric code designating every aircraft type
    aircraft_iata: '32N',
    airline_icao: 'AAL',
    alt: 10050, // altitude in meters
    arr_iata: 'DFW', // IATA code of the arrival airport,
    arr_icao: 'KDFW', // ICAO code of the arrival airport,
    dep_iata: 'ORD', // IATA code of the departure airport,
    dep_icao: 'KORD', // ICAO code of the departure airport,
    dir: 7, //Aircraft head direction for now.
    flag: 'US', // Country flag of the airline
    flight_iata: 'AA123', // IATA code of the flight,
    flight_icao: 'AAL123', // ICAO code of the flight,
    flight_number: '1', // Flight number,
    hex: 'A12345', // ICAO24 Hex address,
    lat: 41.978367, // Latitude of the aircraft,
    lng: -87.904712, // Longitude of the aircraft,
    reg_number: 'NA-12345', // Registration number of the aircraft,
    speed: 250, // Speed in km,
    squawk: '1234', // Aircraft Squawk signal code,
    status: 'en-route', // Flight status,
    updated: 1623931200, // Last update timestamp,
    v_speed: 0, // Vertical speed in km,
  },
  {
    aircraft_icao: 'A20N', // alphanumeric code designating every aircraft type
    aircraft_iata: '32N',
    airline_icao: 'AAL',
    alt: 10050, // altitude in meters
    arr_iata: 'DFW', // IATA code of the arrival airport,
    arr_icao: 'KDFW', // ICAO code of the arrival airport,
    dep_iata: 'ORD', // IATA code of the departure airport,
    dep_icao: 'KORD', // ICAO code of the departure airport,
    dir: 7, //Aircraft head direction for now.
    flag: 'US', // Country flag of the airline
    flight_iata: 'AA123', // IATA code of the flight,
    flight_icao: 'AAL123', // ICAO code of the flight,
    flight_number: '2', // Flight number,
    hex: 'A12345', // ICAO24 Hex address,
    lat: 41.978367, // Latitude of the aircraft,
    lng: -87.904712, // Longitude of the aircraft,
    reg_number: 'NA-12345', // Registration number of the aircraft,
    speed: 250, // Speed in km,
    squawk: '1234', // Aircraft Squawk signal code,
    status: 'en-route', // Flight status,
    updated: 1623931200, // Last update timestamp,
    v_speed: 0, // Vertical speed in km,
  },
  {
    aircraft_icao: 'A20N', // alphanumeric code designating every aircraft type
    aircraft_iata: '32N',
    airline_icao: 'AAL',
    alt: 10050, // altitude in meters
    arr_iata: 'DFW', // IATA code of the arrival airport,
    arr_icao: 'KDFW', // ICAO code of the arrival airport,
    dep_iata: 'ORD', // IATA code of the departure airport,
    dep_icao: 'KORD', // ICAO code of the departure airport,
    dir: 7, //Aircraft head direction for now.
    flag: 'US', // Country flag of the airline
    flight_iata: 'AA123', // IATA code of the flight,
    flight_icao: 'AAL123', // ICAO code of the flight,
    flight_number: '3', // Flight number,
    hex: 'A12345', // ICAO24 Hex address,
    lat: 41.978367, // Latitude of the aircraft,
    lng: -87.904712, // Longitude of the aircraft,
    reg_number: 'NA-12345', // Registration number of the aircraft,
    speed: 250, // Speed in km,
    squawk: '1234', // Aircraft Squawk signal code,
    status: 'en-route', // Flight status,
    updated: 1623931200, // Last update timestamp,
    v_speed: 0, // Vertical speed in km,
  },
  {
    aircraft_icao: 'A20N', // alphanumeric code designating every aircraft type
    aircraft_iata: '32N',
    airline_icao: 'AAL',
    alt: 10050, // altitude in meters
    arr_iata: 'DFW', // IATA code of the arrival airport,
    arr_icao: 'KDFW', // ICAO code of the arrival airport,
    dep_iata: 'ORD', // IATA code of the departure airport,
    dep_icao: 'KORD', // ICAO code of the departure airport,
    dir: 7, //Aircraft head direction for now.
    flag: 'US', // Country flag of the airline
    flight_iata: 'AA123', // IATA code of the flight,
    flight_icao: 'AAL123', // ICAO code of the flight,
    flight_number: '4', // Flight number,
    hex: 'A12345', // ICAO24 Hex address,
    lat: 41.978367, // Latitude of the aircraft,
    lng: -87.904712, // Longitude of the aircraft,
    reg_number: 'NA-12345', // Registration number of the aircraft,
    speed: 250, // Speed in km,
    squawk: '1234', // Aircraft Squawk signal code,
    status: 'en-route', // Flight status,
    updated: 1623931200, // Last update timestamp,
    v_speed: 0, // Vertical speed in km,
  },
  {
    aircraft_icao: 'A20N', // alphanumeric code designating every aircraft type
    aircraft_iata: '32N',
    airline_icao: 'AAL',
    alt: 10050, // altitude in meters
    arr_iata: 'DFW', // IATA code of the arrival airport,
    arr_icao: 'KDFW', // ICAO code of the arrival airport,
    dep_iata: 'ORD', // IATA code of the departure airport,
    dep_icao: 'KORD', // ICAO code of the departure airport,
    dir: 7, //Aircraft head direction for now.
    flag: 'US', // Country flag of the airline
    flight_iata: 'AA123', // IATA code of the flight,
    flight_icao: 'AAL123', // ICAO code of the flight,
    flight_number: '5', // Flight number,
    hex: 'A12345', // ICAO24 Hex address,
    lat: 41.978367, // Latitude of the aircraft,
    lng: -87.904712, // Longitude of the aircraft,
    reg_number: 'NA-12345', // Registration number of the aircraft,
    speed: 250, // Speed in km,
    squawk: '1234', // Aircraft Squawk signal code,
    status: 'en-route', // Flight status,
    updated: 1623931200, // Last update timestamp,
    v_speed: 0, // Vertical speed in km,
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
];

export { handlers };
