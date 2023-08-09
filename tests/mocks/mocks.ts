import { IdTokenResult, User } from 'firebase/auth';

export const mockUser: User = {
  uid: 'mockUserId',
  email: 'mockuser@example.com',
  displayName: 'Mock User',
  emailVerified: true,
  isAnonymous: false,
  metadata: {
    creationTime: 'mockCreationTime',
    lastSignInTime: 'mockLastSignInTime',
  },
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getIdToken: function (forceRefresh?: boolean | undefined): Promise<string> {
    throw new Error('Function not implemented.');
  },
  getIdTokenResult: function (
    forceRefresh?: boolean | undefined
  ): Promise<IdTokenResult> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  toJSON: function (): object {
    throw new Error('Function not implemented.');
  },
  phoneNumber: null,
  photoURL: null,
  providerId: '',
};

export const mockGuestUser: User = {
  uid: 'mockUserId',
  email: 'guest@gmail.com',
  displayName: 'Mock User',
  emailVerified: true,
  isAnonymous: false,
  metadata: {
    creationTime: 'mockCreationTime',
    lastSignInTime: 'mockLastSignInTime',
  },
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getIdToken: function (forceRefresh?: boolean | undefined): Promise<string> {
    throw new Error('Function not implemented.');
  },
  getIdTokenResult: function (
    forceRefresh?: boolean | undefined
  ): Promise<IdTokenResult> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  toJSON: function (): object {
    throw new Error('Function not implemented.');
  },
  phoneNumber: null,
  photoURL: null,
  providerId: '',
};
