// src/components/levelsPage/pricingSection/InfoSection.tsx
import { fetchLargeImageUrl } from "../../../api/imageFetcher/images";
import InfoSectionClient from "./pricing";

type Service = {
  id: number;
  Title?: string;
  Description?: string;
  name?: string;
};
type Requisite = {
  id: number;
  Requirement?: string;
  title?: string;
  description?: string;
};
type Pricing = {
  Monthly_payment: number;
  tuition: number;
};

interface InfoSectionProps {
  level: {
    title: string;
    subtitle?: string;
    description?: string;
    levelimage?: { image: string };
    icon?: { formats?: { large?: { url: string } } };
    pricing?: Pricing;
    services?: Service[];
    requisites?: Requisite[];
  };
}

export default async function InfoSection({ level }: InfoSectionProps) {
  let bannerUrl = "/default-banner.jpg";
  if (level.levelimage?.image) {
    try {
      bannerUrl = await fetchLargeImageUrl(level.levelimage.image);
    } catch {}
  } else if (level.icon?.formats?.large?.url) {
    bannerUrl = process.env.NEXT_PUBLIC_API_DOMAIN + level.icon.formats.large.url;
  }

  return (
    <InfoSectionClient
      title={level.title}
      subtitle={level.subtitle}
      description={level.description}
      bannerUrl={bannerUrl}
      pricing={level.pricing}
      services={level.services}
      requisites={level.requisites}
    />
  );
}
