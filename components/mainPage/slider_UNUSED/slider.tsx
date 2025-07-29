"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SliderService, ImageData } from "../../../api/slider";
import { CircularProgress } from "@mui/material";

const AUTO_PLAY_INTERVAL = 4000; // ms
const SWIPE_THRESHOLD = 80; // px

export default function ImageCarousel() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const startX = useRef(0);

  // Fetch images
  useEffect(() => {
    (async () => {
      const imgs = await SliderService.fetchImages();
      setImages(imgs || []);
    })();
  }, []);

  // Autoplay (hooks order consistent)
  useEffect(() => {
    const count = images.length;
    if (hovered || count < 2) return;
    const iv = setInterval(() => setIndex((i) => (i + 1) % count), AUTO_PLAY_INTERVAL);
    return () => clearInterval(iv);
  }, [hovered, images.length]);

  const count = images.length;
  if (count === 0) {
    return (
      <div className="w-full h-64 flex justify-center items-center">
        <CircularProgress color="success" />
      </div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  // Drag handlers
  const onDown = (e: React.PointerEvent) => {
    setDragging(true);
    startX.current = e.clientX;
  };

  // No live movement: calculate delta only
  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    // we could track delta, but do not move container visually
  };

  const onUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);
    const dx = e.clientX - startX.current;
    if (dx > SWIPE_THRESHOLD) prev();
    else if (dx < -SWIPE_THRESHOLD) next();
  };

  return (
    <div
      className="relative w-full max-w-7xl mx-auto select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-green-700 hover:bg-green-800 text-white rounded-full p-3 z-20"
        aria-label="Previous"
      >
        ◀
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-700 hover:bg-green-800 text-white rounded-full p-3 z-20"
        aria-label="Next"
      >
        ▶
      </button>

      {/* Slides */}
      <div
        className="relative h-[320px] sm:h-[420px] md:h-[520px] overflow-hidden"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        {images.map((img, i) => {
          let pos = i - index;
          if (pos < -1) pos += count;
          if (pos > 1) pos -= count;

          let x = 0,
            scale = 1,
            opacity = 1,
            z = 10;
          if (pos === -1) {
            x = -250;
            scale = 0.8;
            opacity = 0.5;
            z = 5;
          } else if (pos === 1) {
            x = 250;
            scale = 0.8;
            opacity = 0.5;
            z = 5;
          } else if (pos !== 0) {
            opacity = 0;
            z = 0;
          }

          return (
            <motion.div
              key={`${img.src}-${i}`}
              className="absolute top-1/2 left-1/2 rounded-xl overflow-hidden shadow-lg"
              style={{
                zIndex: z,
                translateX: "-50%",
                translateY: "-50%",
                width: "90vw",
                maxWidth: "800px",
                height: "100%",
              }}
              initial={false}
              animate={{ x, scale, opacity }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src={img.src}
                alt={img.alt || ""}
                fill
                className="object-cover"
                draggable={false}
                priority={pos === 0}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === index ? "bg-green-700" : "bg-gray-300"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
