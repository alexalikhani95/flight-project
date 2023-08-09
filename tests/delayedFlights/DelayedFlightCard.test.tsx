import { screen } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import { fakeDelayedFlights } from '@/mocks/mockData';
import DelayedFlightCard from '@/app/delayedFlights/DelayedflightCard';

test('DelayedFlightCard renders with the correct text', () => {
  render(<DelayedFlightCard flight={fakeDelayedFlights.data[0]} />);
  expect(screen.getByText('Flight number: 9754')).toBeInTheDocument();
  expect(screen.getByText('Status: active')).toBeInTheDocument();
  expect(
    screen.getByText('Departure Airport ICAO code: OEJN')
  ).toBeInTheDocument();
  expect(
    screen.getByText('Arrival Airport ICAO code: LIMC')
  ).toBeInTheDocument();
  expect(
    screen.getByText('Estimated local departure date/time : 2023-05-11 19:50')
  ).toBeInTheDocument();
  expect(
    screen.getByText('Estimated flight duration: 350 minutes')
  ).toBeInTheDocument();

  expect(
    screen.getByText('View Departure airport details')
  ).toBeInTheDocument();
  expect(
    screen.getByText('View Departure airport flight schedule')
  ).toBeInTheDocument();
  expect(screen.getByText('View Arrival airport details')).toBeInTheDocument();
  expect(
    screen.getByText('View Arrival airport flight schedule')
  ).toBeInTheDocument();
});

test('The View Arrival/Departure airport details/schedule buttons should not render when the arr_iata and dep_iata values are null', () => {
  const mockFlight = {
    aircraft_icao: 'A21N',
    airline_iata: 'W6',
    airline_icao: 'WZZ',
    arr_baggage: null,
    arr_delayed: 71,
    arr_estimated: '2023-05-12 01:51',
    arr_estimated_ts: 1683849060,
    arr_estimated_utc: '2023-05-11 23:51',
    arr_gate: null,
    arr_iata: null,
    arr_icao: 'LIMC',
    arr_terminal: '1',
    arr_time: '2023-05-12 00:40',
    arr_time_ts: 1683844800,
    arr_time_utc: '2023-05-11 22:40',
    cs_airline_iata: null,
    cs_flight_iata: null,
    cs_flight_number: '7134',
    delayed: 71,
    dep_actual: '2023-05-11 21:07',
    dep_actual_ts: 1683828420,
    dep_actual_utc: '2023-05-11 18:07',
    dep_delayed: 77,
    dep_estimated: '2023-05-11 21:07',
    dep_estimated_ts: 1683828420,
    dep_estimated_utc: '2023-05-11 18:07',
    dep_gate: null,
    dep_iata: null,
    dep_icao: 'OEJN',
    dep_terminal: null,
    dep_time: '2023-05-11 19:50',
    dep_time_ts: 1683823800,
    dep_time_utc: '2023-05-11 16:50',
    duration: 350,
    flight_iata: 'W65692',
    flight_icao: 'WZZ5692',
    flight_number: '9754',
    status: 'active',
  };

  render(<DelayedFlightCard flight={mockFlight} />);

  expect(
    screen.queryByText('View Departure airport details')
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText('View Departure airport flight schedule')
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText('View Arrival airport details')
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText('View Arrival airport flight schedule')
  ).not.toBeInTheDocument();
});
