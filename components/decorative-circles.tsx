"use client"

import { useState, useEffect } from "react"

interface Circle {
  width: number
  height: number
  left: string
  top: string
}

export function DecorativeCircles() {
  const [circles, setCircles] = useState<Circle[]>([])

  useEffect(() => {
    const newCircles = Array(20).fill(null).map(() => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setCircles(newCircles)
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      {circles.map((circle, i) => (
        <div
          key={i}
          className="absolute rounded-full border-2 border-cream"
          style={{
            width: `${circle.width}px`,
            height: `${circle.height}px`,
            left: circle.left,
            top: circle.top,
          }}
        />
      ))}
    </div>
  )
}