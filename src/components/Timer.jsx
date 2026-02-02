import React from 'react'

export default function Timer({ timeLeft, isComplete }) {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(2, '0')

  return (
    <>
      {!isComplete ? (
        <div className="text-center animate-in fade-in duration-300">
          <div 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white font-mono tracking-tight"
            style={{ 
              textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.1)',
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {minutes}:{seconds}
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
            style={{ 
              textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            }}
          >
            Session Complete! ☀️
          </div>
          <p className="text-lg sm:text-xl text-white text-opacity-90 font-light">
            Great work! You've earned a break.
          </p>
        </div>
      )}
    </>
  )
}