import { screen } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import { mockUser } from '../mocks/mocks';
import Header from '@/app/components/Header';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: () => console.log('pushed'),
  }),
}));

test('component renders the correct text and buttons when a user is logged in', () => {
  render(<Header />, { user: mockUser });
  expect(screen.getByText('Flight App')).toBeInTheDocument();
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
  expect(screen.getByText('Settings')).toBeInTheDocument();
  expect(screen.getByText('Logout')).toBeInTheDocument();

  expect(screen.queryByText('Login')).not.toBeInTheDocument();
  expect(screen.queryByText('Signup')).not.toBeInTheDocument();
});

test('component renders the correct text and buttons when a user is not logged in', () => {
  render(<Header />);
  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.getByText('Signup')).toBeInTheDocument();

  expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  expect(screen.queryByText('Logout')).not.toBeInTheDocument();
});
