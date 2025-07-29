"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FAQItem[];
}

export default function FaqSectionClient({ faqs }: FaqSectionProps) {
  const [openFAQs, setOpenFAQs] = useState<Set<number>>(new Set());

  const toggleFAQ = (id: number) => {
    setOpenFAQs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const mid = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, mid);
  const right = faqs.slice(mid);

  return (
    <section className="bg-white text-yellow-500 py-12 flex justify-center font-poppins">
      <div className="max-w-6xl w-full mx-6 p-3">
        <h2 className="text-3xl font-bold text-yellow-500 mb-6 text-center">Preguntas Frecuentes</h2>
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/2 space-y-4">
            {left.map((faq) => (
              <FAQItemComponent
                key={faq.id}
                faq={faq}
                isOpen={openFAQs.has(faq.id)}
                toggle={() => toggleFAQ(faq.id)}
              />
            ))}
          </div>
          <div className="md:w-1/2 space-y-4">
            {right.map((faq) => (
              <FAQItemComponent
                key={faq.id}
                faq={faq}
                isOpen={openFAQs.has(faq.id)}
                toggle={() => toggleFAQ(faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface FAQItemComponentProps {
  faq: FAQItem;
  isOpen: boolean;
  toggle: () => void;
}

function FAQItemComponent({ faq, isOpen, toggle }: FAQItemComponentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col font-poppins">
      <button
        onClick={toggle}
        className="w-full text-left bg-gray-800 text-white p-4 rounded-lg border border-gray-700 flex justify-between items-center hover:bg-gray-700 focus:outline-none transition-colors duration-200"
      >
        <span className="font-medium text-white">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-yellow-400 text-xl font-bold"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`answer-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.8, 0.25, 1],
            }}
            className="overflow-hidden bg-gray-200 border border-t-0 border-gray-300 px-4 rounded-b-lg"
          >
            <div ref={contentRef} className="py-4">
              <p className="text-base text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
