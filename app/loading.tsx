import Image from 'next/image';
import loader from '@/assets/loader.gif';

const LoadingPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Image
        src={loader}
        alt="Loading..."
        height={150}
        width={150}
        style={{
          width: 'auto',
          height: 'auto',
        }}
        unoptimized
        priority
      />
    </div>
  );
};

export default LoadingPage;
