"use client";

import React, { useEffect, useState } from "react";
import { fetchAcademicsBanner, AcademicsBannerItem } from "../../../api/academicsPage/academicsBanner/banner";
import { fetchLargeImageUrl } from "../../../api/imageFetcher/images";

const AcademicsBanner = () => {
  const [banner, setBanner] = useState<AcademicsBannerItem | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    async function loadBanner() {
      const bannerData = await fetchAcademicsBanner();
      if (bannerData) {
        setBanner(bannerData);

        try {
          const fullImageUrl = await fetchLargeImageUrl(bannerData.image);
          setImageUrl(fullImageUrl);
        } catch (err) {
          console.error("Image URL fetch failed", err);
        }
      }
    }

    loadBanner();
  }, []);

  if (!banner) return null;

  return (
    <section className="w-full pb-10 bg-white px-4 sm:px-6 md:px-10 lg:px-20">
      {/* Full width image banner */}
      {imageUrl && (
        <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-12">
          <img
            src={imageUrl}
            alt={banner.title}
            className="w-full max-h-[500px] sm:max-h-[600px] md:max-h-[700px] object-cover shadow-lg"
          />
        </div>
      )}

      {/* Text block */}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-yellow-500 mb-4">
          {banner.title}
        </h1>
        <p className="text-md lg:text-md font-poppins text-black whitespace-pre-line">
          {banner.paragraph}
        </p>
      </div>
    </section>
  );
};

export default AcademicsBanner;
