"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dummy FAQ data with unique IDs
const faqData = [
    {
        id: 101,
        question: "¿Qué se necesita para entrar?",
        answer:
            "Para entrar, necesitas completar el formulario de inscripción, cumplir con los requisitos básicos y seguir las instrucciones que te enviaremos por correo.",
    },
    {
        id: 102,
        question: "¿Cuál es el horario de atención?",
        answer:
            "Nuestro horario de atención es de lunes a viernes de 8:00 a.m. a 5:00 p.m.",
    },
    {
        id: 103,
        question: "¿Dónde están ubicados?",
        answer: "Estamos ubicados en la ciudad, cerca del parque central.",
    },
    {
        id: 104,
        question: "¿Qué programas ofrecen?",
        answer: "Ofrecemos programas desde primaria hasta bachillerato técnico.",
    },
    {
        id: 105,
        question: "¿Hay actividades extracurriculares?",
        answer: "Sí, ofrecemos deportes, música, arte y más.",
    },
    {
        id: 106,
        question: "¿Cómo puedo agendar una visita?",
        answer:
            "Puedes agendar una visita llamando a nuestra oficina o usando el formulario en línea.",
    },
];

const Questions: React.FC = () => {
    const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

    const toggleAccordion = (id: number) => {
        setOpenItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <section>
            {/* Section Header */}
            <div className="bg-gray-100 px-6 md:px-16 py-12 text-center">
                <h1 className="text-green-600 font-poppins text-4xl">
                    Preguntas Frecuentes
                </h1>
            </div>

            {/* FAQ Container */}
            <div className="flex flex-wrap gap-6 px-6 md:px-20 py-10">
                {faqData.map((item) => {
                    const isOpen = !!openItems[item.id];

                    return (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 1 }}

                            key={item.id}
                            className="w-full md:w-[calc(50%-12px)] p-6 rounded-lg bg-gray-300 hover:bg-gray-400 hover:text-white"
                            onClick={() => toggleAccordion(item.id)}
                        >
                            {/* Question Header */}
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                
                            >
                                <h2 className="font-poppins text-xl">{item.question}</h2>
                                <button className="font-poppins text-lg">
                                    {isOpen ? "-" : "+"}
                                </button>
                            </div>

                            {/* Animated Answer */}
                            <AnimatePresence initial={false} mode="wait">
                                {isOpen && (
                                    <motion.div
                                        key={`content-${item.id}`}
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={{
                                            open: { height: "auto", opacity: 1 },
                                            collapsed: { height: 0, opacity: 0 },
                                        }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden mt-4"
                                    >
                                        <div className="font-poppins text-base px-1 py-2">
                                            <p>{item.answer}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>

                    );
                })}
            </div>
        </section>
    );
};

export default Questions;
