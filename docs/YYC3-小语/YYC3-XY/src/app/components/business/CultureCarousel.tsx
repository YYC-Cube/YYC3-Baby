import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CultureItemData {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags?: string[];
}

export interface CultureCarouselProps {
  items: CultureItemData[];
  autoplay?: boolean;
  interval?: number;
  onItemClick?: (item: CultureItemData) => void;
  className?: string;
}

export const CultureCarousel: React.FC<CultureCarouselProps> = ({
  items,
  autoplay = true,
  interval = 5000,
  onItemClick,
  className = '',
}) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoplay || items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, items.length]);

  if (!items.length) return null;
  const item = items[current];

  return (
    <div className={`glass-card overflow-hidden ${className}`} style={{ borderRadius: 20 }}>
      <div className="relative h-72 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={item.id}
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-white mb-1" style={{ fontWeight: 600 }}>{item.title}</h3>
          <p className="text-sm text-white/80">{item.description}</p>
          {item.tags && (
            <div className="flex gap-2 mt-2">
              {item.tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-lg text-xs">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {items.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((current - 1 + items.length) % items.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-colors border border-white/30"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button
              onClick={() => setCurrent((current + 1) % items.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-colors border border-white/30"
            >
              <ChevronRight size={18} className="text-white" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
