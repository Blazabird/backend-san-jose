"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchLevels, Level } from "../../../api/mainPage/levels/levels";
import { useEffect, useState } from "react";

export default function LevelSelector() {
  const [levels, setLevels] = useState<Level[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetchLevels().then(setLevels);
  }, []);

  return (
    <div className="w-full bg-green-700 py-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 overflow-x-auto scrollbar-none">
          {levels.map((level) => {
            const isSelected = pathname.includes(level.documentId);
            return (
              <Link
                key={level.id}
                href={`/levels/${level.documentId}/${level.title.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-6 py-2 rounded-full text-sm font-poppins font-semibold border transition-all duration-200 shadow-sm whitespace-nowrap
                  ${
                    isSelected
                      ? "bg-yellow-500 text-white border-white border-2 shadow-md"
                      : "bg-white text-black border-black border-2 hover:bg-yellow-200"
                  }`}
              >
                {level.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
