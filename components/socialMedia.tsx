import React from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaThreads,
} from "react-icons/fa6";

export default function StayConnected() {
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text and Icons */}
        <div>
          <h2 className="text-green-600 text-3xl font-bold mb-4 uppercase tracking-wide">
            Mantente Conectado!
          </h2>
          <p className="text-black text-lg mb-8 max-w-md">
            En nuestra seccion de noticias y redes sociales encontraras lo mas nuevo del Colegio. Mantente al conectando con la institucion!
          </p>

          <div>
            <p className="font-semibold mb-3 text-yellow-600 uppercase text-base font-poppins">Encuentranos en:</p>
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
          <img src="/images/group1.jpg" alt="Group 1" className="w-full h-48 object-cover rounded" />
          <img src="/images/ropes.jpg" alt="Ropes course" className="w-full h-48 object-cover rounded" />
          <img src="/images/kids.jpg" alt="Students" className="w-full h-48 object-cover rounded" />
          <img src="/images/volunteer.jpg" alt="Volunteers" className="w-full h-48 object-cover rounded" />
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
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
