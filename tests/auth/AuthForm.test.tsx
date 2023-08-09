import AuthForm from '@/app/auth/AuthForm';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../utils/CustomRender';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: () => console.log('pushed'),
  }),
}));

test('Renders login form when the login prop is true', () => {
  render(<AuthForm isLogin={true} />);
  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.queryByText('Create Account')).not.toBeInTheDocument();
});

test('Renders Create Account form when the login prop is false', () => {
  render(<AuthForm isLogin={false} />);
  expect(screen.getByText('Create Account')).toBeInTheDocument();
  expect(screen.queryByText('Login')).not.toBeInTheDocument();
});

test('Signin is called when the user inputs email and password and clicks submit', async () => {
  const user = userEvent.setup();
  const mockSignIn = jest.fn();
  render(<AuthForm isLogin={true} />, { signIn: mockSignIn });

  const submitBtn = screen.getByText('Submit');
  expect(submitBtn).toBeInTheDocument();

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');

  await user.type(emailInput, 'test@gmail.com');

  await user.type(passwordInput, 'test123');

  await user.click(submitBtn);
  expect(mockSignIn).toHaveBeenCalledWith('test@gmail.com', 'test123');
});

test('Create User function is called when the user inputs email and password and clicks submit', async () => {
  const user = userEvent.setup();
  const mockCreateUser = jest.fn();
  render(<AuthForm isLogin={false} />, { createUser: mockCreateUser });

  const submitBtn = screen.getByText('Submit');
  expect(submitBtn).toBeInTheDocument();

  const usernameInput = screen.getByLabelText('Username');
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');

  await user.type(usernameInput, 'testusername');

  await user.type(emailInput, 'test@gmail.com');

  await user.type(passwordInput, 'test123');

  await user.click(submitBtn);
  expect(mockCreateUser).toHaveBeenCalledWith(
    'test@gmail.com',
    'test123',
    'testusername'
  );
});
