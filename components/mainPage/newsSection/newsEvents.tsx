"use client";
import React, { useEffect, useState } from "react";
import { fetchNews, NewsItem } from "../../../api/mainPage/newsSection/news/news";
import { fetchEvents, EventItem } from "../../../api/mainPage/newsSection/events/calendar";
import { motion } from "framer-motion";
import { FaClock, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type ModalContent = { type: "news"; item: NewsItem } | null;

export default function NewsAndEvents() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [modalContent, setModalContent] = useState<ModalContent>(null);

  useEffect(() => {
    async function loadAll() {
      try {
        const n = await fetchNews();
        setNews(n.slice(0, 4));
      } catch (e) {
        console.error(e);
      }
      try {
        const ev = await fetchEvents();
        setEvents(ev);
      } catch (e) {
        console.error(e);
      }
    }
    loadAll();
  }, []);

  const openModal = (content: ModalContent) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  return (
    <>
      <section className="w-full px-4 sm:px-6 md:px-10 xl:px-20 pt-7 pb-20 bg-white font-poppins">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* News */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-yellow-500">Noticias Recientes</h2>
            <div className="grid sm:grid-cols-2 gap-6 min-h-[200px]">
              {news.length === 0 ? (
                <div className="col-span-full flex justify-center items-center">
                  <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-md text-center shadow-sm">
                    No hay noticias para mostrar.
                  </div>
                </div>
              ) : (
                news.map((item) => (
                  <motion.div
                    key={item.id}
                    className="rounded-lg shadow-lg hover:shadow-xl transition bg-gray-50 flex flex-col cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    onClick={() => openModal({ type: "news", item })}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-56 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="p-6 flex-grow text-black">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm mb-4">
                        {format(new Date(item.date), "d 'de' MMMM 'de' yyyy", { locale: es })}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Events */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-yellow-500">Próximos Eventos</h2>
            <div className="space-y-6 min-h-[200px] flex justify-center items-center">
              {events.length === 0 ? (
                <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-md text-center shadow-sm">
                  No hay eventos para mostrar.
                </div>
              ) : (
                <div className="space-y-6 w-full">
                  {events.map((ev) => (
                    <motion.div
                      key={ev.id}
                      className="p-6 rounded-lg bg-gray-100 border-l-4 border-yellow-400 shadow-lg text-black"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className="text-sm font-semibold uppercase mb-1">
                        {format(new Date(ev.date), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                      </p>
                      <h3 className="text-lg font-bold mb-2">{ev.title}</h3>
                      {ev.start && ev.end && (
                        <div className="flex items-center gap-3 text-sm mb-1">
                          <FaClock className="text-yellow-500" /> {ev.start} - {ev.end}
                        </div>
                      )}
                      {ev.place && (
                        <div className="flex items-center gap-3 text-sm">
                          <FaMapMarkerAlt className="text-yellow-500" /> {ev.place}
                        </div>
                      )}
                      {ev.image && (
                        <img
                          src={ev.image}
                          alt={ev.title}
                          className="w-full h-40 object-cover rounded-lg mt-3"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalContent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          onClick={closeModal}
        >
          <motion.div
            className="relative bg-white rounded-xl w-full sm:w-[90%] md:w-[80%] max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 text-black hover:text-yellow-500 transition"
            >
              <FaTimes size={22} />
            </button>

            {/* Scrollable content */}
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[90vh] text-black">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-yellow-500">
                {modalContent.item.title}
              </h2>

              {modalContent.item.image && (
                <img
                  src={modalContent.item.image}
                  alt={modalContent.item.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg mb-4"
                />
              )}

              <p className="text-sm text-gray-500 mb-3">
                {format(new Date(modalContent.item.date), "d 'de' MMMM 'de' yyyy", { locale: es })}
              </p>

              <p className="text-sm sm:text-base whitespace-pre-line leading-relaxed">
                {modalContent.item.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
