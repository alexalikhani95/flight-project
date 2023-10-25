import { screen } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import ChangePasswordForm from '@/app/settings/ChangePasswordForm';

test('component renders the correct text and button', () => {
  render(<ChangePasswordForm />);
  expect(screen.getByText('New Password')).toBeInTheDocument();
  expect(screen.getByText('Submit')).toBeInTheDocument();
});
