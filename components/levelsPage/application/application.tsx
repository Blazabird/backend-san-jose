"use client";

import React, { useEffect, useState } from "react";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

type ApplicationStep = {
  title: string;
  description: string;
};

const HowToApply: React.FC = () => {
  const [steps, setSteps] = useState<ApplicationStep[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-gray-500">Cargando pasos...</p>
      </div>
    );
  }

  if (!steps || steps.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="bg-red-50 text-red-700 px-6 py-3 rounded-lg shadow-md text-center border border-red-100">
          No hay pasos de aplicación disponibles en este momento.
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto py-12 px-6 bg-white">
      <h2 className="text-4xl font-bold text-center mb-16 text-yellow-500 tracking-wide">
        Proceso de admisión
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <div className="absolute -top-5 left-5 w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-lg shadow-md">
              {index + 1}
            </div>
            <div className="ml-16">
              <h3 className="text-xl font-semibold text-yellow-600 mb-2">{step.title}</h3>
              <p className="text-yellow-700 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToApply;
