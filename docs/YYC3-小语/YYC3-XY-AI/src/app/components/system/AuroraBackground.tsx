import React, { useMemo } from 'react';

export interface AuroraBackgroundProps {
  particleCount?: number;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ particleCount = 20 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 12,
      duration: Math.random() * 10 + 10,
      opacity: Math.random() * 0.5 + 0.15,
    }));
  }, [particleCount]);

  return (
    <div className="aurora-bg" aria-hidden="true">
      {/* Large aurora orbs */}
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
      <div className="aurora-orb aurora-orb-3" />
      <div className="aurora-orb aurora-orb-4" />
      <div className="aurora-orb aurora-orb-5" />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="aurora-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            animationName: 'auroraParticle',
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
