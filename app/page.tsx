import { Inter } from 'next/font/google';
import Signup from './components/Signup';
import { UserContextProvider } from './context/UserContext';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <UserContextProvider>
      <div className="flex w-full bg-gray-100 h-screen justify-center">
        <div>
          <Signup />
        </div>
      </div>
    </UserContextProvider>
  );
}
