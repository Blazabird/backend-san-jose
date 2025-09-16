"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import dotenv from "dotenv";
import {
  fetchAcademicOffer,
  fetchCharacteristics,
  AcademicOffer,
  Characteristic,
} from "../../../api/mainPage/welcomeSection/offer";
import Image from "next/image";
import { CircularProgress, Modal, Box } from "@mui/material";
import { useMediaQuery } from "react-responsive";

const FALLBACK_IMAGE = "/fallback.jpg";
let apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

dotenv.config();

const OfertaAcademica: React.FC = () => {
  const [academicOffer, setAcademicOffer] = useState<AcademicOffer | null>(null);
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalContent, setModalContent] = useState<Characteristic | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1023 });

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
        setAcademicOffer({
          id: -1,
          title: "Oferta Académica No Disponible",
          description:
            "Actualmente no se puede mostrar la oferta académica. Por favor, inténtalo más tarde.",
          Image: {
            url: "/images/fallback-offer.jpg",
          },
        });
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

  const handleClick = (item: Characteristic) => {
    if (isMobile) {
      setModalContent(item);
      setModalOpen(true);
    }
  };

  const renderCharacteristic = (item: Characteristic, index: number) => (
    <motion.div
      key={item.id}
      className={`w-full max-w-sm relative group ${index === 1 ? "mt-28" : ""}`}
      whileHover={!isMobile ? { scale: 1.2 } : {}}
      onClick={() => handleClick(item)}
    >
      {!isMobile && (
        <div className="absolute left-0 top-0 bottom-8 w-1 bg-yellow-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      )}

      <div className={`pl-4 transition-transform duration-300 ${!isMobile ? "group-hover:-translate-y-8" : ""}`}>
        <h3 className="text-2xl font-bold font-poppins text-green-600 mb-2 md:text-3xl lg:text-xl">
          {item.Title}
        </h3>
        <p className="text-base text-gray-800 font-medium font-poppins">
          {item.description}
        </p>
      </div>

      {!isMobile && (
        <div className="flex justify-start pl-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative mt-8 overflow-hidden px-4 py-1 bg-transparent text-white font-medium text-sm md:text-base rounded-lg shadow-md group"
          >
            <span className="absolute inset-0 bg-yellow-500 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            <span className="relative z-10 text-sm font-bold font-poppins text-black">Leer Más</span>
          </motion.button>
        </div>
      )}

      <div className="w-full border-2 border-gray-300 mt-6" />
    </motion.div>
  );

  // Helper to get full image URL
  const getImageUrl = (url: string) => {
    if (!url) return FALLBACK_IMAGE;
    return url.startsWith("http") ? url : `${apiDomain}${url}`;
  };

  return (
    <section className="py-16 px-4 text-center">
      <motion.div
        whileInView={{ opacity: 1, y: "0vw" }}
        initial={{ opacity: 0, y: "15vw" }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-bold font-poppins text-green-600 uppercase tracking-widest mb-8">
          {academicOffer.title}
        </h2>
        <p className="text-lg text-black font-poppins font-bold mb-24 max-w-7xl mx-auto">
          {academicOffer.description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-10 gap-10 md:gap-20 auto-rows-fr">
        <motion.div
          whileInView={{ opacity: 1, y: "0vw" }}
          initial={{ opacity: 0, y: "7vw" }}
          transition={{ duration: 0.5 }}
          className="order-1 lg:order-2 col-span-1 sm:col-span-2 lg:col-span-1 flex justify-center items-center px-1 my-10 md:my-0"
        >
          <div className="relative xl:-ml-20 aspect-square w-[30rem] md:w-[40rem] lg:w-[30rem] xl:w-[36rem]">
            <Image
              key={getImageUrl(academicOffer.Image?.url || FALLBACK_IMAGE)} // Cache bust on update
              src={getImageUrl(academicOffer.Image?.url || FALLBACK_IMAGE)}
              alt="Academic offer"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full border-8 border-yellow-500 shadow-lg"
            />
          </div>
        </motion.div>

        <motion.div
          className="order-2 lg:order-1 col-span-1 flex flex-col text-left px-4 h-full"
          whileInView={{ opacity: 1, x: "0vw" }}
          initial={{ opacity: 0, x: "-15vw" }}
          transition={{ duration: 0.5 }}
        >
          {leftSide.map(renderCharacteristic)}
        </motion.div>

        <motion.div
          className="order-3 lg:order-3 col-span-1 flex flex-col text-left px-4 h-full"
          whileInView={{ opacity: 1, x: "0vw" }}
          initial={{ opacity: 0, x: "10vw" }}
          transition={{ duration: 0.5 }}
        >
          {rightSide.map(renderCharacteristic)}
        </motion.div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
          {modalContent && (
            <>
              <h2 className="text-2xl font-bold text-green-700 mb-4 font-poppins">
                {modalContent.Title}
              </h2>
              <p className="text-gray-800 font-poppins">
                {modalContent.description}
              </p>
            </>
          )}
        </Box>
      </Modal>
    </section>
  );
};

export default OfertaAcademica;
