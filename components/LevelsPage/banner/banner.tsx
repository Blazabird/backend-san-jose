"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { fetchLevelBannerData } from "../../../api/LevelsPage/banners/levelBanner";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import dotenv from "dotenv";

const STRAPI_BASE = process.env.NEXT_PUBLIC_API_DOMAIN;
const FALLBACK_IMAGE = "/images/fallback.jpg";

const LevelBanner: React.FC = () => {
  const [bannerData, setBannerData] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const highlightWord = "corazón";

  useEffect(() => {
    const load = async () => {
      try {
        const cached = localStorage.getItem("bannerData");
        const ts = localStorage.getItem("bannerTimestamp");
        let data;
        if (cached && ts && Date.now() - +ts < 24 * 60 * 60 * 1000) {
          data = JSON.parse(cached);
        } else {
          data = await fetchLevelBannerData();
          localStorage.setItem("bannerData", JSON.stringify(data));
          localStorage.setItem("bannerTimestamp", Date.now().toString());
        }
        setBannerData(data);

        const media = data?.data?.media;
        if (media?.mime?.startsWith("video") && media.url) {
          setVideoUrl(STRAPI_BASE + media.url);
        }
      } catch {
        setError("Error al conectar con el servidor");

        // Set fallback data so the banner can still render
        setBannerData({
          data: {
            main: "Bienvenido al corazón de San Jose",
            description: "Explora el carisma salesiano.",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = muted;
    vid.volume = volume;

    const tryPlay = () => {
      vid
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Error de Autoplay:", err);
          setIsPlaying(false);
        });
    };

    if (vid.readyState >= 3) {
      tryPlay();
    } else {
      const onCanPlay = () => {
        tryPlay();
        vid.removeEventListener("canplay", onCanPlay);
      };
      vid.addEventListener("canplay", onCanPlay);
    }
  }, [videoUrl, muted, volume]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

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

  const isVideo = Boolean(videoUrl);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={
        !isVideo
          ? {
            backgroundImage: `url('/fallback.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
          : {}
      }
    >
      {error && (
        <div className="absolute top-4 left-4 z-30 max-w-sm">
          <Alert severity="error">{error}</Alert>
        </div>
      )}

      {isVideo && (
        <>
          <video
            ref={videoRef}
            src={videoUrl!}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-2 bg-black bg-opacity-50 p-2 rounded">
            <button
              onClick={togglePlay}
              className="text-white"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={() => setMuted(!muted)}
              className="text-white"
              aria-label={muted ? "Unmute video" : "Mute video"}
            >
              {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="h-1 w-24 rounded-lg"
              style={{ accentColor: "white" }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LevelBanner;
