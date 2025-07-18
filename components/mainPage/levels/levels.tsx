"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";
import { motion } from "framer-motion";
import LoadingCircleSpinner from "../../loading/loadingcircle";
import { fetchLevels, Level } from "../../../api/MainPage/levels/levels";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const dummyLevels: Level[] = [
  {
    id: 1,
    title: "Primary Education",
    description: "Basic education for children aged 6 to 12 years.",
    image: "https://source.unsplash.com/random/400x300?school,1",
    subtitle: "yes",
    pillarDescription: "yes",
  },
  {
    id: 2,
    title: "Secondary Education",
    description: "Intermediate education for teenagers aged 13 to 18 years.",
    image: "https://source.unsplash.com/random/400x300?school,2",
    subtitle: "yes",
    pillarDescription: "yes",
  },
  {
    id: 3,
    title: "Higher Education",
    description: "University level courses and degrees.",
    image: "https://source.unsplash.com/random/400x300?university,3",
    subtitle: "yes",
    pillarDescription: "yes",
  },
  {
    id: 4,
    title: "Adult Education",
    description: "Programs designed for adult learners and continuing education.",
    image: "https://source.unsplash.com/random/400x300?adult,4",
    subtitle: "yes",
    pillarDescription: "yes",
  },
  {
    id: 5,
    title: "Special Education",
    description: "Education tailored for students with special needs.",
    image: "https://source.unsplash.com/random/400x300?specialeducation,5",
    subtitle: "yes",
    pillarDescription: "yes",
  },
];
// Slugify helper
const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

export default function Levels() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getLevels = async () => {
      const data = dummyLevels;
      setLevels(data);
      setLoading(false);
    };
    getLevels();
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      const el = scrollContainerRef.current;
      if (el) {
        setShowScrollButtons(el.scrollWidth > el.clientWidth);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [levels]);

  const scrollByAmount = 300;
  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <LoadingCircleSpinner />
      </div>
    );
  }

  if (!levels.length) {
    return (
      <div className="bg-white pb-10 pt-10 px-6 h-[30rem] bg-gray-300 flex flex-col items-center justify-start">
        <motion.div
          className="text-center mb-8"
          whileInView={{ opacity: 1, y: "0vw" }}
          initial={{ opacity: 0, y: "25vw" }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-green-600">Niveles Educativos</h1>
          <p className="text-gray-700 mt-2 max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac vestibulum erat.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center items-center"
          whileHover={{ scale: 1.2 }}
          whileInView={{ opacity: 1, x: "0vw" }}
          initial={{ opacity: 0, x: "25vw" }}
          transition={{ duration: 0.5 }}
        >
          <div className="border-4 border-red-500 rounded-lg p-10 shadow-2xl bg-white text-center">
            <WarningAmberRoundedIcon sx={{ fontSize: 60, color: red[500] }} />
            <p className="mt-4 text-lg font-poppins font-medium text-red-700">
              No hay niveles disponibles.
            </p>
            <p className="text-red-700 font-poppins">Por favor, intente nuevamente más tarde.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-100 pb-10 pt-10 px-6 overflow-hidden">
      <motion.div className="text-center mb-8" initial={{ opacity: 0, y: "5vw" }} whileInView={{ opacity: 1, y: "0vw" }} transition={{ duration: 0.3 }}>
        <h1 className="text-4xl font-bold font-poppins text-green-600">Niveles Educativos</h1>
        <p className="text-black font-poppins mt-2 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac vestibulum erat.
        </p>
      </motion.div>

      {showScrollButtons && (
        <>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-green-700 text-white p-2 rounded-full shadow-md hover:bg-green-800 transition"
            onClick={scrollLeft}
          >
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-green-700 text-white p-2 rounded-full shadow-md hover:bg-green-800 transition"
            onClick={scrollRight}
          >
            <ArrowForwardIosRoundedIcon fontSize="small" />
          </button>
        </>
      )}

      <div
        ref={scrollContainerRef}
        className="relative flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4 py-4"
        style={{
          scrollBehavior: "smooth",
          paddingBottom: "2rem",         
          overflowY: "hidden",           
          marginBottom: "-16px"          
        }}
      >
        {levels.map((item, index) => {
          const fromAbove = index % 2 === 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: fromAbove ? "-5vw" : "5vw" }}
              whileInView={{ opacity: 1, y: "0vw" }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
              style={{ width: "280px" }}
            >
              <motion.div
                whileHover={{
                  scale: 1.13,
                  zIndex: 10,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0px 4px 12px rgba(0, 64, 0, 0.3)",
                    overflow: "visible", 
                  }}
                >
                  <CardActionArea
                    onClick={() => router.push(`/levels/${item.id}/${slugify(item.title)}`)}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image || "/default-image.jpg"}
                      alt={item.title}
                      sx={{
                        height: "180px",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          color: "#ca8a04",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#004d00",
                          textAlign: "center",
                        }}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
