import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-12-24T07:00:00.000Z'); // December 24, 2025 @ 7am GMT

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-cosmic rounded-2xl p-8 border border-cosmic/20">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-heading text-cosmic-foreground mb-2">
          🌟 The Great Anchoring
        </h3>
        <p className="text-cosmic-foreground/80 text-lg">
          December 24, 2025 @ 7:00 AM GMT
        </p>
        <p className="text-cosmic-foreground/60 text-sm mt-2">
          Join the 144,000 in global meditation
        </p>
      </div>
      
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-cosmic-foreground/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold text-cosmic-foreground font-heading">
            {timeLeft.days}
          </div>
          <div className="text-cosmic-foreground/70 text-sm uppercase tracking-wide">
            Days
          </div>
        </div>
        
        <div className="bg-cosmic-foreground/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold text-cosmic-foreground font-heading">
            {timeLeft.hours}
          </div>
          <div className="text-cosmic-foreground/70 text-sm uppercase tracking-wide">
            Hours
          </div>
        </div>
        
        <div className="bg-cosmic-foreground/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold text-cosmic-foreground font-heading">
            {timeLeft.minutes}
          </div>
          <div className="text-cosmic-foreground/70 text-sm uppercase tracking-wide">
            Minutes
          </div>
        </div>
        
        <div className="bg-cosmic-foreground/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold text-cosmic-foreground font-heading">
            {timeLeft.seconds}
          </div>
          <div className="text-cosmic-foreground/70 text-sm uppercase tracking-wide">
            Seconds
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-spectrum text-cosmic rounded-lg hover:opacity-90 transition-opacity font-medium">
          Join the 144,000
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;