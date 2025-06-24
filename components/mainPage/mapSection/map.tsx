// components/Map.tsx
"use client"

import { motion } from "framer-motion";

const MapEmbed = () => (
  <section className="w-full flex flex-col items-center mt-12 mb-8">
    {/* Title */}
    <motion.section
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: '2vw' }}
      transition={{ duration: 0.5 }}
      className="font-poppins mb-8 text-center"
    >
      <h1 className=" text-green-600 text-4xl">Te Estamos Esperando!</h1>
      <h2 className="text-black text-lg">Visita nuestras instalaciones y experimenta el carisma salesiano</h2>
    </motion.section>

    {/* Map */}
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: '2vw' }}
      transition={{ duration: 0.5 }}
      className="w-[80%] py-2 flex justify-center rounded-2xl shadow-2xl"
    >
        
      <iframe
        src="https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sCOLEGIO+SALESIANO+SAN+JOS%C3%89!6i13"
        className="w-[98%] h-[700px] border-0 rounded-2xl"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      
    </motion.div>
  </section>
);

export default MapEmbed;
