import { renderHook, screen } from '@testing-library/react';
import { render } from './utils/CustomRender';
import { fakeAirports } from '@/mocks/mockData';
import Airports from '@/app/airports/page';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/airports', (req, res, ctx) => {
    return res(ctx.json(fakeAirports));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('AirportCard renders displaying the correct text', () => {
  render(<Airports />);

  screen.logTestingPlaygroundURL();

  expect(screen.getByText('Airports')).toBeInTheDocument();
});
