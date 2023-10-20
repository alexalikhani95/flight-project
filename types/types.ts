export type UserData = {
  email: string;
  uid?: string;
  displayName?: string;
  age?: string;
  location?: string;
  visitedAirports?: string[];
}


export type AirportData = {
  country_code: string | null;
  iata_code: string | null;
  icao_code: string | null;
  lat: number | null;
  lng: number | null;
  name: string | null;
};

export type FlightData = {
  aircraft_icao: string | null;
  aircraft_iata: string | null;
  airline_icao: string | null;
  alt: number | null;
  arr_iata: string | null;
  arr_icao: string | null;
  dep_iata: string | null;
  dep_icao: string | null;
  dir: number | null;
  flag: string | null;
  flight_iata: string | null;
  flight_icao: string | null;
  flight_number: string | null;
  hex: string | null;
  lat: number | null;
  lng: number | null;
  reg_number: string | null;
  speed: number | null;
  squawk: string | null;
  status: string | null;
  updated: number | null;
  v_speed: number | null;
};

export type DelayedFlightsData = {
  aircraft_icao: string | null;
  airline_iata: string | null;
  airline_icao: string | null;
  arr_baggage: string | null;
  arr_delayed: number | null;
  arr_estimated: string | null;
  arr_estimated_ts: number | null;
  arr_estimated_utc: string | null;
  arr_gate: string | null;
  arr_iata: string | null;
  arr_icao: string | null;
  arr_terminal: string | null;
  arr_time: string | null;
  arr_time_ts: number | null;
  arr_time_utc: string | null;
  cs_airline_iata: string | null;
  cs_flight_iata: string | null;
  cs_flight_number: string | null;
  delayed: number | null;
  dep_actual: string | null;
  dep_actual_ts: number | null;
  dep_actual_utc: string | null;
  dep_delayed: number | null;
  dep_estimated: string | null;
  dep_estimated_ts: number | null;
  dep_estimated_utc: string | null;
  dep_gate: string | null;
  dep_iata: string | null;
  dep_icao: string | null;
  dep_terminal: string | null;
  dep_time: string | null;
  dep_time_ts: number | null;
  dep_time_utc: string | null;
  duration: number | null;
  flight_iata: string | null;
  flight_icao: string | null;
  flight_number: string | null;
  status: string | null;
};

export type scheduleData = {
  aircraft_icao: string | null;
  airline_iata: string | null;
  airline_icao: string | null;
  arr_baggage: string | null;
  arr_delayed: number | null;
  arr_gate: string | null;
  arr_iata: string | null;
  arr_icao: string | null;
  arr_terminal: string | null;
  arr_time: string | null;
  arr_time_ts: number | null;
  arr_time_utc: string | null;
  cs_airline_iata: string | null;
  cs_flight_iata: string | null;
  cs_flight_number: string | null;
  delayed: number | null;
  dep_actual: string | null;
  dep_actual_ts: number | null;
  dep_actual_utc: string | null;
  dep_estimated: string | null;
  dep_gate: string | null;
  dep_iata: string | null;
  dep_icao: string | null;
  dep_terminal: string | null;
  dep_time: string | null;
  dep_time_ts: number | null;
  dep_time_utc: string | null;
  duration: number | null;
  flight_iata: string | null;
  flight_icao: string | null;
  flight_number: string | null;
  status: string | null;
};
