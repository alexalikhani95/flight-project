import { Inter } from 'next/font/google';
import RegsisterForm from './components/RegisterForm';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <RegsisterForm />
    </div>
  );
}
