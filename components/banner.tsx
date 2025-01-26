"use client";
import React, { useEffect, useState } from "react";
import { fetchBannerData } from "../api/banner";
import { fetchLargeImageUrl } from "../api/images"; // Update import to use fetchLargeImageUrl
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";

const Banner: React.FC = () => {
  const [bannerData, setBannerData] = useState<any>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const highlightWord = "corazón";

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const cachedData = localStorage.getItem("bannerData");
        const cachedTimestamp = localStorage.getItem("bannerTimestamp");
        const currentTime = Date.now();

        if (
          cachedData &&
          cachedTimestamp &&
          currentTime - parseInt(cachedTimestamp) < 24 * 60 * 60 * 1000
        ) {
          const parsedData = JSON.parse(cachedData);
          setBannerData(parsedData);

          if (parsedData?.data?.image) {
            const cachedImageUrl = localStorage.getItem("imageUrl");
            if (cachedImageUrl) {
              setImageData(cachedImageUrl);
            } else {
              // Use the large image function here
              const imageUrl = await fetchLargeImageUrl(parsedData.data.image); 
              setImageData(imageUrl);
              localStorage.setItem("imageUrl", imageUrl);
            }
          }
          setLoading(false);
        } else {
          const data = await fetchBannerData();
          setBannerData(data);

          localStorage.setItem("bannerData", JSON.stringify(data));
          localStorage.setItem("bannerTimestamp", currentTime.toString());

          if (data?.data?.image) {
            // Use the large image function here as well
            const imageUrl = await fetchLargeImageUrl(data.data.image); 
            setImageData(imageUrl);
            localStorage.setItem("imageUrl", imageUrl);
          }
          setLoading(false);
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
        setLoading(false);
      }
    };

    getBannerData();
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          zIndex: 9999,
        }}
      >
        <CircularProgress color="success" />
      </div>
    );

  if (error)
    return (
      <div>
        <Alert severity="error">{error}</Alert>
      </div>
    );

  return (
    <div
      className="relative bg-cover bg-center py-[150px] px-6 md:px-20 lg:px-36 text-center md:text-left flex flex-col md:flex-row items-center md:items-start"
      style={{
        backgroundImage: imageData ? `url(${imageData})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        imageRendering: "auto", // Optimize rendering
      }}
    >
      {bannerData && (
        <div className="md:w-1/2 bg-white shadow-gray-900 bg-opacity-85  p-6 rounded-lg shadow-2xl -ml-16">
          <p className="text-green-600 uppercase font-semibold tracking-wide text-sm md:text-base mb-4 mt-24">
            San Jose
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {bannerData?.data?.main?.split(" ").map((word: string, index: number) => (
              <span
                key={index}
                className={
                  word.toLowerCase() === highlightWord.toLowerCase()
                    ? "text-yellow-500 underline decoration-yellow-500 decoration-4"
                    : ""
                }
              >
                {word}{" "}
              </span>
            )) || "Loading..."}
          </h2>
          <p className="text-gray-600 text-sm md:text-lg mt-6 leading-relaxed">
            {bannerData.data.description || "Descripcion"}
          </p>
          <div className="mt-8">
            <button className="relative overflow-hidden px-10 py-2 bg-green-500 text-white font-medium text-sm md:text-base rounded-lg shadow-md group">
              <span className="absolute inset-0 bg-green-600 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              <span className="relative z-10 text-lg font-bold">Ver Más</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
