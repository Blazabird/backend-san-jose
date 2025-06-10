// src/app/levels/[id]/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchLevels } from "../../../../../api/mainPage/levels/levels";
import { fetchPillarsByLevelId } from "../../../../../api/pillars";

export default async function LevelPage(props: { params: Promise<{ id: string; slug: string }> }) {
  const params = await props.params; // Await params here before accessing
  const levels = await fetchLevels();
  const level = levels.find((lvl) => lvl.id.toString() === params.id);

  if (!level) return notFound();

  const pillars = await fetchPillarsByLevelId(params.id);

  return (
    <div className="bg-white w-full">
      {/* Header Section */}
      <div className="bg-white px-6 md:px-16 py-10">
        <h1 className="text-5xl font-bold text-blue-900 mb-4">{level.title}</h1>
        <p className="text-xl text-gray-700 mb-8">
          {level.subtitle || "Rising to the Challenge"}
        </p>

        <p className="text-gray-700 leading-relaxed mb-12 max-w-4xl">
          {level.description ||
            "This is a default description. Replace it with real data from the API."}
        </p>
      </div>

      {/* Five Pillars Section */}
      <section className="bg-gray-100 px-6 md:px-16 py-12">
        <h2 className="text-4xl font-semibold text-blue-900 mb-2">Our Five Pillars</h2>
        <p className="text-gray-600 mb-8 text-lg max-w-4xl">
          Our mission is to develop leaders of character across five pillars: spiritual, academic,
          physical, social, and artistic.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h3 className="text-3xl font-semibold text-blue-800 mb-2">{pillar.title}</h3>
                <div className="h-1 w-20 bg-yellow-500 mb-4" />
                <p className="text-gray-700 mb-6 text-lg">{pillar.description}</p>
              </div>
              <div className="w-full md:w-1/2">
                <Image
                  src={pillar.image || "/default-image.jpg"}
                  alt={pillar.title || "Pillar image"}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg w-full object-cover"
                />

              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
