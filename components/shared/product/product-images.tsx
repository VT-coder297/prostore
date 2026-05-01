'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  // 1. If images is undefined or empty, use a placeholder array
  const safeImages =
    images && images.length > 0 && images[0] !== ''
      ? images
      : ['/images/placeholder.jpg'];

  return (
    <div className="space-y-4">
      <Image
        src={safeImages[current]}
        alt={`Product Image ${current + 1}`}
        width={1000}
        height={1000}
        priority
        className="min-h-[300px] w-full h-auto object-cover object-center"
        style={{ height: 'auto' }}
      />
      <div className="flex gap-2">
        {safeImages.map((img, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              'cursor-pointer rounded-md border-2 hover:border-blue-500',
              current === index ? 'border-blue-500' : 'border-transparent',
            )}
          >
            <Image
              src={img}
              alt={`Product Image ${index + 1}`}
              width={100}
              height={100}
              className="h-auto w-full"
              style={{ height: 'auto' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
