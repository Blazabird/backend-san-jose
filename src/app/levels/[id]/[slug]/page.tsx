import { notFound } from "next/navigation";
import Image from "next/image";
import InfoSectionClient from "../../../../../components/levelsPage/pricingSection/pricing";
import LevelSelector from "../../../../../components/levelsPage/levelselector/selector";
import PillarsSlider from "../../../../../components/levelsPage/PillarSlider/slider";
import FaqSectionClient from "../../../../../components/levelsPage/faqSection/faq";
import { fetchLevelById } from "../../../../../api/levelsPage/dataFetcher/dataFetcher";
import { fetchLargeImageUrl } from "../../../../../api/imageFetcher/images";
import StayConnected from "../../../../../components/mainPage/socialMediaSection/socialMedia";
import HowToApply from "../../../../../components/levelsPage/application/application";

type Pillar = {
  id: number;
  Name: string;
  description: string;
  image?: string;
  logro?: string | null;
};

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

export default async function LevelPage({ params }: { params: { id: string; slug: string } }) {
  const { id } = params;

  const level = await fetchLevelById(id);

  if (!level) return notFound();

  let bannerUrl = "/fallback.jpg";
  if (level.levelimage?.image) {
    try {
      bannerUrl = await fetchLargeImageUrl(level.levelimage.image);
    } catch {
      // fallback stays default
    }
  }

  const pillars: Pillar[] = await Promise.all(
    (level.pillars || []).map(async (pillar: any) => {
      let imageUrl = "/default-image.jpg";
      if (pillar.image) {
        try {
          imageUrl = await fetchLargeImageUrl(pillar.image);
        } catch {
          imageUrl = "/default-image.jpg";
        }
      }
      return {
        id: pillar.id,
        Name: pillar.Name,
        description: pillar.description,
        logro: pillar.logro ?? null,
        image: imageUrl,
      };
    })
  );

  const faqs: FAQItem[] = (level.questions || []).map((q: any) => ({
    id: q.id,
    question: q.question,
    answer: q.answer,
  }));

  // Check if all main content is missing (ignoring globals like StayConnected)
  const hasContent =
    level.description ||
    (pillars && pillars.length > 0) ||
    (faqs && faqs.length > 0) ||
    level.pricing ||
    level.services;

  if (!hasContent) {
    return (
      <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center text-center p-10">
        <h1 className="text-4xl font-bold text-yellow-500 mb-4">⚠️ No data available</h1>
        <p className="text-lg text-gray-700">
          The level <span className="font-semibold">{level.title}</span> exists, but there’s no data yet.
        </p>
        <LevelSelector />
        <StayConnected />
      </div>
    );
  }

  return (
    <div className="bg-white w-full">
      {/* Banner */}
      <div className="w-full relative h-[600px] md:h-[800px] lg:h-[1000px] z-0">
        <Image
          src={bannerUrl}
          alt={`${level.title} banner`}
          fill
          style={{ objectFit: "cover" }}
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      <LevelSelector />

      {/* Title + Description */}
      {(level.title || level.description) && (
        <div className="bg-white px-6 md:px-16 py-10 mx-auto lg:ml-48 max-w-9xl lg:mr-48 ml-10 mr-10">
          {level.title && (
            <h1 className="text-5xl font-poppins font-extrabold text-yellow-500 drop-shadow-sm mb-4 tracking-tight">
              {level.title}
            </h1>
          )}
          {level.subtitle && (
            <p className="text-2xl text-green-700 font-poppins mb-6 italic font-medium">
              {level.subtitle}
            </p>
          )}
          {level.description && (
            <div>
              <p className="text-gray-800 leading-relaxed text-md w-full font-poppins whitespace-normal">
                {level.description}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Pillars */}
      {pillars.length > 0 ? (
        <PillarsSlider pillars={pillars} />
      ) : (
        <div className="flex flex-col items-center justify-center py-24 my-12 bg-yellow-50 rounded-xl shadow-md mx-10 md:mx-16 lg:mx-48 text-center">
          <span className="text-6xl mb-6">⚠️</span>
          <h2 className="text-3xl font-bold text-yellow-600 mb-3">Aún no hay pilares</h2>
          <p className="text-gray-700 max-w-xl">
            Este nivel aún no tiene pilares definidos. Por favor, revisa más tarde o contacta al administrador para más información.
          </p>
        </div>
      )}

      <HowToApply />

      {/* Info Section */}
      {(level.pricing || level.services || level.requisites) ? (
        <InfoSectionClient
          title={level.title}
          subtitle={level.subtitle}
          description={level.description}
          bannerUrl={bannerUrl}
          pricing={level.pricing}
          services={level.services}
          requisites={level.requisites}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-24 my-12 bg-green-50 rounded-xl shadow-md mx-10 md:mx-16 lg:mx-48 text-center">
          <span className="text-6xl mb-6">ℹ️</span>
          <h2 className="text-3xl font-bold text-green-600 mb-3">Información próximamente</h2>
          <p className="text-gray-700 max-w-xl">
            Los detalles, precios y servicios de este nivel aún no están disponibles. ¡Mantente atento a las actualizaciones!
          </p>
        </div>
      )}

      {/* FAQs */}
      {faqs.length > 0 ? (
        <FaqSectionClient faqs={faqs} />
      ) : (
        <div className="flex flex-col items-center justify-center py-24 my-12 bg-yellow-50 rounded-xl shadow-md mx-10 md:mx-16 lg:mx-48 text-center">
          <span className="text-6xl mb-6">❓</span>
          <h2 className="text-3xl font-bold text-yellow-600 mb-3">Aún no hay preguntas frecuentes</h2>
          <p className="text-gray-700 max-w-xl">
            Actualmente no hay preguntas frecuentes para este nivel. Vuelve pronto para más información.
          </p>
        </div>
      )}
      
      <StayConnected />
    </div>
  );
}
