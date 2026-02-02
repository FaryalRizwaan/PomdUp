import React from 'react'

export default function Controls({ isRunning, isComplete, onStart, onReset }) {
  const buttonText = isComplete ? 'Start New Session' : isRunning ? 'Pause' : 'Start Focus Session'
  
  return (
    <button
      onClick={isComplete ? onReset : onStart}
      style={{
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        padding: '14px 40px',
        borderRadius: '12px',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Inter, Poppins, sans-serif',
        letterSpacing: '0.5px'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'
        e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)'
        e.target.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
        e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)'
        e.target.style.transform = 'translateY(0)'
      }}
    >
      {buttonText}
    </button>
  )
}