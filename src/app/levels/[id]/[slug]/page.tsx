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

  let bannerUrl = "/default-banner.jpg";
  if (level.levelimage?.image) {
    try {
      bannerUrl = await fetchLargeImageUrl(level.levelimage.image);
    } catch {
      // fallback remains
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

  return (
    <div className="bg-white w-full">
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

      <div className="bg-white px-6 md:px-16 py-10 mx-auto lg:ml-48 max-w-9xl lg:mr-48 ml-10 mr-10">
        <h1 className="text-5xl font-poppins font-extrabold text-yellow-500 drop-shadow-sm mb-4 tracking-tight">
          {level.title}
        </h1>
        <p className="text-2xl text-green-700 font-poppins mb-6 italic font-medium">
          {level.subtitle || "Rising to the Challenge"}
        </p>
        <div>
          <p className="text-gray-800 leading-relaxed text-md w-full font-poppins whitespace-normal">
            {level.description || "This is a default description. Replace it with real data from the API."}
          </p>
        </div>
      </div>

      <PillarsSlider pillars={pillars} />

      

      <InfoSectionClient
        title={level.title}
        subtitle={level.subtitle}
        description={level.description}
        bannerUrl={bannerUrl}
        pricing={level.pricing}
        services={level.services}
        requisites={level.requisites}
      />

      <HowToApply/>

      {faqs.length > 0 && <FaqSectionClient faqs={faqs} />}

      <StayConnected />
    </div>
  );
}
