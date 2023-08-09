import { screen, waitFor } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import { fakeAirports } from '@/mocks/mockData';
import Airports from '@/app/airports/page';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

test('The component renders displaying the correct text and airport when there is airports data', async () => {
  const server = setupServer(
    rest.get('/api/airports', (req, res, ctx) => {
      return res(ctx.json(fakeAirports));
    })
  );

  server.listen();
  render(<Airports />);

  expect(screen.getByText('Airports')).toBeInTheDocument();

  expect(screen.getByText('Loading airports...')).toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.getByText('Chicago OHare International Airport')
    ).toBeInTheDocument();
  });
  server.resetHandlers();

  server.close();
});

// test('AirportCard renders correctly with empty data', async () => {
//   const server = setupServer(
//     rest.get('/api/airports', (req, res, ctx) => {
//       console.log(res(ctx.json({ data: [] })));
//       return res(ctx.json({ data: [] }));
//     })
//   );

//   server.listen();

//   render(<Airports />);

//   expect(screen.getByText('Airports')).toBeInTheDocument();

//   await waitFor(() => {
//     expect(
//       screen.getByText('No airports found, please try again.')
//     ).toBeInTheDocument();
//   });

//   screen.logTestingPlaygroundURL();

//   server.resetHandlers();
//   server.close();
// });
