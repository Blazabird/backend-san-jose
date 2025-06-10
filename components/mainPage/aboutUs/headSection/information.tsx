"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchImageUrl } from "../../../../api/mainPage/aboutUs/information";
import { CircularProgress } from "@mui/material";

const FALLBACK_IMAGE = "/fallbackinfo.jpg"; 

const ImageWithTitle: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await fetchImageUrl();
        if (url) {
          setImageUrl(url);
        } else {
          setImageUrl(FALLBACK_IMAGE);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
        setImageUrl(FALLBACK_IMAGE);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  if (loading) return  <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(255,255,255,0.8)",
    zIndex: 9999,
  }}
>
  <CircularProgress color="success" />
</div>

  return (
    <section className="relative w-full">
      {/* Image container */}
      <div className="relative w-full h-[60vh]">
        {/* The image */}
        <Image
          src={imageUrl!}
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
