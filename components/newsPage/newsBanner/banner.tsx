"use client";

import React, { useEffect, useState } from "react";
import { fetchNewsBanner, NewsBannerItem } from "../../../api/mainPage/newsSection/newsbanner/newsbanner";
import { fetchLargeImageUrl } from "../../../api/imageFetcher/images";

const NewsBanner = () => {
    const [banner, setBanner] = useState<NewsBannerItem | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        async function loadBanner() {
            const bannerData = await fetchNewsBanner();
            if (bannerData) {
                setBanner(bannerData);
                const image = await fetchLargeImageUrl(bannerData.image);
                setImageUrl(image);
            }
        }

        loadBanner();
    }, []);

    if (!banner) return null;

    return (
        <section className="w-full pb-10 bg-white px-4 sm:px-6 md:px-10 lg:px-20">
            {/* Full width image container */}
            {imageUrl && (
                <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-12">
                    <img
                        src={imageUrl}
                        alt={banner.title}
                        className="w-full max-h-[500px] sm:max-h-[600px] md:max-h-[700px] object-cover rounded-b-none shadow-lg"
                    />
                </div>
            )}

            {/* Text content container */}
            <div className="max-w-screen-xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-yellow-500 mb-4">
                    {banner.title}
                </h1>
                <p className="md:text-base text-sm lg:text-md font-poppins max-w-7xl mx-auto text-black whitespace-pre-line">
                    {banner.paragraph}
                </p>
            </div>
        </section>

    );
};

export default NewsBanner;
