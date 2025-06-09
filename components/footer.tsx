import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-green-700 text-white py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Contact Info */}
        <div>
          <h1 className="text-2xl font-bold mb-1 font-poppins">Colegio San Jose</h1>
          <h2 className="text-lg font-bold mb-4 font-poppins">La educacion es cosa del corazón</h2>
          <p className="mb-2 font-poppins">📍 123 Education Street, Learning City, Country</p>
          <p className="mb-2 font-poppins">📞 +1 (555) 123-4567</p>
          <p className="mb-4 font-poppins">✉️ contact@educationexample.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 font-poppins">Síguenos en nuestras Redes Sociales</h3>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-900 p-3 rounded-full hover:bg-gray-200 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-900 p-3 rounded-full hover:bg-gray-200 transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-900 p-3 rounded-full hover:bg-gray-200 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-900 p-3 rounded-full hover:bg-gray-200 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
