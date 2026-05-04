"use client"

import { useEffect, useRef } from "react"
import createGlobe from "cobe"

export default function GlobePulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
     devicePixelRatio: 2,
      width: 1200,
      height: 1200,

      phi: 0,
      theta: 0.2,

      dark: 1,
      diffuse: 1.5,

      mapSamples: 20000,     // 🔥 كثافة النقاط
      mapBrightness: 12,     // 🔥 الإضاءة

      baseColor: [1, 1, 1],  // ⚪ أبيض (النقاط)
      markerColor: [1, 1, 1],
      glowColor: [1, 1, 1],

      markers: [],
      arcs: [],
    
    })

    let phi = 0

    function animate() {
      phi += 0.005
      globe.update({ phi })
      requestAnimationFrame(animate)
    }

    animate()

    return () => globe.destroy()
  }, [])

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} className="w-[500px] h-[500px]" />
    </div>
  )
}