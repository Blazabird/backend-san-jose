"use client";

import React, { useEffect, useState } from "react";
import { fetchAcademicOffer, AcademicOffer } from "../api/offer";
import { Typography, CircularProgress, Divider } from "@mui/material";

const OfertaAcademica: React.FC = () => {
  const [academicOffer, setAcademicOffer] = useState<AcademicOffer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAcademicOffer = async () => {
      const data = await fetchAcademicOffer();
      setAcademicOffer(data);
      setLoading(false);
    };

    getAcademicOffer();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!academicOffer) {
    return <div>No academic offer available.</div>;
  }

  return (
    <div className="w-full bg-gray-200 pb-10 ">
      {/* Optional Divider to separate from the banner */}
      <Divider className="my-8" sx={{ borderBottomWidth: 4 }} />

      {/* Centered container with no vertical padding changes */}
      <div className="w-full max-w-7xl text-center px-4 lg:px-12 py-8 bg-gray-100 mt-10 rounded-lg shadow-xl mx-auto ">
        {/* Title */}
        <Typography
          gutterBottom
          variant="h3" // Increased font size
          className="font-bold text-yellow-500"
        >
          {academicOffer.title}
        </Typography>
        
        {/* Description */}
        <Typography className="text-xl text-gray-600 mt-4">
          {academicOffer.description}
        </Typography>
      </div>
    </div>
  );
};

export default OfertaAcademica;
