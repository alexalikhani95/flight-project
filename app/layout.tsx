'use client';
import { worker } from '@/mocks/browser';
import Header from './components/Header';
import { UserContextProvider } from './context/UserContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  worker.start();
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <UserContextProvider>
          <Header />
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
