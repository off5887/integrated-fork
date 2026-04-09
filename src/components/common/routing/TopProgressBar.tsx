export default function TopProgressBar() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'rgba(99,102,241,0.15)',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
          animation: 'topbar-slide 2.2s ease-in-out infinite',
          transformOrigin: 'left center',
        }}
      />
      <style>{`
        @keyframes topbar-slide {
          0%   { transform: translateX(-100%) scaleX(0.5); }
          50%  { transform: translateX(0%)    scaleX(1);   }
          100% { transform: translateX(100%)  scaleX(0.5); }
        }
      `}</style>
    </div>
  )
}
