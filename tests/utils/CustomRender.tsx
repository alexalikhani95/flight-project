import { render } from '@testing-library/react';
import React from 'react';

import { UserContext, UserContextType } from '@/app/context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const Wrapper = ({
  children,
  customContext,
}: {
  children: React.ReactNode;
  customContext?: Partial<UserContextType>;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{
          user: null,
          createUser: () => Promise.resolve(),
          logout: () => Promise.resolve(),
          signIn: () => Promise.resolve(),
          changePassword: () => Promise.resolve(),
          changeEmail: () => Promise.resolve(),
          signInAsGuest: () => Promise.resolve(),
          ...customContext,
        }}
      >
        {children}
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  customContext?: Partial<UserContextType>
) => {
  return {
    ...render(ui, {
      wrapper: () => <Wrapper customContext={customContext}>{ui}</Wrapper>,
    }),
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
