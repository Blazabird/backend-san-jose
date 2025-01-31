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

export default function Leves() {
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#ffffff", // Clean white background
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!levels.length) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "18px",
          color: "#004d00", // Dark green text
        }}
      >
        No levels available.
      </div>
    );
  }

  return (
    <div className="bg-gray-200"
      style={{
       // Clean white background
        padding: "24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {levels.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card className="border-4 border-green-500"
              sx={{
                maxWidth: "300px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                backgroundColor: "#ffffff", // White card background
                boxShadow: "0px 4px 12px rgba(0, 64, 0, 0.3)", // Dark green shadow
                margin: "10px", // Add spacing between cards
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 15px rgba(0, 64, 0, 0.5)", // Stronger green shadow
                },
              }}
            >
              <CardActionArea sx={{ display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  image={item.image || "/default-image.jpg"}
                  alt={item.title}
                  sx={{
                    height: "200px",
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
                    variant="h5"
                    component="div"
                    sx={{
                      color: "#ffd700", // Bright yellow for titles
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2" 
                    sx={{
                      color: "#004d00", // Rich green for descriptions
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
