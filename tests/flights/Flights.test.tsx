import { screen, waitFor } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import { fakeFlights } from '@/mocks/mockData';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Flights from '@/app/flights/page';

test('component renders displaying the correct text when there is flights data', async () => {
  const server = setupServer(
    rest.get('/api/flights', (req, res, ctx) => {
      return res(ctx.json(fakeFlights));
    })
  );

  server.listen();
  render(<Flights />);

  expect(screen.getByText('Flights')).toBeInTheDocument();

  expect(screen.getByText('Loading flights...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Flight number: 2')).toBeInTheDocument();
  });
  server.resetHandlers();

  server.close();
});
