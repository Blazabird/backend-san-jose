"use client"

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <div className="bg-green-700 text-white py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Contact Info */}
        <div>
          <h1 className="text-2xl font-bold mb-1 font-poppins">Colegio San Jose</h1>
          <h2 className="text-lg font-bold mb-4 font-poppins">La educación es cosa del corazón</h2>
          <p className="mb-2 font-poppins">📍  Calle Salesiano San José sobre final 17 avenida sur, cantón Loma Alta, Santa Ana.</p>
          <p className="mb-2 font-poppins">📞 (+503) 2486 0800</p>
          <p className="mb-4 font-poppins">✉️ recepcion@salesianosanjose.edu.sv</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 font-poppins">Síguenos en nuestras Redes Sociales</h3>
          <div className="flex gap-4">
            <motion.a
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.facebook.com/CSSJSA/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-900 p-3 rounded-full hover:bg-gray-200 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-900 p-3 rounded-full hover:bg-gray-200 transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.instagram.com/cssj_sv/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-900 p-3 rounded-full hover:bg-gray-200 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-900 p-3 rounded-full hover:bg-gray-200 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
