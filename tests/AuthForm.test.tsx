import AuthForm from '@/app/components/AuthForm';
import { screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { render } from './utils/CustomRender';

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
