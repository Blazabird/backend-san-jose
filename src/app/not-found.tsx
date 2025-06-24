"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-poppins font-bold text-green-600 mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
      <p className="text-black font-poppins max-w-md mb-6">
        Lo sentimos, la página que estás buscando no existe o fue movida.
      </p>
      <div className="text-7xl mb-6">🚧</div>
      <motion.button
       whileHover={{ scale: 1.1 }}
       whileTap={{ scale: 0.9 }}
       transition={{duration:0.2}}
        onClick={handleGoHome}
        className="bg-green-600 text-white px-6 py-2 font-poppins rounded-xl hover:bg-green-600 transition"
      >
        Volver al inicio
      </motion.button>
    </div>
  );
}
