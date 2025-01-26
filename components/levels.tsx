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
    return <CircularProgress />;
  }

  if (!levels.length) {
    return <div>No levels available.</div>;
  }

  return (
    <Grid container spacing={3} justifyContent="center">
     
      <Grid item xs={12}>
      </Grid>

      {/* Display the levels below the academic offer */}
      {levels.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} sx={{ paddingLeft: index === 0 ? "16px" : 0 }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={item.image || "/default-image.jpg"}
                alt={item.title}
              />
              <CardContent>
                {/* Title with green color and centered */}
                <Typography gutterBottom variant="h5" component="div" className="text-yellow-500 text-center">
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
