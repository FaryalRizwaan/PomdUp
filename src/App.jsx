import React, { useState, useEffect } from 'react'
import SunriseScene from './components/SunriseScene'
import Controls from './components/Controls'
import Timer from './components/Timer'
import './App.css'

export default function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let interval
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            setIsComplete(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const totalTime = 25 * 60
  const elapsedTime = totalTime - timeLeft
  const progress = elapsedTime / totalTime

  const handleStart = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(25 * 60)
    setIsComplete(false)
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative flex items-center justify-center">
      <SunriseScene progress={progress} />

      <div className="fixed inset-0 flex flex-col items-center justify-center z-20 gap-6 sm:gap-8 md:gap-10 px-4">
        <Timer timeLeft={timeLeft} isComplete={isComplete} />
        <Controls isRunning={isRunning} isComplete={isComplete} onStart={handleStart} onReset={handleReset} />
      </div>

      <button
        onClick={handleReset}
        className="fixed top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 w-12 h-12 rounded-full bg-white bg-opacity-15 hover:bg-opacity-30 text-white text-xl flex items-center justify-center transition-all z-50 hover:scale-110 active:scale-95"
        title="Reset"
      >
        ↻
      </button>
    </div>
  )
}