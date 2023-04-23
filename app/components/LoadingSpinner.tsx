import ClipLoader from 'react-spinners/ClipLoader';

const LoadingSpinner = () => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <ClipLoader
        color="blue"
        loading={true}
        size={150}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default LoadingSpinner;
