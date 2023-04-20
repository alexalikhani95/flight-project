import { render } from '@testing-library/react';
import React from 'react';

import { UserContext, UserContextType } from '@/app/context/UserContext';

const Wrapper = ({
  children,
  customContext,
}: {
  children: React.ReactNode;
  customContext?: Partial<UserContextType>;
}) => {
  return (
    <UserContext.Provider
      value={{
        user: null,
        createUser: () => Promise.resolve(),
        logout: () => Promise.resolve(),
        signIn: () => Promise.resolve(),
        changePassword: () => Promise.resolve(),
        ...customContext,
      }}
    >
      {children}
    </UserContext.Provider>
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
