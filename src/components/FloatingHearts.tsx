import { Heart } from "lucide-react";

const FloatingHearts = () => {
  const hearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${12 + Math.random() * 8}s`,
    size: 12 + Math.random() * 16,
    opacity: 0.1 + Math.random() * 0.2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-romantic-rose fill-romantic-rose"
          style={{
            left: heart.left,
            bottom: "-50px",
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
            animation: `float-up ${heart.duration} ease-in-out infinite`,
            animationDelay: heart.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;
