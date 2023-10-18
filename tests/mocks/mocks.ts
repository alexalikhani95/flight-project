import { User } from 'firebase/auth';

export const mockUser = {
  uid: 'mockUserId',
  email: 'mockuser@example.com',
  displayName: 'Mock User',
} as User;


export const mockGuestUser = {
  uid: 'mockGuestUserId',
  email: null,
  displayName: null,
  isAnonymous: true,
} as User