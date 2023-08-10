import { screen, waitFor } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import RouteButton from '@/app/components/RouteButton';

test('Route button renders with correct text passed in as children', async () => {
  render(<RouteButton url={''}>Test Button</RouteButton>);
  expect(screen.getByText('Test Button')).toBeInTheDocument();
});
