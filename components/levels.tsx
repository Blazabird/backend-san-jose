"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchLevels, Level } from "../api/levels";

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
        <CircularProgress />
      </div>
    );
  }

  if (!levels.length) {
    return (
      <div className="text-center mt-5 text-lg text-green-900">
        No levels available.
      </div>
    );
  }

  return (
    <div className="bg-gray-200 pb-10 pt-10 px-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600">Niveles Educativos</h1>
        <p className="text-gray-700 mt-2 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
          vestibulum erat.
        </p>
      </div>

      <div className="flex justify-center">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ maxWidth: "1600px", margin: "0 auto" }}
        >
          {levels.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2} key={item.id}>
              <Card
                sx={{
                  maxWidth: "280px",
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
                  onClick={() =>
                    router.push(`/levels/${item.id}/${slugify(item.title)}`)
                  }
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
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
