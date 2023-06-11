'use client';
import Header from './components/Header';
import { UserContextProvider } from './context/UserContext';
import './globals.css';
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '@/mocks/server';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  server.listen();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="../images/plane.png" />
      </head>
      <body className="bg-gray-100">
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <Header />
            <div className={pathname !== '/' ? 'pt-10' : ''}>{children}</div>
          </UserContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
