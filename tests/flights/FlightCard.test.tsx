import { screen } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import { fakeFlights } from '@/mocks/mockData';
import FlightCard from '@/app/flights/FlightCard';
import { IdTokenResult, User } from 'firebase/auth';

const mockUser: User = {
  uid: 'mockUserId',
  email: 'mockuser@example.com',
  displayName: 'Mock User',
  emailVerified: true,
  isAnonymous: false,
  metadata: {
    creationTime: 'mockCreationTime',
    lastSignInTime: 'mockLastSignInTime',
  },
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getIdToken: function (forceRefresh?: boolean | undefined): Promise<string> {
    throw new Error('Function not implemented.');
  },
  getIdTokenResult: function (
    forceRefresh?: boolean | undefined
  ): Promise<IdTokenResult> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  toJSON: function (): object {
    throw new Error('Function not implemented.');
  },
  phoneNumber: null,
  photoURL: null,
  providerId: '',
};

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
  expect(
    screen.getByText('View Departure airport flight schedule')
  ).toBeInTheDocument();
  expect(
    screen.getByText('View Arrival airport flight details')
  ).toBeInTheDocument();
  expect(
    screen.getByText('View Arrival airport flight schedule')
  ).toBeInTheDocument();
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
    screen.queryByText('View Departure airport flight schedule')
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText('View Arrival airport flight details')
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText('View Arrival airport flight schedule')
  ).not.toBeInTheDocument();
});
