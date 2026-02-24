"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const MLoader = ({ onComplete, size = 200, duration = 3 } = {}) => {
  const [isExiting, setIsExiting] = useState(false)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        onComplete?.()
      }, 1000)
    }, duration * 1000)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  }

  const slideUp = {
    initial: {
      top: 0,
    },
    exit: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-gradient-to-b from-[#1a3379] via-[#0f172a] to-black dark:from-gray-900 dark:via-gray-950 dark:to-black z-[99999999999]"
    >
      {dimension.width > 0 && (
        <>
          <div className="relative z-10" style={{ width: size, height: size }}>
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              style={{ filter: "drop-shadow(0 0 20px rgba(56, 189, 248, 0.5))" }}
            >
              <defs>
                <linearGradient id="mGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <animate
                    attributeName="x1"
                    values="0%;100%;0%"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y1"
                    values="0%;100%;0%"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="1">
                    <animate
                      attributeName="stop-color"
                      values="#38bdf8;#005dff;#60a5fa;#38bdf8"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="50%" stopColor="#005dff" stopOpacity="1">
                    <animate
                      attributeName="stop-color"
                      values="#005dff;#60a5fa;#38bdf8;#005dff"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%" stopColor="#1e40af" stopOpacity="1">
                    <animate
                      attributeName="stop-color"
                      values="#1e40af;#38bdf8;#005dff;#1e40af"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
              </defs>
              
              <motion.path
                d="M 40 160 L 40 40 L 100 90 L 160 40 L 160 160"
                stroke="url(#mGradient)"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 1, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.7, 1]
                }}
              />
              
              <motion.circle
                cx="100"
                cy="100"
                r="85"
                stroke="url(#mGradient)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0, rotate: 0 }}
                animate={{ 
                  pathLength: [0, 1, 1, 0],
                  rotate: 360
                }}
                transition={{
                  pathLength: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.7, 1]
                  },
                  rotate: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                style={{ transformOrigin: "center" }}
              />
            </svg>
            
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: "0 6px 12px 0 #38bdf8 inset, 0 12px 18px 0 #005dff inset, 0 36px 36px 0 #1e40af inset, 0 0 3px 1.2px rgba(56, 189, 248, 0.3), 0 0 6px 1.8px rgba(0, 93, 255, 0.2)"
              }}
              animate={{
                rotate: [90, 270, 450],
                boxShadow: [
                  "0 6px 12px 0 #38bdf8 inset, 0 12px 18px 0 #005dff inset, 0 36px 36px 0 #1e40af inset, 0 0 3px 1.2px rgba(56, 189, 248, 0.3), 0 0 6px 1.8px rgba(0, 93, 255, 0.2)",
                  "0 6px 12px 0 #60a5fa inset, 0 12px 6px 0 #0284c7 inset, 0 24px 36px 0 #005dff inset, 0 0 3px 1.2px rgba(56, 189, 248, 0.3), 0 0 6px 1.8px rgba(0, 93, 255, 0.2)",
                  "0 6px 12px 0 #4dc8fd inset, 0 12px 18px 0 #005dff inset, 0 36px 36px 0 #1e40af inset, 0 0 3px 1.2px rgba(56, 189, 248, 0.3), 0 0 6px 1.8px rgba(0, 93, 255, 0.2)"
                ]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
          
          <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
            <motion.path 
              variants={curve} 
              initial="initial" 
              animate={isExiting ? "exit" : "initial"} 
              fill="#070b13" 
            />
          </svg>
        </>
      )}
    </motion.div>
  )
}

export default MLoader