"use client";

import React, { useEffect, useState } from "react";
import {
  fetchAcademicOffer,
  fetchCharacteristics,
  AcademicOffer,
  Characteristic,
} from "../api/offer";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

const OfertaAcademica: React.FC = () => {
  const [academicOffer, setAcademicOffer] = useState<AcademicOffer | null>(null);
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const [offerData, characteristicsData] = await Promise.all([
        fetchAcademicOffer(),
        fetchCharacteristics(),
      ]);

      if (offerData) setAcademicOffer(offerData);
      if (characteristicsData) setCharacteristics(characteristicsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <CircularProgress />
      </div>
    );
  }

  if (!academicOffer) {
    return (
      <div className="text-center py-20 text-red-500">
        No academic offer available.
      </div>
    );
  }

  const leftSide = characteristics.slice(0, 2);
  const rightSide = characteristics.slice(2);

  return (
    <section className="py-16 px-4 text-center">
      {/* Title and description */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold font-poppins text-green-600 uppercase tracking-widest mb-8">
          {academicOffer.title}
        </h2>

        <p className="text-lg text-black font-poppins font-bold mb-24 max-w-7xl mx-auto">
          {academicOffer.description}
        </p>
      </div>

      {/* Grid */}
      <div className="flex flex-col-reverse md:grid md:grid-cols-3 m-10 gap-10 md:gap-20 items-stretch">
        {/* Left side */}
        <div className="flex flex-col mt-24 text-left px-4 mr-5 h-full items-center">
          {leftSide.map((item, index) => (
            <div
              key={item.id}
              className={`w-full max-w-sm relative group ${index === 1 ? "mt-28" : ""}`}
            >
              {/* Taller Yellow Line */}
              <div className="absolute left-0 top-0 bottom-8 w-1 bg-yellow-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />



              {/* Content */}
              <div className="pl-4 transition-transform duration-300 group-hover:-translate-y-8">
                <h3 className="text-2xl font-bold font-poppins text-green-600 mb-2">
                  {item.Title}
                </h3>
                <p className="text-base text-gray-800 font-medium font-poppins">
                  {item.description}
                </p>
              </div>

              {/* Leer Más Button */}
              <div className="flex justify-start pl-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0">
                <a
                  href="/learn-more"
                  className="text-yellow-600 font-semibold text-lg hover:text-yellow-700 transition-colors duration-300"
                >
                  Leer más
                </a>
              </div>

              {/* Divider */}
              <div className="w-full border-2 border-gray-300 mt-6" />
            </div>
          ))}
        </div>

        {/* Middle image */}
        <div className="flex justify-center items-center px-1 my-10 md:my-0">
          <div className="relative w-[28rem] h-[28rem] md:w-[36rem] md:h-[36rem]">
            {academicOffer.Image ? (
              <Image
                src={`http://localhost:1500${academicOffer.Image.url}`}
                alt="Academic offer"
                fill
                className="object-cover rounded-full border-8 border-yellow-500 shadow-lg "
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200" />
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col mt-24 text-left px-4 ml-5 h-full items-center">
          {rightSide.map((item, index) => (
            <div
              key={item.id}
              className={`w-full max-w-sm relative group ${index === 1 ? "mt-28" : ""}`}
            >
              {/* Taller Yellow Line */}
              <div className="absolute left-0 top-0 bottom-8 w-1 bg-yellow-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />



              {/* Content */}
              <div className="pl-4 transition-transform duration-300 group-hover:-translate-y-8">
                <h3 className="text-2xl font-bold font-poppins text-green-600 mb-2">
                  {item.Title}
                </h3>
                <p className="text-base text-gray-800 font-medium font-poppins">
                  {item.description}
                </p>
              </div>

              {/* Leer Más Button */}
              <div className="flex justify-start pl-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0">
                <a
                  href="/learn-more"
                  className="text-yellow-600 font-semibold text-lg hover:text-yellow-700 transition-colors duration-300"
                >
                  Leer más
                </a>
              </div>

              {/* Divider */}
              <div className="w-full border-2 border-gray-300 mt-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfertaAcademica;
