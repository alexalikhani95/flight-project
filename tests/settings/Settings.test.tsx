import { screen } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import { mockUser } from '../mocks/mocks';
import Settings from '@/app/settings/page';
import { User } from 'firebase/auth';
import userEvent from '@testing-library/user-event';

test('component renders the correct text and buttons when a user is logged in', () => {
  render(<Settings />, { user: mockUser });
  expect(screen.getByText('Settings')).toBeInTheDocument();
  expect(screen.getByText('Change Password')).toBeInTheDocument();
  expect(screen.getByText('Change Email')).toBeInTheDocument();
  expect(screen.getByText('Delete Account')).toBeInTheDocument();
});

test('The Change Password/Email forms and delete account do not display if the logged in user is a guest user', async () => {
  const mockGuestUser = {
    uid: 'mockUserId',
    email: 'guest@gmail.com',
    displayName: 'Mock User',
  } as User;

  render(<Settings />, { user: mockGuestUser });
  expect(screen.getByText('Settings')).toBeInTheDocument();
  expect(screen.queryByText('Change Password')).not.toBeInTheDocument();
  expect(screen.queryByText('Change Email')).not.toBeInTheDocument();
  expect(screen.queryByText('Delete Account')).not.toBeInTheDocument();
});

test('When the user clicks Delete Account the correct text shows below the button', async () => {
  const user = userEvent.setup();

  expect(
    screen.queryByText('Are you sure you want to delete your account?')
  ).not.toBeInTheDocument();

  render(<Settings />, { user: mockUser });

  await user.click(screen.getByText('Delete Account'));
  expect(
    screen.getByText('Are you sure you want to delete your account?')
  ).toBeInTheDocument();
});
