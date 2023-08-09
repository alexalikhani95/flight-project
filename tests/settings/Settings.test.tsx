import { screen } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import { mockUser } from '../mocks/mocks';
import Settings from '@/app/settings/page';
import { User } from 'firebase/auth';

test('component renders the correct text and buttons when a user is logged in', () => {
  render(<Settings />, { user: mockUser });
  expect(screen.getByText('Settings')).toBeInTheDocument();
  expect(screen.getByText('Change Password')).toBeInTheDocument();
  expect(screen.getByText('Change Email')).toBeInTheDocument();
});

test('The Change Password/Email forms do not display if the logged in user is a guest user', () => {
  const mockGuestUser = {
    uid: 'mockUserId',
    email: 'guest@gmail.com',
    displayName: 'Mock User',
  } as User;

  render(<Settings />, { user: mockGuestUser });
  expect(screen.getByText('Settings')).toBeInTheDocument();
  expect(screen.queryByText('Change Password')).not.toBeInTheDocument();
  expect(screen.queryByText('Change Email')).not.toBeInTheDocument();
});
