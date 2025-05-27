"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchImageUrl } from "../api/information";

const ImageWithTitle: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await fetchImageUrl();
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  if (!imageUrl) return <div>Loading...</div>;

  return (
    <section className="relative w-full">
      {/* Image container */}
      <div className="relative w-full  h-[60vh]">
        {/* The image */}
        <Image
          src={imageUrl}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>

        {/* Title */}
        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold font-poppins uppercase">
            ¡Conócenos!
          </h1>
        </div>
      </div>
      
    </section>
  );
};

export default ImageWithTitle;
