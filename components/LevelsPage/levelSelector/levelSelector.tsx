"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

const levels = [
  { level: 1, name: "Bachillerato" },
  { level: 2, name: "Secundaria" },
  { level: 3, name: "Primaria" },
  { level: 4, name: "Preescolar" },
  { level: 5, name: "Inicial" },
];

const LevelSelector: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean); // filter removes empty segments
  let levelIdFromUrl: number | null = null;

  if (pathSegments.length === 2) {
    // Example: /1/academics
    const possibleId = parseInt(pathSegments[0], 10);
    if (!isNaN(possibleId)) {
      levelIdFromUrl = possibleId;
    }
  } else if (pathSegments.length === 1 && pathSegments[0] === "academics") {
    
    levelIdFromUrl = 5; 
  }

  const handleLevelClick = (level: number) => {
    router.push(`/levels/${level}/some-slug`);
  };

  return (
    <div className="w-full h-[60px] bg-green-600 flex items-center justify-center">
      {levels.map(({ level, name }, index) => {
        const isSelected = level === levelIdFromUrl;

        return (
          <React.Fragment key={level}>
            <motion.button
              onClick={() => handleLevelClick(level)}
              className={`font-poppins text-lg mx-2 px-2 transition-colors duration-300 ${
                isSelected ? "text-yellow-300 font-semibold" : "text-white"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {name}
            </motion.button>

            {index < levels.length - 1 && (
              <span className="text-white opacity-50 select-none">|</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default LevelSelector;
