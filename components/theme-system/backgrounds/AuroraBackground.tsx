"use client"

/**
 * @file AuroraBackground.tsx
 * @description 极光主题增强背景（Phase 2 尾项，迁移自 YYC3-XY-AI）
 * @detail 5 个大型极光 Orb + 20 粒子，配合 aurora-effects.css 中的
 *   auroraComplex 流动动画。仅推荐在 [data-theme='aurora'] 下渲染。
 */

import { useMemo } from "react"

export interface AuroraBackgroundProps {
  particleCount?: number
}

interface Particle {
  id: number
  size: number
  left: number
  top: number
  delay: number
  duration: number
  opacity: number
}

export function AuroraBackground({ particleCount = 20 }: AuroraBackgroundProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 12,
      duration: Math.random() * 10 + 10,
      opacity: Math.random() * 0.5 + 0.15,
    }))
  }, [particleCount])

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
            animationName: "auroraParticle",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
        />
      ))}
    </div>
  )
}

export default AuroraBackground
