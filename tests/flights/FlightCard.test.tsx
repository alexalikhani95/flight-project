import { screen } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import { fakeFlights } from '@/mocks/mockData';
import FlightCard from '@/app/flights/FlightCard';
import { mockUser } from '../mocks/mocks';

test('FlightCard renders with the correct text and buttons when a user is signed in', () => {
  render(<FlightCard flight={fakeFlights.data[0]} />, {
    user: mockUser,
  });

  expect(screen.getByText('Flight number: 2')).toBeInTheDocument();
  expect(screen.getByText('Status: en-route')).toBeInTheDocument();
  expect(
    screen.getByText('Aircraft Registration Number: NA-12345')
  ).toBeInTheDocument();
  expect(screen.getByText('Latitude: 41.978367')).toBeInTheDocument();
  expect(screen.getByText('Longitude: -87.904712')).toBeInTheDocument();
  expect(screen.getByText('Speed: 250 kmph')).toBeInTheDocument();
  expect(screen.getByText('Elevation: 10050 meters')).toBeInTheDocument();
  expect(
    screen.getByText('Departure Airport IATA code: ORD')
  ).toBeInTheDocument();
  expect(
    screen.getByText('Departure Airport ICAO code: KORD')
  ).toBeInTheDocument();
  expect(
    screen.getByText('Arrival Airport IATA code: DFW')
  ).toBeInTheDocument();
  expect(
    screen.getByText('Arrival Airport ICAO code: KDFW')
  ).toBeInTheDocument();

  expect(screen.getByText('View flight location on map')).toBeInTheDocument();
  expect(
    screen.getByText('View Departure airport details')
  ).toBeInTheDocument();
  expect(screen.getByText('View Arrival airport details')).toBeInTheDocument();
});

test('The buttons are do not display when a user is not signed in ', () => {
  render(<FlightCard flight={fakeFlights.data[0]} />);

  expect(
    screen.queryByText('View flight location on map')
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText('View Departure airport details')
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText('View Arrival airport details')
  ).not.toBeInTheDocument();
});
