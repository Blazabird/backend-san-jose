"use client";
import React, { useEffect, useState } from "react";
import dotenv from "dotenv";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaThreads,
} from "react-icons/fa6";
import { fetchSliderImages, SliderImage } from "../../../api/MainPage/socialMediaSection/socialMedia";
import {motion} from "framer-motion"

let apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

export default function StayConnected() {
  const [images, setImages] = useState<SliderImage[]>([]);

  useEffect(() => {
    fetchSliderImages().then(setImages);
  }, []);

  return (
    <div className="bg-gray-100 py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text and Icons */}
        <motion.div whileInView={{ opacity: 1, x:'0vw' }} initial = {{opacity: 0, x:'-15vw'}} transition= {{duration: 0.5}}>
          <h2 className="text-green-600 text-3xl font-bold mb-4 uppercase tracking-wide">
            Mantente Conectado!
          </h2>
          <p className="text-black text-lg mb-8 max-w-md">
            En nuestra seccion de noticias y redes sociales encontraras lo mas
            nuevo del Colegio. Mantente al conectando con la institución!
          </p>

          <div>
            <p className="font-semibold mb-3 text-yellow-600 uppercase text-base font-poppins">
              Encuéntranos en:
            </p>
            <div className="grid grid-cols-3 gap-4 w-48">

              <motion.button whileHover={{ scale: 1.2 }}  whileTap={{ scale: 0.95 }}>
              <SocialIcon href="https://www.facebook.com/CSSJSA/" icon={<FaFacebookF />} label="Facebook" />
              </motion.button>

              <motion.button whileHover={{ scale: 1.2 }}  whileTap={{ scale: 0.95 }}>
              <SocialIcon href="https://x.com" icon={<FaXTwitter />} label="X" />
                </motion.button>

                <motion.button whileHover={{ scale: 1.2 }}  whileTap={{ scale: 0.95 }}>
                <SocialIcon href="https://linkedin.com" icon={<FaLinkedinIn />} label="LinkedIn" />
                </motion.button>

                <motion.button whileHover={{ scale: 1.2 }}  whileTap={{ scale: 0.95 }}>
                <SocialIcon href="https://youtube.com" icon={<FaYoutube />} label="YouTube" />
                </motion.button>

                <motion.button whileHover={{ scale: 1.2 }}  whileTap={{ scale: 0.95 }}>
                <SocialIcon href="https://www.instagram.com/cssj_sv/?hl=es" icon={<FaInstagram />} label="Instagram" />
                </motion.button>

                <motion.button whileHover={{ scale: 1.2 }}  whileTap={{ scale: 0.95 }}>
                <SocialIcon href="https://threads.net" icon={<FaThreads />} label="Threads" />
                </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          {images.map((item) => {
            const imageUrl = item.url.startsWith("/")
              ? `${apiDomain}${item.url}`
              : item.url;

            return (
              <img
                key={item.id}
                src={imageUrl}
                alt={item.alternativeText || "Slider Image"}
               className="w-full h-48 object-cover rounded shadow-2xl transition-transform duration-300 hover:scale-105"

              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="bg-white shadow-sm rounded flex items-center justify-center w-12 h-12 text-gray-700 hover:bg-gray-200 transition"
    >
      {icon}
    </a>
  );
}
