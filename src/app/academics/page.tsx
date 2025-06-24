import React from "react";
import LevelBanner from "../../../components/LevelsPage/banner/banner";
import LevelSelector from "../../../components/LevelsPage/levelSelector/levelSelector";
import Levels from "../../../components/MainPage/levels/levels";

const Academics: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      {/* Hero banner */}
      <LevelBanner />

      {/* Level selector navigation */}
      <LevelSelector />

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center text-green-700 font-poppins">
          Nuestra Propuesta Académica
        </h1>

        <p className="text-lg leading-relaxed text-black mb-8 text-justify font-poppins">
          En nuestra institución, ofrecemos una formación académica integral
          desde el nivel Inicial hasta Bachillerato. Nuestro enfoque se basa en
          principios pedagógicos modernos, atención personalizada y el
          desarrollo de competencias clave para el siglo XXI. Fomentamos el
          pensamiento crítico, la creatividad y la responsabilidad social en un
          ambiente seguro y estimulante.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-2 text-green-600 font-poppins">
              Enfoque Integral
            </h2>
            <p className="text-black font-poppins">
              Promovemos el desarrollo intelectual, emocional y social de los
              estudiantes mediante programas que equilibran lo académico con lo
              humano.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-2 text-green-600 font-poppins">
              Tecnología y Aprendizaje
            </h2>
            <p className="text-black font-poppins">
              Integramos herramientas digitales en el aula para preparar a
              nuestros alumnos para un mundo cada vez más tecnológico.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-2 text-green-600 ">
              Formación en Valores
            </h2>
            <p className="text-black font-poppins">
              Nuestro modelo educativo inculca valores como la solidaridad, el
              respeto y la responsabilidad desde los primeros años.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-2 text-green-600 font-poppins">
              Docentes Capacitados
            </h2>
            <p className="text-black font-poppins">
              Contamos con un equipo docente comprometido, en constante
              formación y con vocación para guiar a cada estudiante en su
              camino académico.
            </p>
          </div>
         </div>
      </main>
      <Levels/>
    </div>
  );
};

export default Academics;
