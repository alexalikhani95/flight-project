import { Inter } from 'next/font/google';
import AuthForm from './components/AuthForm';
import { UserContextProvider } from './context/UserContext';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <UserContextProvider>
      <div className="flex w-full bg-gray-100 h-screen justify-center">
        <div>
          <AuthForm isLogin={false} />
        </div>
      </div>
    </UserContextProvider>
  );
}
