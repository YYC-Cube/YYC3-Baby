import React, { useMemo } from 'react';

export interface CyberpunkBackgroundProps {
  particleCount?: number;
}

export const CyberpunkBackground: React.FC<CyberpunkBackgroundProps> = ({ particleCount = 20 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1.5,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 14,
      duration: Math.random() * 12 + 10,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, [particleCount]);

  // Data flow lines (vertical streaks like in the Matrix)
  const dataStreams = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      delay: Math.random() * 10,
      duration: Math.random() * 8 + 6,
      width: Math.random() > 0.5 ? 1 : 2,
      opacity: Math.random() * 0.15 + 0.05,
      height: Math.random() * 150 + 50,
    }));
  }, []);

  return (
    <div className="cyber-bg" aria-hidden="true">
      {/* Large glowing orbs */}
      <div className="cyber-orb cyber-orb-1" />
      <div className="cyber-orb cyber-orb-2" />
      <div className="cyber-orb cyber-orb-3" />
      <div className="cyber-orb cyber-orb-4" />
      <div className="cyber-orb cyber-orb-5" />

      {/* Data flow streams */}
      {dataStreams.map((stream) => (
        <div
          key={`stream-${stream.id}`}
          style={{
            position: 'absolute',
            left: `${stream.left}%`,
            top: '-10%',
            width: stream.width,
            height: stream.height,
            background: `linear-gradient(to bottom, transparent, rgba(0, 240, 255, ${stream.opacity}), transparent)`,
            animationName: 'cyberDataFlow',
            animationDuration: `${stream.duration}s`,
            animationDelay: `${stream.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            pointerEvents: 'none' as const,
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="cyber-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            animationName: 'cyberParticle',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        />
      ))}
    </div>
  );
};
