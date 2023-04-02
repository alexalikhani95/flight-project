import { Inter } from 'next/font/google';
import RegsisterForm from './components/RegisterForm';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="flex w-full bg-gray-100 h-screen justify-center">
      <div>
        <RegsisterForm />
      </div>
    </div>
  );
}
