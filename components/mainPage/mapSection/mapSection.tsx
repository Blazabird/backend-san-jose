'use client';

import { motion } from 'framer-motion';

export default function MapEmbed() {
  return (
    <div className="relative flex items-center justify-center px-4 pb-5 bg-white">
      <motion.div
        className="relative z-10 w-full max-w-7xl h-[700px] rounded-2xl overflow-hidden shadow-lg border border-neutral-700 bg-neutral-900/40 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Small corner label */}
        <div className="absolute top-3 left-3 z-10 text-xs text-white/80 bg-black/30 px-2 py-0.5 rounded-md">
          Colegio Salesiano San José
        </div>

        {/* Gentle top gradient for polish */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none" />

        <iframe
          className="w-full h-full"
          src="https://maps.google.com/maps?q=COLEGIO%20SALESIANO%20SAN%20JOSÉ&t=&z=13&ie=UTF8&iwloc=&output=embed"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </div>
  );
}
