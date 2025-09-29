"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // ✅ lightweight icon for close button

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

type ApplicationStep = {
  title: string;
  description: string;
};

const HowToApply: React.FC = () => {
  const [steps, setSteps] = useState<ApplicationStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await fetch(`${apiDomain}/api/applications`);
        const json = await res.json();

        const mappedSteps = json.data.map((step: any) => ({
          title: step.Title,
          description: step.description,
        }));

        setSteps(mappedSteps);
      } catch (error) {
        console.error("Error fetching application steps:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close bubble if clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        bubbleRef.current &&
        !bubbleRef.current.contains(event.target as Node)
      ) {
        setActiveStep(null);
      }
    };
    if (activeStep !== null && !isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeStep, isMobile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-gray-500 animate-pulse">Cargando pasos...</p>
      </div>
    );
  }

  if (!steps.length) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="bg-red-50 text-red-700 px-6 py-4 rounded-lg shadow-md text-center border border-red-200">
          No hay pasos de aplicación disponibles en este momento.
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-4xl font-bold text-center mb-14 text-yellow-600 tracking-wide">
        Proceso de admisión
      </h2>

      {/* Timeline */}
      <div
        className={`relative flex ${
          isMobile
            ? "flex-col items-center space-y-10"
            : "flex-row items-center justify-between"
        }`}
      >
        {/* Full background line */}
        {!isMobile && (
          <div className="absolute top-1/2 left-0 w-full h-1 bg-yellow-300 -translate-y-1/2 rounded-full z-0"></div>
        )}
        {isMobile && (
          <div className="absolute left-1/2 top-0 h-full w-1 bg-yellow-300 -translate-x-1/2 rounded-full z-0"></div>
        )}

        {/* Steps */}
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center cursor-pointer z-10 ${
              isMobile ? "w-full" : "flex-1"
            }`}
          >
            {/* Circle */}
            <div
              onClick={() =>
                setActiveStep(activeStep === index ? null : index)
              }
              className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white font-bold shadow-md transition-transform duration-200 hover:bg-green-700 hover:scale-110"
            >
              {index + 1}
            </div>

            {/* Desktop popup bubble */}
            {!isMobile && activeStep === index && (
              <AnimatePresence>
                <motion.div
                  ref={bubbleRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute top-16 bg-white border border-yellow-200 rounded-xl shadow-lg p-4 max-w-xs text-center z-20"
                >
                  <h3 className="text-lg font-semibold text-yellow-700 mb-2">
                    {steps[index].title}
                  </h3>
                  <p className="text-yellow-800 text-sm">
                    {steps[index].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        ))}
      </div>

      {/* Mobile modal */}
      {isMobile && activeStep !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setActiveStep(null)}
          />
          {/* Modal content */}
          <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-sm w-full z-10">
            {/* Close X button */}
            <button
              onClick={() => setActiveStep(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
            >
              <X size={22} />
            </button>
            <h3 className="text-xl font-semibold text-yellow-700 mb-2">
              {steps[activeStep].title}
            </h3>
            <p className="text-yellow-800">{steps[activeStep].description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default HowToApply;
