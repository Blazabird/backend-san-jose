"use client";
import React, { useEffect, useState } from "react";
import { fetchBannerData } from "../api/banner";
import { fetchFileUrl } from "../api/images";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";

const Banner: React.FC = () => {
    const [bannerData, setBannerData] = useState<any>(null);
    const [imageData, setImageData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    //remarcar una palabra del titulo
    const highlightWord = "corazón";


    useEffect(() => {
        const getBannerData = async () => {
            try {

                const data = await fetchBannerData();
                setBannerData(data);


                if (data?.data?.image) {
                    const imageUrl = await fetchFileUrl(data.data.image);
                    setImageData(imageUrl);
                }
            } catch (err) {
                setError("Error al conectar con el servidor");
            } finally {
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
        <div className="bg-gradient-to-r from-white to-yellow-200 py-[225px] px-6 md:px-20 lg:px-36 text-center md:text-left flex flex-col md:flex-row items-center md:items-start">
            {bannerData && (
                <div className="md:w-1/2">

                    <p className="text-blue-600 uppercase font-semibold tracking-wide text-sm md:text-base mb-4">

                    </p>
                    <h2 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4 mt-32 md:ml-24">
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
                    <p className="text-gray-600 text-sm md:text-lg mt-6 leading-relaxed md:ml-28">
                        {bannerData.data.description}
                    </p>
                </div>
            )}

            <div className="relative">

                <img
                    src="/pen.png"
                    alt="Pen"
                    className="absolute top-[90px] left-0 md:left-full md:ml-0 w-[30px] h-[30px] m-4 animate-smooth-up-down hidden md:block md:w-[200px] md:h-[300px]"


                />
                <img
                    src="/arrow.png"
                    alt="Pen"
                    className="absolute -ml-[975px] -top-[110px] animate-breathing"
                />
                {imageData && (
                    <div className="mt-6 md:mt-0 md:ml-64">
                        <img
                            src={imageData}
                            alt="Banner"
                            className="w-[400px] max-w-lg rounded-lg shadow-md "
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Banner;
