"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface Pillar {
    id: number;
    Name: string;
    description: string;
    image?: string;
    pillarDescription?: string;
    logro?: string | null;
}

export default function PillarsSlider({ pillars }: { pillars: Pillar[] }) {
    const [index, setIndex] = useState(0);
    const [modalContent, setModalContent] = useState<Pillar | null>(null);
    const [dragged, setDragged] = useState(false);

    const showPrevious = () => {
        setIndex((prev) => (prev - 1 + pillars.length) % pillars.length);
    };

    const showNext = () => {
        setIndex((prev) => (prev + 1) % pillars.length);
    };

    return (
        <div className="flex flex-col items-center text-center px-4 mb-24 overflow-x-hidden">
            <h2 className="text-4xl font-bold text-green-700 font-poppins mb-8">
                Nuestros Pilares
            </h2>

            <div className="relative w-full max-w-7xl h-[600px] mx-auto overflow-hidden">
                {/* Navigation buttons */}
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full z-30 pointer-events-none">
                    <button
                        onClick={showPrevious}
                        className="absolute left-4 md:left-10 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full shadow pointer-events-auto"
                        aria-label="Previous Pillar"
                    >
                        ◀
                    </button>
                    <button
                        onClick={showNext}
                        className="absolute right-4 md:right-10 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full shadow pointer-events-auto"
                        aria-label="Next Pillar"
                    >
                        ▶
                    </button>
                </div>

                <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
                    {pillars.map((pillar, i) => {
                        let position = i - index;
                        if (position < -Math.floor(pillars.length / 2)) position += pillars.length;
                        if (position > Math.floor(pillars.length / 2)) position -= pillars.length;

                        let x = 0,
                            scale = 1,
                            opacity = 1,
                            zIndex = 10,
                            filter = "brightness(1)",
                            pointerEvents: "auto" | "none" = "auto";

                        switch (position) {
                            case 0:
                                x = 0;
                                scale = 1;
                                opacity = 1;
                                zIndex = 20;
                                filter = "brightness(1)";
                                pointerEvents = "auto";
                                break;
                            case -1:
                                x = -300;
                                scale = 0.85;
                                opacity = 0.6;
                                zIndex = 10;
                                filter = "brightness(0.6)";
                                pointerEvents = "none";
                                break;
                            case 1:
                                x = 300;
                                scale = 0.85;
                                opacity = 0.6;
                                zIndex = 10;
                                filter = "brightness(0.6)";
                                pointerEvents = "none";
                                break;
                            default:
                                opacity = 0;
                                pointerEvents = "none";
                                zIndex = 0;
                        }

                        const card = (
                            <motion.div
                                key={pillar.id}
                                className="absolute top-1/2 -mt-20 md:mt-6 left-1/2 w-[300px] h-[400px] md:w-[500px] md:h-[550px] lg:w-[800px] lg:h-[600px] rounded-lg p-6 shadow-lg bg-gray-200 overflow-hidden cursor-pointer"
                                initial={false}
                                animate={{ opacity, scale, x, filter, y: "-50%" }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{
                                    zIndex,
                                    pointerEvents,
                                    transformOrigin: "center center",
                                    translateX: "-50%",
                                    translateY: "-0%",
                                }}
                                drag={position === 0 ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragStart={() => setDragged(true)}
                                onDragEnd={(e, info) => {
                                    setTimeout(() => setDragged(false), 100);
                                    if (info.offset.x < -80) showNext();
                                    else if (info.offset.x > 80) showPrevious();
                                }}
                                onClick={() => {
                                    if (!dragged && position === 0) {
                                        setModalContent(pillar);
                                    }
                                }}
                            >
                                <h3 className="text-3xl font-extrabold text-yellow-600 mb-3 border-b-4 border-yellow-400 inline-block pb-1 tracking-wide">
                                    {pillar.Name}
                                </h3>
                                <p className="text-gray-600 mb-6 text-sm italic leading-relaxed line-clamp-2">
                                    {pillar.description}
                                </p>
                                {pillar.image && (
                                    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] rounded-lg overflow-hidden shadow-lg">
                                        <Image
                                            src={pillar.image}
                                            alt={pillar.Name || "Pillar image"}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 900px"
                                            quality={90}
                                            priority={position === 0}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        );

                        return card;
                    })}
                </div>
            </div>

            {/* Modal */}
            {modalContent && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
                    onClick={() => setModalContent(null)}
                >
                    <motion.div
                        className="bg-white p-6 md:p-10 rounded-xl max-w-3xl w-full text-left relative overflow-y-auto max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={() => setModalContent(null)}
                            className="absolute top-4 right-4 text-gray-700 hover:text-yellow-500"
                        >
                            <FaTimes size={24} />
                        </button>
                        <h2 className="text-2xl font-bold text-yellow-600 mb-4">
                            {modalContent.Name}
                        </h2>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-green-700 mb-2">¿Qué es?</h3>
                            <p className="text-gray-600 text-sm italic leading-relaxed">
                                {modalContent.description}
                            </p>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-green-700 mb-2">¿Cómo se logra?</h3>
                            <p className="text-gray-600 text-sm italic leading-relaxed">
                                {modalContent.logro ?? "Información no disponible."}
                            </p>

                        </div>
                        {modalContent.image && (
                            <div className="relative w-full h-[250px] md:h-[300px] lg:h-[400px] rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    src={modalContent.image}
                                    alt={modalContent.Name || "Pillar image"}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 900px"
                                    quality={90}
                                />
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
