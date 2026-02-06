import { Heart, Sparkles } from "lucide-react";

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 12}s`,
    duration: `${15 + Math.random() * 10}s`,
    size: 14 + Math.random() * 20,
    opacity: 0.15 + Math.random() * 0.25,
  }));

  const sparkles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    size: 4 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      {/* Radial glow from center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(340 70% 50% / 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-primary fill-primary/50"
          style={{
            left: heart.left,
            bottom: "-50px",
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
            animation: `float-up ${heart.duration} ease-in-out infinite`,
            animationDelay: heart.delay,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <Sparkles
          key={`sparkle-${sparkle.id}`}
          className="absolute text-accent"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            opacity: 0.4,
            animation: `sparkle 4s ease-in-out infinite`,
            animationDelay: sparkle.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;
