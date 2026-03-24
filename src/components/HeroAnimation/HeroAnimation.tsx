const HeroAnimation = () => {
  return (
    <div className="relative w-full h-[420px] flex items-center justify-center">
      {/* Globe rings */}
      <div className="absolute w-80 h-80 rounded-full border border-blue-500/20 animate-[spin_20s_linear_infinite]" />
      <div className="absolute w-64 h-64 rounded-full border border-blue-400/30 animate-[spin_15s_linear_infinite_reverse]" />
      <div className="absolute w-48 h-48 rounded-full border border-blue-300/40 animate-[spin_10s_linear_infinite]" />

      {/* Core globe */}
      <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 shadow-[0_0_60px_rgba(59,130,246,0.5)]">
        {/* Grid lines */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-400/20 overflow-hidden">
          <div className="absolute inset-0 border-t-2 border-blue-400/20 top-1/4" />
          <div className="absolute inset-0 border-t-2 border-blue-400/20 top-2/4" />
          <div className="absolute inset-0 border-t-2 border-blue-400/20 top-3/4" />
          <div className="absolute inset-0 border-l-2 border-blue-400/20 left-1/4" />
          <div className="absolute inset-0 border-l-2 border-blue-400/20 left-2/4" />
          <div className="absolute inset-0 border-l-2 border-blue-400/20 left-3/4" />
        </div>
      </div>

      {/* Orbiting dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div
          key={i}
          className="absolute w-80 h-80 animate-[spin_12s_linear_infinite]"
          style={{ animationDelay: `${i * -2}s` }}
        >
          <div
            className="absolute w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translateX(160px) translateY(-50%)`,
            }}
          />
        </div>
      ))}

      {/* Floating news labels */}
      {[
        { text: 'Technology', delay: '0s', x: '-180px', y: '-80px' },
        { text: 'Business', delay: '1s', x: '160px', y: '-100px' },
        { text: 'Science', delay: '2s', x: '-160px', y: '90px' },
        { text: 'Sports', delay: '0.5s', x: '140px', y: '80px' },
      ].map((item, i) => (
        <div
          key={i}
          className="absolute px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs animate-pulse"
          style={{
            transform: `translate(${item.x}, ${item.y})`,
            animationDelay: item.delay,
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default HeroAnimation;