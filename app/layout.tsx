'use client';
import { worker } from '@/mocks/browser';
import Header from './components/Header';
import { UserContextProvider } from './context/UserContext';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  worker.start();
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
