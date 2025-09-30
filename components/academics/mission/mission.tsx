"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaHandsHelping } from "react-icons/fa";

const philosophy = {
  title: "Nuestra Filosofía",
  text: `Creemos en una educación integral que forma no solo a estudiantes brillantes,
  sino también a ciudadanos responsables, empáticos y conscientes de su entorno.`,
};

const mission = {
  title: "Misión",
  text: `Brindar una educación de excelencia que fomente el pensamiento crítico,
  la creatividad y los valores éticos en nuestros estudiantes.`,
};

const vision = {
  title: "Visión",
  text: `Ser una institución líder en educación, reconocida por su innovación pedagógica
  y su impacto positivo en la sociedad.`,
};

const style = {
  title: "Estilo Educativo",
  text: `Nos guiamos por el Sistema Preventivo de Don Bosco, basado en razón, religión y amor, promoviendo un ambiente de acompañamiento cercano y respeto.`,
};

export default function PhilosophySection() {
  return (
    <section className="bg-green-50 py-20 px-6 font-poppins font-bold">
      <motion.div
        className="max-w-6xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-green-800 drop-shadow">
          Nuestra Filosofía
        </h2>
        <p className="mt-4 text-md md:text-lg text-black max-w-3xl mx-auto">
          {philosophy.text}
        </p>
      </motion.div>

      <div
        className="
          max-w-6xl
          mx-auto
          grid
          grid-cols-[repeat(auto-fit,minmax(320px,1fr))]
          gap-10
          justify-center
        "
      >
        {/* Misión */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center text-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <FaBullseye className="text-green-600 text-5xl" />
          <h3 className="text-2xl font-semibold text-green-700">{mission.title}</h3>
          <p className="text-black text-base leading-relaxed max-w-xl">{mission.text}</p>
        </motion.div>

        {/* Visión */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center text-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaEye className="text-green-600 text-5xl" />
          <h3 className="text-2xl font-semibold text-green-700">{vision.title}</h3>
          <p className="text-black text-base leading-relaxed max-w-xl">{vision.text}</p>
        </motion.div>

        {/* Estilo Educativo */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center text-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <FaHandsHelping className="text-green-600 text-5xl" />
          <h3 className="text-2xl font-semibold text-green-700">{style.title}</h3>
          <p className="text-black text-base leading-relaxed max-w-xl">{style.text}</p>
        </motion.div>
      </div>
    </section>
  );
}
