"use client";
import React, { useEffect, useState, useRef } from "react";
import { fetchBannerData } from "../api/banner";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";

const STRAPI_BASE = "http://localhost:1500";
const FALLBACK_IMAGE = "/images/fallback.jpg";

const Banner: React.FC = () => {
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
          data = await fetchBannerData();
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
          console.warn("Autoplay failed:", err);
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

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const isVideo = Boolean(videoUrl);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={
        !isVideo
          ? {
              backgroundImage: `url(${FALLBACK_IMAGE})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
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

      {!isVideo && bannerData && (
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left h-full px-6 md:px-20 lg:px-36 py-20">
          <div className="md:w-1/2 bg-white bg-opacity-85 p-6 rounded-2xl shadow-2xl -ml-16">
            <p className="text-green-600 uppercase font-semibold tracking-wide text-sm md:text-base mb-4 mt-24">
              San Jose
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {bannerData.data.main.split(" ").map((w: string, i: number) => (
                <span
                  key={i}
                  className={
                    w.toLowerCase() === highlightWord.toLowerCase()
                      ? "text-yellow-500 underline decoration-yellow-500 decoration-4"
                      : ""
                  }
                >
                  {w}{" "}
                </span>
              ))}
            </h2>
            <p className="text-gray-600 text-sm md:text-lg mt-6 leading-relaxed">
              {bannerData.data.description}
            </p>
            <div className="mt-8">
              <button className="relative overflow-hidden px-10 py-2 bg-green-600 text-white font-medium text-sm md:text-base rounded-lg shadow-md group">
                <span className="absolute inset-0 bg-green-700 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                <span className="relative z-10 text-lg font-bold">Ver Más</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
