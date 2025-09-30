"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { red } from "@mui/material/colors";
import { motion } from "framer-motion";
import LoadingCircleSpinner from "../../loading/loadingcircle";
import { fetchLevels, Level } from "../../../api/mainPage/levels/levels";

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
  const router = useRouter();

  useEffect(() => {
    const getLevels = async () => {
      const data = await fetchLevels();
      setLevels(data);
      setLoading(false);
    };

    getLevels();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <LoadingCircleSpinner />
      </div>
    );
  }

  if (!levels.length) {
    return (
      <div className="bg-white -ml-80 pb-10 pt-10 px-6 h-[30rem] flex flex-col items-center justify-start">
        <motion.div
          className="text-center mb-8"
          whileInView={{ opacity: 1, y: "0vw" }}
          viewport={{ once: true }}
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
    <div className="bg-white pb-10 pt-10 px-4 sm:px-6 overflow-hidden">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600">Niveles Educativos</h1>
        <p className="text-gray-700 mt-2 max-w-xl mx-auto">
          Ofrecemos diversos niveles educativos. En esta sección se muestran todos nuestros servicios educativos.
        </p>
      </div>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "1600px",
          },
          mx: "auto",
          boxSizing: "border-box",
          px: {
            xs: 0,
            sm: 0,
            md: 0,
          },
        }}
      >
        {levels.map((item, index) => {
          const fromAbove = index % 2 === 0;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.id} sx={{ height: "100%" }}>
              <motion.div
                initial={{ opacity: 0, y: fromAbove ? "-5vw" : "5vw" }}
                whileInView={{ opacity: 1, y: "0vw" }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0px 4px 12px rgba(0, 64, 0, 0.3)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 6px 15px rgba(0, 64, 0, 0.5)",
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => router.push(`/levels/${item.documentId}/${slugify(item.title)}`)}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image || "/default-image.jpg"}
                      alt={item.title}
                      sx={{
                        height: "180px",
                        width: "100%",
                        maxWidth: "100%",
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
                        {item.shortDescription}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
