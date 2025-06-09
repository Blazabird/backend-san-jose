"use client";

import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { fetchNews } from "../api/news";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { red } from '@mui/material/colors';
import {motion} from "framer-motion";

interface NewsArticle {
  id: number;
  title: string;
  image: string;
  date: string;
  description: string;
}

const NewsSection = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      const newsData = await fetchNews();
      setNews(newsData);
      setSelectedNews(newsData[0] || null);
      setLoading(false);
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgba(255,255,255,0.8)",
          zIndex: 9999,
        }}
      >
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <div className="bg-gray-300 min-h-[500px] py-10 px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Últimas Noticias</h1>
        <p className="text-gray-500">Mantente al día con las actividades del colegio</p>
      </div>

      <div className="flex flex-wrap -mx-4">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 px-4 mb-8 lg:mb-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Noticias</h3>
            <ul className="space-y-2">
              {news.map((article) => (
                <li
                  key={article.id}
                  onClick={() => setSelectedNews(article)}
                  className={`cursor-pointer px-4 py-2 rounded-md transition ${selectedNews?.id === article.id
                      ? "bg-green-500 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  {article.title}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 px-4">
          {selectedNews ? (
            <div className="bg-white p-6 rounded-lg shadow-md grid lg:grid-cols-3 gap-6">
              {/* Left Column (Text) */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                  {selectedNews.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">{selectedNews.date}</p>
                <div className="text-gray-700">
                  {/* Description should dynamically use 1 or 2 columns */}
                  <div
                    className={`grid grid-cols-1 md:grid-cols-1 gap-6 ${selectedNews.description.length > 100 ? 'md:grid-cols-1' : ''}`}
                  >
                    <p className="mb-6 break-words">{selectedNews.description}</p>
                  </div>
                </div>
              </div>

              {/* Right Column (Image) */}
              <div className="lg:w-full lg:ml-4">
                {selectedNews.image && (
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full h-auto object-cover rounded-lg max-h-[400px]"
                  />
                )}
              </div>
            </div>
          ) : (
            <motion.div
              className="flex justify-center items-center"
              whileHover={{ scale: 1.2 }}

            >
              <div className="border-4 border-red-500 rounded-lg p-10 shadow-2xl bg-white text-center">
                <WarningAmberRoundedIcon sx={{ fontSize: 60, color: red[500] }} />
                <p className="mt-4 text-lg font-poppins font-medium text-red-700">
                  No hay noticias disponibles.
                </p>
                <p className="text-red-700 font-poppins">Por favor, intente nuevamente más tarde.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
