"use client"

import React from "react";
import { FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";

const achievements = [
  "Ganadores de la Olimpiada Nacional de Matemática 2024",
  "95% de ingreso universitario en los últimos 3 años",
  "Acreditación completa por el Ministerio de Educación",
  "Participación destacada en ferias científicas regionales",
];

export default function AchievementsSection() {
  return (
    <section className="bg-white pt-10 pb-5 px-6 font-[Poppins]">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Institution Text - takes 2/3 */}
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl font-semibold text-green-800 mb-6">Nuestra Institución</h3>
          <p className="text-gray-800 text-xl leading-relaxed">
            Nuestra institución es acreedora de múltiples premios y reconocimientos a nivel nacional,
            gracias a su compromiso con la excelencia educativa. Promovemos una cultura de esfuerzo,
            innovación y valores que prepara a nuestros estudiantes para destacarse en cualquier entorno.
          </p>
        </motion.div>

        {/* Achievements List - takes 1/3 */}
        <div>
          <h2 className="text-3xl font-bold text-green-700 mb-6">Logros</h2>
          <ul className="space-y-5">
            {achievements.map((achievement, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 bg-green-50 p-3 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FaTrophy className="text-yellow-500 text-lg mt-1 shrink-0" />
                <span className="text-gray-800 text-base">{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
