'use client';
import { useRouter } from 'next/navigation';

type Props = {
  iataCode: string;
  text: string;
};

export const ViewScheduleButton = ({ iataCode, text }: Props) => {
  const router = useRouter();

  return (
    <button
      className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mb-3 w-full"
      onClick={() => router.push(`/flights/${iataCode}`)}
    >
      {text}
    </button>
  );
};
