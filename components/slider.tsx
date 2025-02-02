"use client";

import React, { useEffect, useState } from "react";
import { SliderService, ImageData } from "../api/slider";

const ImageSlider: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
 
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const imgs = await SliderService.fetchImages();
      setImages(imgs);
    };

    fetchData();
  }, []);

 
  const totalSlides = images.length - 2; 


  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };


  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full p-4 flex justify-center ">
      <div className="relative w-full max-w-7xl  overflow-hidden bg-gray-100 p-10 rounded-lg">
        {images.length >= 3 ? (
          <>
            
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                
                transform: `translateX(-${(currentIndex * 100) / 3}%)`,
              }}
            >
              {images.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-1/3 p-2">
                  <div className="h-64 w-full overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              ))}
            </div>

           
            <button
              onClick={handlePrev}
              className="absolute top-1/2 transform -translate-y-1/2 left-6 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none"
            >
              &lt;
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 transform -translate-y-1/2 right-6 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none"
            >
              &gt;
            </button>

           
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full focus:outline-none ${
                    idx === currentIndex ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center py-10">Loading images...</p>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
