"use client";

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchLevels, Level } from "../api/levels";

export default function Levels() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    <div className="bg-gray-200 p-6 flex justify-center">
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ maxWidth: "1600px", margin: "0 auto" }} // Increase max width to fit more cards
      >
        {levels.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2} key={item.id}>
            <Card
              className="border-4 border-green-500"
              sx={{
                maxWidth: "280px", // Keep size but allow one more card per row
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
              <CardActionArea sx={{ display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  image={item.image || "/default-image.jpg"}
                  alt={item.title}
                  sx={{
                    height: "180px",
                    width: "100%",
                    objectFit: "contain",
                    padding: "8px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      color: "#ffd700",
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
  );
}
