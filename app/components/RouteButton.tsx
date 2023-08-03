type Props = {
  url: string;
  children: React.ReactNode;
};

const RouteButton = ({ url, children }: Props) => {
  return (
    <a
      className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mb-3 w-full"
      href={url}
    >
      {children}
    </a>
  );
};

export default RouteButton;
