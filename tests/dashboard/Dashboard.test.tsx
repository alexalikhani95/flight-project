import { screen } from '@testing-library/react';
import { render } from '../utils/CustomRender';
import Dashboard from '@/app/dashboard/page';
import { mockUser } from '../mocks/mocks';

test('component renders with the correct username and text', () => {
  render(<Dashboard />, { user: mockUser, userData: {email: 'test@gmail.com', age: '25', location: 'London'} })
  expect(
    screen.getByText(`Welcome ${mockUser.displayName}`)
  ).toBeInTheDocument();

  expect(screen.getByText('25')).toBeInTheDocument();
  expect(screen.getByText('London')).toBeInTheDocument();

  expect(screen.getByText('Airports')).toBeInTheDocument();
  expect(screen.getByText('All Flights')).toBeInTheDocument();
  expect(screen.getByText('Delayed Flights')).toBeInTheDocument();           
  expect(screen.getByText('My Visited Airports')).toBeInTheDocument();                                                                                      
                                                                          
  screen.logTestingPlaygroundURL();
});

test('component renders with the correct username and text', () => {
  render(<Dashboard />, { user: mockUser, userData: {email: 'test@gmail.com'} })                                                                                
  expect(screen.getByText('Go to settings to add age')).toBeInTheDocument();
  expect(screen.getByText('Go to settings to add location')).toBeInTheDocument();
  screen.logTestingPlaygroundURL();
});  
