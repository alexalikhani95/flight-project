import { screen } from '@testing-library/react';
import { render } from './utils/CustomRender';
import AirportCard from '@/app/airports/AirportCard';
import { fakeAirport } from '@/mocks/mockData';

test('AirportCard renders displaying the correct text', () => {
  render(<AirportCard airport={fakeAirport} />);
  expect(
    screen.getByText('Chicago OHare International Airport')
  ).toBeInTheDocument();
  expect(screen.getByText('Country code: US')).toBeInTheDocument();
  expect(screen.getByText('IATA Code: ORD')).toBeInTheDocument();
  expect(screen.getByText('ICAO Code: KORD')).toBeInTheDocument();
  expect(screen.getByText('Latitude: 41.978367')).toBeInTheDocument();
  expect(screen.getByText('Longitude: -87.904712')).toBeInTheDocument();

  expect(screen.getByText('Longitude: -87.904712')).toBeInTheDocument();
  expect(screen.getByText('View airport location on map')).toBeInTheDocument();
  expect(screen.getByText('View airport flight schedule')).toBeInTheDocument();
});

test('The View airport location on map and View airport flight schedule buttons should not render when the iata_code, lat and lng are null', () => {
  const mockAirport = {
    country_code: 'US',
    iata_code: null,
    icao_code: 'KORD',
    lat: null,
    lng: null,
    name: 'Chicago OHare International Airport',
  };
  render(<AirportCard airport={mockAirport} />);

  expect(
    screen.queryByText('View airport location on map')
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText('View airport flight schedule')
  ).not.toBeInTheDocument();
});
