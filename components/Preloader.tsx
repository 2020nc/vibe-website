'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className="preloader-overlay">
      <div className="preloader-cup">
        {/* Ceașcă SVG */}
        <svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Clip path pentru lichidul din ceașcă */}
          <defs>
            <clipPath id="cupClip">
              <path d="M18 40 Q16 95 20 105 Q30 118 60 118 Q90 118 100 105 Q104 95 102 40 Z" />
            </clipPath>
          </defs>

          {/* Lichidul care se umple */}
          <rect
            x="10" y="0" width="110" height="120"
            fill="#92400e"
            clipPath="url(#cupClip)"
            className="coffee-fill"
          />

          {/* Corpul ceștii */}
          <path
            d="M18 40 Q16 95 20 105 Q30 118 60 118 Q90 118 100 105 Q104 95 102 40 Z"
            stroke="white" strokeWidth="3.5" fill="none"
          />

          {/* Marginea de sus */}
          <ellipse cx="60" cy="40" rx="42" ry="8" stroke="white" strokeWidth="3.5" fill="none" />

          {/* Toarta */}
          <path
            d="M102 55 Q125 55 125 75 Q125 95 102 90"
            stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round"
          />

          {/* Farfurioara */}
          <ellipse cx="60" cy="122" rx="52" ry="7" stroke="white" strokeWidth="3" fill="none" />

          {/* Abur 1 */}
          <path d="M45 28 Q42 18 45 10 Q48 2 45 -5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" className="steam steam-1" />
          {/* Abur 2 */}
          <path d="M60 26 Q57 16 60 8 Q63 0 60 -7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" className="steam steam-2" />
          {/* Abur 3 */}
          <path d="M75 28 Q72 18 75 10 Q78 2 75 -5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" className="steam steam-3" />
        </svg>

        <p className="preloader-text">Se prepară cafeaua...</p>
      </div>

      <style>{`
        .preloader-overlay {
          position: fixed;
          inset: 0;
          background: #1a0a00;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: preloaderFadeOut 0.6s ease-out 2.8s forwards;
        }

        .preloader-cup {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        /* Umplerea cu cafea: de jos în sus, durată 2.2s */
        .coffee-fill {
          transform-origin: bottom;
          transform: scaleY(0);
          animation: fillCup 2.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
        }

        @keyframes fillCup {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }

        /* Abur */
        .steam {
          opacity: 0;
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
        }
        .steam-1 { animation: steamRise 1s ease-out 2s infinite; }
        .steam-2 { animation: steamRise 1s ease-out 2.3s infinite; }
        .steam-3 { animation: steamRise 1s ease-out 2.6s infinite; }

        @keyframes steamRise {
          0%   { opacity: 0; stroke-dashoffset: 30; }
          30%  { opacity: 1; }
          100% { opacity: 0; stroke-dashoffset: 0; }
        }

        /* Text */
        .preloader-text {
          color: rgba(255,255,255,0.7);
          font-size: 16px;
          letter-spacing: 0.1em;
          animation: textPulse 1.5s ease-in-out 0.5s infinite alternate;
        }

        @keyframes textPulse {
          from { opacity: 0.4; }
          to   { opacity: 1; }
        }

        /* Fade out overlay */
        @keyframes preloaderFadeOut {
          from { opacity: 1; pointer-events: all; }
          to   { opacity: 0; pointer-events: none; }
        }
      `}</style>
    </div>
  );
}
