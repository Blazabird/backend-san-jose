"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react"
import dotenv from "dotenv";
import {
  fetchAcademicOffer,
  fetchCharacteristics,
  AcademicOffer,
  Characteristic,
} from "../api/offer";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

const FALLBACK_IMAGE = "/fallback.jpg"; 
let apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

const OfertaAcademica: React.FC = () => {
  const [academicOffer, setAcademicOffer] = useState<AcademicOffer | null>(null);
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offerData, characteristicsData] = await Promise.all([
          fetchAcademicOffer(),
          fetchCharacteristics(),
        ]);

        if (offerData) setAcademicOffer(offerData);
        else throw new Error("No academic offer");

        if (characteristicsData) setCharacteristics(characteristicsData);
        else throw new Error("No characteristics");
      } catch (err) {
        // Fallback data
        setAcademicOffer({
          id: -1, // Use a dummy ID for fallback
          title: "Oferta Académica No Disponible",
          description: "Actualmente no se puede mostrar la oferta académica. Por favor, inténtalo más tarde.",
          Image: {
            url: "/images/fallback-offer.jpg", // <-- Make sure this image exists in /public/images
          },
        });


        setCharacteristics([
          {
            id: 1,
            Title: "Educación de Calidad",
            description: "Nuestros programas garantizan una formación integral.",
          },
          {
            id: 2,
            Title: "Profesores Expertos",
            description: "Contamos con un equipo docente altamente calificado.",
          },
          {
            id: 3,
            Title: "Instalaciones Modernas",
            description: "Ambientes diseñados para potenciar el aprendizaje.",
          },
          {
            id: 4,
            Title: "Enfoque Humanista",
            description: "Fomentamos el desarrollo ético y social.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
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
          backgroundColor: "rgba(255,255,255,0.8)",
          zIndex: 9999,
        }}
      >
        <CircularProgress color="success" />
      </div>
    );
  }

  if (!academicOffer) {
    return (
      <div className="text-center py-20 text-red-500">
        Oferta Académica no disponible.
      </div>
    );
  }

  const leftSide = characteristics.slice(0, 2);
  const rightSide = characteristics.slice(2);

  return (
    <section className="py-16 px-4 text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold font-poppins text-green-600 uppercase tracking-widest mb-8">
          {academicOffer.title}
        </h2>
        <p className="text-lg text-black font-poppins font-bold mb-24 max-w-7xl mx-auto">
          {academicOffer.description}
        </p>
      </div>

      <div className="flex flex-col-reverse md:grid md:grid-cols-3 m-10 gap-10 md:gap-20 items-stretch">
        {/* Left side */}
        <div className="flex flex-col mt-24 text-left px-4 mr-5 h-full items-center">
          {leftSide.map((item, index) => (
            <motion.div
              key={item.id}
              className={`w-full max-w-sm relative group ${index === 1 ? "mt-28" : ""}`}
              whileHover={{ scale: 1.2 }}
            >
              <div className="absolute left-0 top-0 bottom-8 w-1 bg-yellow-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />

              <div className="pl-4 transition-transform duration-300 group-hover:-translate-y-8">
                <h3 className="text-2xl font-bold font-poppins text-green-600 mb-2">
                  {item.Title}
                </h3>
                <p className="text-base text-gray-800 font-medium font-poppins">
                  {item.description}
                </p>
              </div>

              <div className="flex justify-start pl-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => console.log('hover started!')}
                className="relative mt-8 overflow-hidden px-4 py-1 bg-transparent text-white font-medium text-sm md:text-base rounded-lg shadow-md group"
              >
                <span className="absolute inset-0 bg-yellow-500 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                <span className="relative z-10 text-sm font-bold font-poppins text-black">Leer Mas</span>
              </motion.button>
              </div>

              <div className="w-full border-2 border-gray-300 mt-6" />
            </motion.div>
          ))}
        </div>

        {/* Middle image */}
        <div className="flex justify-center items-center px-1 my-10 md:my-0">
          <div className="relative w-[28rem] h-[28rem] md:w-[32rem] md:h-[32rem] lg:w-[36rem] lg:h-[36rem]">
            <Image
              src={
                academicOffer.Image
                  ? academicOffer.Image.url.startsWith("http")
                    ? academicOffer.Image.url
                    : "/fallback.jpg"
                  : "/fallback.jpg"
              }
              alt="Academic offer"
              fill
              className="object-cover rounded-full border-8 border-yellow-500 shadow-lg"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col mt-24 text-left px-4 ml-5 h-full items-center">
          {rightSide.map((item, index) => (
            <motion.div
              key={item.id}
              className={`w-full max-w-sm relative group ${index === 1 ? "mt-28" : ""}`}
              whileHover={{ scale: 1.2 }}
            >
              <div className="absolute left-0 top-0 bottom-8 w-1 bg-yellow-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />

              <div className="pl-4 transition-transform duration-300 group-hover:-translate-y-8">
                <h3 className="text-2xl font-bold font-poppins text-green-600 mb-2">
                  {item.Title}
                </h3>
                <p className="text-base text-gray-800 font-medium font-poppins">
                  {item.description}
                </p>
              </div>

              <div className="flex justify-start pl-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => console.log('hover started!')}
                className="relative mt-8 overflow-hidden px-4 py-1 bg-transparent text-white font-medium text-sm md:text-base rounded-lg shadow-md group"
              >
                <span className="absolute inset-0 bg-yellow-500 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                <span className="relative z-10 text-sm font-bold font-poppins text-black">Leer Mas</span>
              </motion.button>
              </div>

              <div className="w-full border-2 border-gray-300 mt-6" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfertaAcademica;
