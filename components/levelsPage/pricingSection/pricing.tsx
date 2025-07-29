// src/components/levelsPage/pricingSection/InfoSectionClient.tsx
"use client";
import Image from "next/image";
import { useRef } from "react";

type Service = { id: number; Title?: string; Description?: string; name?: string };
type Requisite = { id: number; Requirement?: string; title?: string; description?: string };
type Pricing = { Monthly_payment: number; tuition: number };

interface InfoSectionClientProps {
  title: string;
  subtitle?: string;
  description?: string;
  bannerUrl: string;
  pricing?: Pricing;
  services?: Service[];
  requisites?: Requisite[];
}

export default function InfoSectionClient({
  title,
  subtitle,
  description,
  bannerUrl,
  pricing,
  services = [],
  requisites = [],
}: InfoSectionClientProps) {
  const servicesRef = useRef<HTMLDivElement>(null);
  const reqRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-gray-900 text-white py-12 flex justify-center">
      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg max-w-6xl w-full mx-6 p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Image + Pricing */}
        <div className="space-y-8">
          <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-800 relative">
            <Image
              src={bannerUrl}
              alt={`${title} image`}
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </div>
          {pricing && (
            <div className="bg-yellow-400 rounded-xl p-6 text-gray-900 shadow-md">
              <h3 className="text-xl font-semibold mb-2">Inversión {title} 2026</h3>
              <p className="text-sm italic mb-4">*Costos aprobados para 2026-2027</p>
              <div className="text-5xl font-bold">
                ${pricing.Monthly_payment.toFixed(0)}
                <span className="text-2xl">00</span>
              </div>
              <p className="mt-1">Mensualidad*</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-block w-5 h-5 border-2 border-gray-900 rounded-full flex-shrink-0" />
                <span>${pricing.tuition}.00 Matrícula y primera cuota**</span>
              </div>
              <button className="mt-6 w-full bg-gray-900 text-yellow-400 py-2 rounded-full font-medium hover:bg-gray-800">
                Iniciar proceso de admisión
              </button>
              <p className="text-xs mt-2">*11 mensualidades | **Incluye la primera mensualidad</p>
            </div>
          )}
        </div>

        {/* Right: Text Content */}
        <div className="space-y-6">
          {subtitle && (
            <h2 className="text-sm text-yellow-400 uppercase tracking-wide">{subtitle}</h2>
          )}
          <h1 className="text-4xl font-bold uppercase">{title}</h1>
          {description && <p className="text-gray-300 leading-relaxed">{description}</p>}

          {/* Services */}
          {services.length > 0 && (
            <div className="mt-6">
              <h3 className="text-2xl font-poppins font-semibold text-yellow-400 mb-3">Servicios</h3>
              <div
                ref={servicesRef}
                className="max-h-48 overflow-y-auto space-y-3 p-2 rounded-md border border-gray-700 scrollbar scrollbar-w-2 scrollbar-track-gray-700/50 scrollbar-thumb-gray-500 scrollbar-thumb-rounded-lg"
              >
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className="flex items-start gap-3 bg-gray-700/50 p-4 rounded-lg border border-gray-600"
                  >
                    <span className="text-yellow-400 mt-1">✔</span>
                    <div>
                      <p className="font-poppins text-sm font-semibold">{srv.Title ?? srv.name}</p>
                      {srv.Description && (
                        <p className="text-gray-400 text-xs mt-1">{srv.Description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requisitos */}
          {requisites.length > 0 && (
            <div className="mt-6">
              <h3 className="text-2xl font-poppins font-semibold text-yellow-400 mb-3">Requisitos</h3>
              <div
                ref={reqRef}
                className="max-h-48 overflow-y-auto space-y-3 p-2 rounded-md border border-gray-700 scrollbar scrollbar-w-2 scrollbar-track-gray-700/50 scrollbar-thumb-gray-500 scrollbar-thumb-rounded-lg"
              >
                {requisites.map((req) => (
                  <div
                    key={req.id}
                    className="bg-yellow-400 text-gray-900 p-4 rounded-lg font-semibold text-sm shadow-sm"
                  >
                    {req.Requirement}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


