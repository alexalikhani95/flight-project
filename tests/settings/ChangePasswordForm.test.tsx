import { screen } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import ChangePasswordForm from '@/app/settings/ChangePasswordForm';

test('component renders the correct text and buttons when a user is logged in', () => {
  render(<ChangePasswordForm />);
  expect(screen.getByText('New Password')).toBeInTheDocument();
  expect(screen.getByText('Submit')).toBeInTheDocument();
});
