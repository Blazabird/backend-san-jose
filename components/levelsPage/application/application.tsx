"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="flex items-center justify-center min-h-[200px] ">
        <div className="bg-red-50 text-red-700 px-6 py-4 rounded-lg shadow-md text-center border border-red-200">
          No hay pasos de aplicación disponibles en este momento.
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto -mt-36 md:mt-8 md:py-12 px-6 mb-16">
      <h2 className="text-4xl font-bold text-center mb-14 text-yellow-500 tracking-wide">
        Proceso de admisión
      </h2>

      {/* ✅ Mobile Card Layout */}
      {isMobile ? (
        <div className="space-y-6 w-full">
          {steps.map((step, index) => (
            <div
              key={index}
              onClick={() =>
                setActiveStep(activeStep === index ? null : index)
              }
              className="bg-white shadow-md rounded-lg p-4 border border-yellow-200 cursor-pointer transition hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-yellow-700 text-lg">
                  {step.title}
                </h3>
              </div>
              <AnimatePresence>
                {activeStep === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-2 text-yellow-800 text-base"
                  >
                    {step.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      ) : (
        // ✅ Desktop Timeline Layout
        <div className="relative flex flex-row items-center justify-between">
          {/* Full background line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-yellow-300 -translate-y-1/2 rounded-full z-0"></div>

          {/* Steps */}
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center cursor-pointer z-10 flex-1"
            >
              {/* Circle */}
              <div
                onClick={() =>
                  setActiveStep(activeStep === index ? null : index)
                }
                className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white font-bold shadow-md transition-transform duration-200 hover:bg-green-700 hover:scale-110"
              >
                {index + 1}
              </div>

              {/* Popup bubble */}
              {activeStep === index && (
                <AnimatePresence>
                  <motion.div
                    ref={bubbleRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-16 bg-zinc-100 border-2 border-yellow-500 rounded-xl shadow-2xl p-4 max-w-xs text-center z-20"
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
      )}
    </section>
  );
};

export default HowToApply;
