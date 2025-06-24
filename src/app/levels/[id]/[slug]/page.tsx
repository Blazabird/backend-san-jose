// src/app/levels/[id]/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchLevels } from "../../../../../api/MainPage/levels/levels";
import { fetchPillarsByLevelId } from "../../../../../api/LevelsPage/pillars/pillars";
import LevelBanner from "../../../../../components/LevelsPage/banner/banner";
import NotFound from "../../../../../components/NotFound/notFound";
import Questions from "../../../../../components/LevelsPage/questions/questions";
import LevelSelector from "../../../../../components/LevelsPage/levelSelector/levelSelector";

export default async function LevelPage(props: { params: Promise<{ id: string; slug: string }> }) {
  const params = await props.params;
  const levels = await fetchLevels();
  const level = levels.find((lvl) => lvl.id.toString() === params.id);

  
   //if (!level) return (<NotFound/>);

  const pillars = await fetchPillarsByLevelId(params.id);

  return (
    <div className="bg-gray-100 w-full">
      {/* Header Section */}
      <LevelBanner />
      <LevelSelector/>
      <div className="bg-gray-100 px-6 md:px-16 py-10">
        <h1 className="text-5xl font-bold font-poppins text-green-600 mb-4">{level?.title || "Nivel no disponible"}</h1>
        <p className="text-2xl font-poppins text-black mb-8">
          {level?.subtitle || "Acepta el desafío"}
        </p>

        <p className="text-black leading-relaxed font-poppins mb-12 max-w-7xl">
          {level?.description ||
            "Estudiantes en nuestro programa educativo tienen la oportunidad de experimentar la excelencia y liderar mediante conocimientos academicos, altetismo competitivo y diversas actividades extracurriculares. Nuestros graduados son aceptados a las universidades mas prestigiosas del pais. Visitanos y experimenta el caracteristico carisma salesiano. "}
        </p>
      </div>

      {/* Five Pillars Section */}
      <section className="bg-gray-100 px-6 md:px-16 py-12 text-center justify-center">
        <h2 className="text-4xl font-semibold font-poppins text-green-600 mb-2">Nuestros Pilares</h2>
        <p className="text-black font-poppins -600 mb-8 text-lg max-w-4xl ml-48">
          Nuetra misión es desarrollar a los lideres del futuro con 5 pilares fundamentales espiritual, academico, fisico,
          social y artistico.
        </p>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="flex flex-col items-center text-center md:items-start md:text-left md:flex-row gap-6"
              >
                <div className="flex-1">
                  <h3 className="text-3xl font-poppins text-green-600 mb-2">{pillar.title}</h3>
                  <div className="h-1 w-20 bg-yellow-500 mb-4 mx-auto md:mx-0" />
                  <p className="text-black font-poppins mb-6 text-lg">{pillar.description}</p>
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
        </div>
      </section>
      <Questions/>
    </div>  
  );
}
