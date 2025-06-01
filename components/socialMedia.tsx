"use client";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaThreads,
} from "react-icons/fa6";
import { fetchSliderImages, SliderImage } from "../api/socialMedia";

export default function StayConnected() {
  const [images, setImages] = useState<SliderImage[]>([]);

  useEffect(() => {
    fetchSliderImages().then(setImages);
  }, []);

  return (
    <div className="bg-gray-100 py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text and Icons */}
        <div>
          <h2 className="text-green-600 text-3xl font-bold mb-4 uppercase tracking-wide">
            Mantente Conectado!
          </h2>
          <p className="text-black text-lg mb-8 max-w-md">
            En nuestra seccion de noticias y redes sociales encontraras lo mas
            nuevo del Colegio. Mantente al conectando con la institucion!
          </p>

          <div>
            <p className="font-semibold mb-3 text-yellow-600 uppercase text-base font-poppins">
              Encuentranos en:
            </p>
            <div className="grid grid-cols-3 gap-4 w-48">
              <SocialIcon href="https://facebook.com" icon={<FaFacebookF />} label="Facebook" />
              <SocialIcon href="https://x.com" icon={<FaXTwitter />} label="X" />
              <SocialIcon href="https://linkedin.com" icon={<FaLinkedinIn />} label="LinkedIn" />
              <SocialIcon href="https://youtube.com" icon={<FaYoutube />} label="YouTube" />
              <SocialIcon href="https://instagram.com" icon={<FaInstagram />} label="Instagram" />
              <SocialIcon href="https://threads.net" icon={<FaThreads />} label="Threads" />
            </div>
          </div>
        </div>

        {/* Right Side - Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          {images.map((item) => {
            const imageUrl = item.url.startsWith("/")
              ? `http://localhost:1500${item.url}`
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
