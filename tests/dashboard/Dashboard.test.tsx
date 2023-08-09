import { screen } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import Dashboard from '@/app/dashboard/page';
import { mockUser } from '../mocks/mocks';

test('component renders with the correct username and text', () => {
  render(<Dashboard />, { user: mockUser });
  expect(screen.getByText('Welcome Mock User')).toBeInTheDocument();
  expect(screen.getByText('Airports')).toBeInTheDocument();
  expect(screen.getByText('All Flights')).toBeInTheDocument();
  expect(screen.getByText('Delayed Flights')).toBeInTheDocument();
});
