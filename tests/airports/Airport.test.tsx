import { screen, waitFor } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import { fakeAirport } from '@/mocks/mockData';
import Airports from '@/app/airports/page';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Airport from '@/app/airports/[slug]/page';

test('The component renders displaying the correct text and airport when there is airports data', async () => {
  const server = setupServer(
    rest.get('/api/airport', (req, res, ctx) => {
      return res(ctx.json(fakeAirport));
    })
  );

  server.listen();
  render(<Airport params={{ slug: 'ORD' }} />);

  await waitFor(() => {
    expect(
      screen.getByText('Chicago OHare International Airport')
    ).toBeInTheDocument();
  });
  expect(screen.getByText('Country code: US')).toBeInTheDocument();
  expect(screen.getByText('IATA Code: ORD')).toBeInTheDocument();
  expect(screen.getByText('ICAO Code: KORD')).toBeInTheDocument();
  expect(screen.getByText('Latitude: 41.978367')).toBeInTheDocument();
  expect(screen.getByText('Longitude: -87.904712')).toBeInTheDocument();
  expect(screen.getByText('View airport location on map')).toBeInTheDocument();
  expect(screen.getByText('View airport flight schedule')).toBeInTheDocument();

  server.resetHandlers();

  server.close();
});
