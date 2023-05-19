'use client';
import Header from './components/Header';
import { UserContextProvider } from './context/UserContext';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '@/mocks/server';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  server.listen();
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <Header />
            {children}
          </UserContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
