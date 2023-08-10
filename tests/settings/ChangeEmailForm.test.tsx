import { screen } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import ChangeEmailForm from '@/app/settings/ChangeEmailForm';

test('component renders the correct text and buttons when a user is logged in', () => {
  render(<ChangeEmailForm />);
  expect(screen.getByText('New Email')).toBeInTheDocument();
  expect(screen.getByText('Submit')).toBeInTheDocument();
});
