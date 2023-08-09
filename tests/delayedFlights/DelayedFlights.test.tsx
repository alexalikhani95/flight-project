import { screen, waitFor } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import { fakeDelayedFlights } from '@/mocks/mockData';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import DelayedFlights from '@/app/delayedFlights/page';

test('component renders displaying the correct text when there is flights data', async () => {
  const server = setupServer(
    rest.get('/api/delays', (req, res, ctx) => {
      return res(ctx.json(fakeDelayedFlights));
    })
  );

  server.listen();
  render(<DelayedFlights />);

  expect(screen.getByText('Delayed Flights')).toBeInTheDocument();

  expect(screen.getByText('Loading flights...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Flight number: 9754')).toBeInTheDocument();
  });
  server.resetHandlers();

  server.close();
});

test('Component renders correctly with empty data', async () => {
  const server = setupServer(
    rest.get('/api/delays', (req, res, ctx) => {
      return res(ctx.json({ data: [] }));
    })
  );

  server.listen();

  render(<DelayedFlights />);

  expect(screen.getByText('Delayed Flights')).toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.getByText('No delayed flights found, please try again.')
    ).toBeInTheDocument();
  });

  server.resetHandlers();
  server.close();
});
