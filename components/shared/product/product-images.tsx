'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt={`Product Image ${current + 1}`}
        width={1000}
        height={1000}
        priority
        className="min-h-[300px] object-cover object-center"
      />
      <div className="flex gap-2">
        {images.map((img, index) => (
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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
