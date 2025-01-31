"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "Breaking News: Major Event Happens",
      description:
        "A detailed report on a major event that has recently occurred, including insights and implications.",
      fullContent: "Full content of Breaking News: Major Event Happens...",
      image: "/news-image-1.jpg",
      date: "Jan 25, 2025",
      category: "World",
    },
    {
      id: 2,
      title: "Tech Innovations Changing the World",
      description:
        "Discover the latest advancements in technology and how they are reshaping industries worldwide.",
      fullContent: "Full content of Tech Innovations Changing the World...",
      image: "/news-image-2.jpg",
      date: "Jan 24, 2025",
      category: "Technology",
    },
    {
      id: 3,
      title: "Health Tips for the Winter Season",
      description:
        "Expert tips to stay healthy during the chilly winter months, including nutrition and exercise advice.",
      fullContent: "Full content of Health Tips for the Winter Season...",
      image: "/news-image-3.jpg",
      date: "Jan 23, 2025",
      category: "Health",
    },
  ];

  const [selectedNews, setSelectedNews] = useState(news[0]);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [color, setColor] = useState("bg-yellow-400");

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isAnimating) {
      setIsAnimating(true);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval); // Stop when progress reaches 100%
            setTimeout(() => {
              setSelectedNews((prevNews) => {
                const nextIndex = (news.findIndex(
                  (article) => article.id === prevNews.id
                ) + 1) % news.length;
                return news[nextIndex];
              });
            }, 500); // Wait 0.5 seconds before switching to the next news item
            return 100;
          }
          return prev + 1; // Increase the progress by 1% every interval
        });

        // Dynamically adjust the progress bar color
        if (progress >= 50 && progress < 75) {
          setColor("bg-yellow-500");
        } else if (progress >= 75) {
          setColor("bg-yellow-600");
        }
      }, 50); // Update every 50ms to animate the progress bar
    }

    // Cleanup the interval if the component is unmounted or isAnimating changes
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAnimating, progress, news]);

  return (
    <div className="flex flex-col md:flex-row bg-gray-300 py-8 px-4">
      {/* Left Column: News Selector */}
      <div className="w-full md:w-1/3 border-r border-gray-300">
        <h2 className="text-5xl font-bold mb-4">Noticias</h2>
        <ul className="space-y-4 mt-5">
          {news.map((article) => (
            <li
              key={article.id}
              onClick={() => {
                setSelectedNews(article);
                setProgress(0); // Reset progress when a new article is clicked
                setIsAnimating(false); // Restart animation when a new article is clicked
              }}
              className={`cursor-pointer p-3 rounded-lg ${
                article.id === selectedNews.id ? "bg-yellow-100 font-bold" : "hover:bg-gray-200"
              }`}
            >
              {article.title}
            </li>
          ))}
        </ul>
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-300 mt-4">
          <motion.div
            className={`h-full ${color}`}
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.05 }} // Smooth animation
          />
        </div>
      </div>

      {/* Right Column: Main Content */}
      <div className="w-full md:w-2/3 p-6">
        <h3 className="text-2xl font-bold mb-4 text-black">{selectedNews.title}</h3>
        <p className="text-sm text-black mb-2">
          {selectedNews.category} - {selectedNews.date}
        </p>
        <img
          src={selectedNews.image}
          alt={selectedNews.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700">{selectedNews.fullContent}</p>
      </div>
    </div>
  );
};

export default NewsSection;
