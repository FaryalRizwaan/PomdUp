import React from 'react'

export default function SunriseScene({ progress = 0 }) {
  // Calculate colors based on progress (0 to 1)
  const getGradientColors = (progress) => {
    // Phase 1: Night (0-0.2)
    if (progress < 0.2) {
      const p = progress / 0.2;
      return {
        top: '#0f0a1f',
        bottom: '#1a1a3e',
      };
    }
    // Phase 2: Pre-Dawn (0.2-0.4)
    if (progress < 0.4) {
      const p = (progress - 0.2) / 0.2;
      return {
        top: `rgb(${Math.round(45 + (75 - 45) * p)}, ${Math.round(27 + (45 - 27) * p)}, ${Math.round(78 + (95 - 78) * p)})`,
        bottom: `rgb(${Math.round(123 + (200 - 123) * p)}, ${Math.round(45 + (75 - 45) * p)}, ${Math.round(143 + (160 - 143) * p)})`,
      };
    }
    // Phase 3: Dawn Breaking (0.4-0.6)
    if (progress < 0.6) {
      const p = (progress - 0.4) / 0.2;
      return {
        top: `rgb(${Math.round(200 + (255 - 200) * p)}, ${Math.round(75 + (107 - 75) * p)}, ${Math.round(160 + (157 - 160) * p)})`,
        bottom: `rgb(${Math.round(255)}, ${Math.round(107 + (140 - 107) * p)}, ${Math.round(157 + (165 - 157) * p)})`,
      };
    }
    // Phase 4: Sunrise (0.6-0.8)
    if (progress < 0.8) {
      const p = (progress - 0.6) / 0.2;
      return {
        top: `rgb(${Math.round(255)}, ${Math.round(107 + (140 - 107) * p)}, ${Math.round(157 + (66 - 157) * p)})`,
        bottom: `rgb(${Math.round(255)}, ${Math.round(140 + (165 - 140) * p)}, ${Math.round(66)})`,
      };
    }
    // Phase 5: Full Day (0.8-1.0)
    const p = (progress - 0.8) / 0.2;
    return {
      top: `rgb(${Math.round(135 + (200 - 135) * p)}, ${Math.round(206)}, ${Math.round(235)})`,
      bottom: `rgb(${Math.round(255)}, ${Math.round(204 + (215 - 204) * p)}, ${Math.round(0)})`,
    };
  };

  const colors = getGradientColors(progress);
  
  // Sun animation: starts below horizon, rises up
  const sunY = 950 - progress * 550; // Sun rises from 950 to 400
  const sunOpacity = progress < 0.4 ? 0 : Math.min(1, (progress - 0.4) / 0.2);
  const sunSize = 100;

  // Stars fade out by 10 minutes (0.4 progress)
  const starsOpacity = Math.max(0, 1 - progress / 0.4);

  // Moon fade out by 8 minutes (0.32 progress)
  const moonOpacity = Math.max(0, 1 - progress / 0.32);

  // Generate random stars
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.sin(i * 12.9898) * 500 + 500,
    y: Math.cos(i * 78.233) * 300 + 200,
    size: Math.sin(i * 45.164) * 2 + 1.5,
  })).filter(star => star.x > 0 && star.x < 1000 && star.y > 0 && star.y < 600);

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        background: `linear-gradient(to bottom, ${colors.top}, ${colors.bottom})`,
        willChange: 'background',
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        style={{ filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.3))' }}
      >
        <defs>
          {/* Sun glow gradient */}
          <radialGradient id="sunGlow">
            <stop offset="0%" stopColor="#ffcc00" stopOpacity="1" />
            <stop offset="50%" stopColor="#ffa500" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ff8c42" stopOpacity="0" />
          </radialGradient>

          {/* Stars twinkling animation */}
          <style>{`
            @keyframes twinkle {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
            .star {
              animation: twinkle 3s infinite;
            }
          `}</style>
        </defs>

        {/* Stars (fade out during dawn) */}
        {stars.map(star => (
          <circle
            key={star.id}
            cx={star.x}
            cy={star.y}
            r={star.size}
            fill="#ffffff"
            opacity={starsOpacity * 0.8}
            className="star"
          />
        ))}

        {/* Moon (fades out during pre-dawn) */}
        {moonOpacity > 0 && (
          <circle
            cx="850"
            cy="150"
            r="60"
            fill="#f0f0f0"
            opacity={moonOpacity * 0.9}
          />
        )}

        {/* Sun glow (behind sun) */}
        {sunOpacity > 0 && (
          <circle
            cx="500"
            cy={sunY}
            r={sunSize * 1.8}
            fill="url(#sunGlow)"
            opacity={sunOpacity * 0.7}
          />
        )}

        {/* Sun */}
        {sunOpacity > 0 && (
          <circle
            cx="500"
            cy={sunY}
            r={sunSize}
            fill="#ffcc00"
            opacity={sunOpacity}
          />
        )}

        {/* Mountain Layer 1 (furthest back) */}
        <path
          d="M 0 800 Q 250 600 500 750 T 1000 800 L 1000 1000 L 0 1000 Z"
          fill="#1a0f2e"
          opacity="0.7"
        />

        {/* Mountain Layer 2 */}
        <path
          d="M 0 850 Q 200 700 400 800 Q 600 700 800 850 L 1000 900 L 1000 1000 L 0 1000 Z"
          fill="#0d0819"
          opacity="0.85"
        />

        {/* Mountain Layer 3 */}
        <path
          d="M 0 900 L 150 700 L 300 800 L 450 650 L 600 750 L 750 700 L 900 800 L 1000 900 L 1000 1000 L 0 1000 Z"
          fill="#000000"
          opacity="0.9"
        />

        {/* Pine Trees (Layer 4 - Foreground) */}
        {/* Left side trees */}
        <g opacity="1">
          {/* Tree 1 */}
          <polygon points="50,950 30,850 70,850" fill="#000000" />
          <rect x="45" y="950" width="10" height="50" fill="#000000" />

          {/* Tree 2 */}
          <polygon points="150,950 120,820 180,820" fill="#000000" />
          <rect x="140" y="950" width="20" height="50" fill="#000000" />

          {/* Tree 3 */}
          <polygon points="250,950 210,880 290,880" fill="#000000" />
          <rect x="240" y="950" width="20" height="50" fill="#000000" />
        </g>

        {/* Right side trees */}
        <g opacity="1">
          {/* Tree 4 */}
          <polygon points="950,950 930,850 970,850" fill="#000000" />
          <rect x="945" y="950" width="10" height="50" fill="#000000" />

          {/* Tree 5 */}
          <polygon points="850,950 820,820 880,820" fill="#000000" />
          <rect x="840" y="950" width="20" height="50" fill="#000000" />

          {/* Tree 6 */}
          <polygon points="750,950 710,880 790,880" fill="#000000" />
          <rect x="740" y="950" width="20" height="50" fill="#000000" />
        </g>
      </svg>
    </div>
  );
}