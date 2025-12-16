import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==================== 1. ORIGINAL STYLES & FONTS ====================
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Pacifico&family=Satisfy&display=swap');
  
  .handwritten { font-family: 'Dancing Script', cursive; }
  .whimsical { font-family: 'Pacifico', cursive; }
  .elegant { font-family: 'Satisfy', cursive; }
  
  .shimmer-text {
    background: linear-gradient(90deg, #fff 0%, #ffd700 50%, #fff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }
  
  @keyframes shimmer {
    to { background-position: 200% center; }
  }
`;
document.head.appendChild(style);

// ==================== 2. UTILITY ====================
const useRandomItems = (count, generator, deps = []) =>
  useMemo(() => Array.from({ length: count }, (_, i) => generator(i)), [count, ...deps]);

// ==================== 3. REFINED VISUAL COMPONENTS ====================

const Fireflies = ({ count = 25 }) => {
  const fireflies = useRandomItems(count, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    // Smaller, more random movement for a subtler effect
    x: Math.random() * 80 - 40, 
    y: Math.random() * 80 - 40,
    duration: Math.random() * 5 + 4, // Slower flicker
    delay: Math.random() * 4
  }), [count]);

  return (
    <>
      {fireflies.map((f, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full shadow-[0_0_10px_3px_rgba(255,255,100,0.9)]"
          style={{ left: `${f.left}%`, top: `${f.top}%` }}
          animate={{
            x: [0, f.x, 0],
            y: [0, f.y, 0],
            opacity: [0.2, 0.9, 0.3, 0.9, 0.2],
            scale: [0.5, 1.5, 1, 1.5, 0.5] // More pronounced scaling
          }}
          transition={{ duration: f.duration, repeat: Infinity, delay: f.delay, ease: "easeInOut" }}
        />
      ))}
    </>
  );
};

const Butterflies = ({ count = 8 }) => {
  const butterflies = useRandomItems(count, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    // Larger movement range
    x: Math.random() * 300 - 150, 
    y: Math.random() * 300 - 150,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5
  }), [count]);

  return (
    <>
      {butterflies.map((b, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl" // Slightly larger emoji
          style={{ left: `${b.left}%`, top: `${b.top}%` }}
          animate={{ 
            x: [0, b.x, 0], 
            y: [0, b.y, 0], 
            rotate: [0, 360],
            scale: [1, 1.2, 1] // Added scale animation
          }}
          transition={{ 
            duration: b.duration, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: b.delay 
          }}
        >
          🦋
        </motion.div>
      ))}
    </>
  );
};

const FallingPetals = ({ count = 40 }) => { // Increased count for better effect
  const petals = useRandomItems(count, () => ({
    left: Math.random() * 100,
    x: Math.random() * 120 - 60, // Wider drift
    rotate: Math.random() * 720 - 360,
    duration: Math.random() * 10 + 7, // Slightly longer duration
    delay: Math.random() * 6,
    scale: Math.random() * 0.5 + 0.5, // Random scale
    emoji: ['🌸', '🌺', '💮', '🏵️'][Math.floor(Math.random() * 4)]
  }), [count]);

  return (
    <>
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{ left: `${p.left}%`, top: '-5%', scale: p.scale }} // Apply initial scale
          animate={{
            y: ['0vh', '110vh'],
            x: [0, p.x],
            rotate: [0, p.rotate],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </>
  );
};

const LightRays = () => (
  <>
    {[...Array(8)].map((_, i) => ( // Increased ray count
      <motion.div
        key={i}
        className="absolute top-0 w-2 h-full origin-top" // Wider rays
        style={{
          left: `${10 + i * 10}%`, // Adjusted spacing
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, transparent 100%)', // Brighter gradient
          transformOrigin: 'top',
          transform: `rotate(${i * 5 - 18}deg)` // Adjusted rotation
        }}
        animate={{ opacity: [0.2, 0.5, 0.2], scaleY: [0.8, 1.2, 0.8] }} // More noticeable pulse
        transition={{ duration: 5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
      />
    ))}
  </>
);

const DustMotes = ({ count = 50 }) => { // Increased count
  const motes = useRandomItems(count, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    y: Math.random() * 60 - 30,
    x: Math.random() * 40 - 20,
    duration: Math.random() * 7 + 5,
    delay: Math.random() * 4
  }), [count]);

  return (
    <>
      {motes.map((m, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white/60 rounded-full" // Brighter motes
          style={{ left: `${m.left}%`, top: `${m.top}%` }}
          animate={{ y: [0, m.y, 0], x: [0, m.x, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: m.duration, repeat: Infinity, delay: m.delay, ease: "easeInOut" }}
        />
      ))}
    </>
  );
};

const Vignette = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{ background: 'radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(0,0,0,0.5) 100%)' }} // Slightly stronger vignette
  />
);

const LensFlare = ({ x = 30, y = 20 }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Main Flare */}
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`, top: `${y}%`, width: '300px', height: '300px', // Larger
        background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 40%, transparent 80%)',
        filter: 'blur(30px)' // More blur
      }}
      animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.3, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Inner/Warmer Glow */}
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x + 5}%`, top: `${y + 5}%`, width: '150px', height: '150px',
        background: 'radial-gradient(circle, rgba(255,255,200,0.4) 0%, transparent 80%)',
        filter: 'blur(15px)'
      }}
      animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.2, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
    />
  </div>
);

// ==================== 4. SCENE BACKGROUNDS ====================

const CastleBackground = () => {
  const clouds = useRandomItems(10, () => ({ // Increased clouds
    width: Math.random() * 250 + 150,
    height: Math.random() * 80 + 50,
    left: Math.random() * 100,
    top: Math.random() * 50,
    duration: Math.random() * 25 + 20 // Slower movement
  }));

  const windows = useRandomItems(12, (_, i) => ({ // Increased windows
    left: 15 + (i % 4) * 25,
    top: 25 + Math.floor(i / 4) * 20,
    duration: Math.random() * 2 + 1,
    delay: Math.random()
  }));

  const sparkles = useRandomItems(40, () => ({ // Increased sparkles
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 3
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-pink-600 to-orange-500"> {/* Stronger colors */}
        <LightRays />
        <DustMotes count={50} />
        <Fireflies count={25} />
        <Butterflies count={10} />

        {clouds.map((cloud, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/30 rounded-full" // Brighter clouds
            style={{ width: `${cloud.width}px`, height: `${cloud.height}px`, left: `${cloud.left}%`, top: `${cloud.top}%` }}
            animate={{ x: [0, 150, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: cloud.duration, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* Castle Refined - Using a central container to ensure cohesion */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-96 z-10"> 
        {/* Left Turret */}
        <div className="absolute bottom-0 left-0 w-32 h-full bg-gradient-to-b from-purple-800 to-purple-950 shadow-lg">
           {/* Turret Cap */}
           <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: '64px solid transparent', borderRight: '64px solid transparent', borderBottom: '64px solid rgb(88, 28, 135)' }} />
           <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: '62px solid transparent', borderRight: '62px solid transparent', borderBottom: '62px solid rgb(155, 89, 182)' }} />
        </div>

        {/* Right Turret */}
        <div className="absolute bottom-0 right-0 w-32 h-full bg-gradient-to-b from-purple-800 to-purple-950 shadow-lg">
          {/* Turret Cap */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: '64px solid transparent', borderRight: '64px solid transparent', borderBottom: '64px solid rgb(88, 28, 135)' }} />
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: '62px solid transparent', borderRight: '62px solid transparent', borderBottom: '62px solid rgb(155, 89, 182)' }} />
        </div>
        
        {/* Central Base (Higher Z-index to overlap turrets for connected look) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[450px] h-80 bg-gradient-to-b from-purple-700 to-purple-900 rounded-t-xl shadow-inner shadow-black/50 z-20"> 
            {windows.map((window, i) => ( 
              <motion.div
                key={i}
                className="absolute w-8 h-12 bg-yellow-300/90 rounded-t-sm"
                style={{ left: `${window.left}%`, top: `${window.top}%` }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: window.duration, repeat: Infinity, delay: window.delay }}
              />
            ))}
            {/* Main Turret Cap (on Central Base) */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: '70px solid transparent', borderRight: '70px solid transparent', borderBottom: '70px solid rgb(88, 28, 135)' }} />
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: '68px solid transparent', borderRight: '68px solid transparent', borderBottom: '68px solid rgb(155, 89, 182)' }} />
        </div>
      </div>
      
      {/* Ground layer (full width, highest Z) */}
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-b from-purple-950 to-black z-30" />

      {sparkles.map((sparkle, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{ left: `${sparkle.left}%`, top: `${sparkle.top}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: sparkle.duration, repeat: Infinity, delay: sparkle.delay }}
        >
          ✨
        </motion.div>
      ))}
      <Vignette />
      <LensFlare x={70} y={15} />
    </div>
  );
};

const DimRoomBackground = () => {
  const glows = useRandomItems(8, (_, i) => ({ // Increased glows
    left: 10 + i * 12,
    top: 15 + (i % 3) * 30,
    duration: 3 + Math.random(),
    delay: Math.random()
  }));

  const embers = useRandomItems(50, () => ({ // Increased embers
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 5 + 4,
    delay: Math.random() * 3
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-purple-950 to-black">
        <Fireflies count={40} />
        <DustMotes count={70} />

        {glows.map((glow, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: '250px', height: '250px', // Larger glow
              background: 'radial-gradient(circle, rgba(255,140,0,0.4) 0%, transparent 70%)', // Orange/Amber glow
              left: `${glow.left}%`, top: `${glow.top}%`,
            }}
            animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.15, 1] }}
            transition={{ duration: glow.duration, repeat: Infinity, delay: glow.delay }}
          />
        ))}

        {embers.map((ember, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-red-400 rounded-full shadow-[0_0_8px_red]" // Redder, more pronounced embers
            style={{ left: `${ember.left}%`, top: `${ember.top}%` }}
            animate={{ y: [0, -150, 0], opacity: [0, 1, 0] }}
            transition={{ duration: ember.duration, repeat: Infinity, delay: ember.delay }}
          />
        ))}
      </div>
      <Vignette />
      <LensFlare x={20} y={30} />
    </div>
  );
};

// ==================== 5. DATA & HELPERS ====================

const quizQuestions = [
    {
      id: 1,
      question: "Pick a mystical artifact that calls to you...",
      options: [
        { text: "🔮 Crystal Ball", value: "intuitive", label: "Intuitive & Wise" },
        { text: "📖 Ancient Spell Book", value: "curious", label: "Curious & Intelligent" },
        { text: "🗝️ Skeleton Key", value: "bold", label: "Adventurous & Bold" }
      ]
    },
    {
      id: 2,
      question: "Choose your ideal mysterious setting...",
      options: [
        { text: "🏰 Abandoned Castle", value: "castle", label: "At Twilight" },
        { text: "🌲 Enchanted Forest", value: "forest", label: "Under Moonlight" },
        { text: "🏛️ Ancient Library", value: "library", label: "With Secret Passages" }
      ]
    },
    {
      id: 3,
      question: "What speaks to your soul?",
      options: [
        { text: "☁️ Dreamy Clouds", value: "peaceful", label: "& Soft Rain" },
        { text: "⭐ Starry Night", value: "cosmic", label: "& Cosmic Wonder" },
        { text: "🌸 Cherry Blossoms", value: "gentle", label: "& Gentle Breeze" }
      ]
    }
  ];
  
const memories = [
  { id: 1, position: { x: 15, y: 25 }, title: "Panchayat Days", content: "We watching Panchayat together mast weather e and getting immersed into the simple village life in the story. I genuinely loved our panchayat days." },
  { id: 2, position: { x: 75, y: 35 }, title: "Local Biriyani Explore", content: "The time we went to Taqwa Biriyani House to try local tehari and beef kacchi. It was chaotic but memorable!" },
  { id: 3, position: { x: 45, y: 15 }, title: "Rajbari Rice Bowls", content: "Mexican Lal-lal fried rice with bbq chicken after trying Chamichi's best drink with golden pearls and pudding. A feast for the ages." },
  { id: 4, position: { x: 85, y: 65 }, title: "Maggi & Canteen Zeher", content: "Tomar bashar maggi and nsu canteen er zeher marka khabar diye daily lunch kora." },
  { id: 5, position: { x: 25, y: 70 }, title: "Jhalmuri to Fuchka", content: "Bashay jete giye Jhalmuri, Fuchka, momos and what not try korte korte dily daly kore kore bashay jawa." },
  { id: 6, position: { x: 60, y: 80 }, title: "Chamichi & Chillox", content: "The day we tried Chamichi and then Chillox e giye had our traditional chillox deep talk with zeher marka smashed burgers." },
  { id: 7, position: { x: 50, y: 45 }, title: "Muhammad's Birthday", content: "The day we spent during my birthday... you surprised me with such amazing gifts and of course burger lab offer ta (which was as usual a very nice meal)." },
  { id: 8, position: { x: 30, y: 50 }, title: "Full Paglami Day", content: "The day we were on full paglami, tomar bashar tehari kheye then paglaye gesilam duijon pore ja ta canteen theke tule khaisi." },
  { id: 9, position: { x: 70, y: 20 }, title: "Pharmafest Photo Day", content: "Pharmafest photo session day, full day onek chetso tumi amar upor... then Sadik er biyer kacchi khelam amra." },
  { id: 10, position: { x: 40, y: 60 }, title: "Shakespeare walked...", content: "Shakespeare walked so Saima could run: 'Jei Basha gula baire diye shundor shegula bhitor diye shundor na.' Pure poetry." },
  { id: 11, position: { x: 65, y: 55 }, title: "Sultan's Dine", content: "Best kacchi in Dhaka did not hit that well that day. But the company was 10/10." },
  { id: 12, position: { x: 20, y: 40 }, title: "World Politics to Life", content: "Nijeder lives theke shuru kore world politics porjonto duniyar joto diverse topic possible chilo shob kichu niye ekjon arekjon er viewpoints nisi." },
  { id: 13, position: { x: 80, y: 50 }, title: "Last Star...", content: "Bhai amader everyday e ekhane list kora jabe so I am tired baki gula list korte lazy lagche. Ato good memories je ei pura page hoito bhore jabe thak na dei aar." },
];

const MusicPlayer = () => {
    const [playing, setPlaying] = useState(false);
    const audioSrc = "src/Heavenly - Aakash Gandhi.mp3"; 
    const audioRef = useRef(new Audio(audioSrc));
  
    useEffect(() => {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
      // Handle the initial play attempt, often restricted by browsers without user interaction
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
          playPromise.catch(() => {
              // Playing failed (likely due to auto-play restrictions). Set playing to false.
              setPlaying(false);
          });
      }
      return () => { audioRef.current.pause(); };
    }, []);
  
    const toggle = () => {
      if (playing) { audioRef.current.pause(); } else { audioRef.current.play().catch(e => console.log(e)); }
      setPlaying(!playing);
    };
  
    return (
      <button onClick={toggle} className="fixed top-4 right-4 z-[100] bg-white/30 backdrop-blur-md p-4 rounded-full hover:bg-white/50 transition-all shadow-xl border border-white/50">
        {playing ? "🔊" : "🔇"}
      </button>
    );
};

const Character = ({ costume, dialogue }) => {
    const costumeEmojis = { mystic: "🧙‍♂️", astronaut: "👨‍🚀", party: "🥳" };
    return (
      <motion.div className="flex flex-col items-center mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
        <motion.div className="text-8xl md:text-9xl mb-6" animate={{ y: [0, -15, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
          {costumeEmojis[costume]}
        </motion.div>
        {dialogue && (
          <motion.div className="bg-white/95 backdrop-blur-sm rounded-3xl p-7 max-w-lg shadow-2xl border-4 border-purple-400">
            <p className="text-gray-800 text-lg md:text-xl text-center font-medium elegant">{dialogue}</p>
          </motion.div>
        )}
      </motion.div>
    );
  };

// ==================== 6. ACT 2 SCENE (Memory Map) - BOUNCING ANIMATION REMOVED & TITLE FIXED ====================

const MemoryStar = ({ memory }) => {
    const [hover, setHover] = useState(false);
    return (
      <motion.div
        className="absolute cursor-pointer text-xl"
        style={{ left: `${memory.position.x}%`, top: `${memory.position.y}%` }}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        initial={{ scale: 0.5, opacity: 0 }} // New initial state for appearance
        animate={{ scale: 1, opacity: 1 }}  // New static end state
        transition={{ duration: 1.5, ease: "easeOut", delay: memory.id * 0.2 + 1 }}
      >
        <div className="text-5xl">⭐</div>
        <AnimatePresence>
          {hover && (
            <motion.div
              className="absolute z-50 p-5 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border-4 border-yellow-400 w-72 -translate-x-1/2"
              initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7, rotate: 5 }}
              transition={{ duration: 0.3 }}
              style={{
                left: '50%',
                top: memory.position.y > 50 ? '-140px' : '50px' // Adjusted position for hover card
              }}
            >
              <h4 className="font-bold text-gray-900 elegant text-xl mb-2">{memory.title}</h4>
              <p className="text-gray-700 text-sm handwritten">{memory.content}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

const Act2Scene = ({ setCurrentAct }) => {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-indigo-900 via-gray-950 to-black">
        <div className="absolute inset-0 z-0 opacity-60">
            <Fireflies count={50} />
            <DustMotes count={100} />
            <LensFlare x={10} y={10} />
            <Vignette />
        </div>
        <motion.div className="relative z-10 text-center w-full max-w-5xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {/* Title Text fix: Used responsive font sizes */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 whimsical shimmer-text whitespace-normal">A Map of Shared Stars</h1>
          <p className="text-2xl text-purple-300 elegant mb-16">Every star marks a cherished moment in our 3 years.</p>
          
          <div className="relative w-full h-[65vh] border-8 border-white/20 rounded-3xl bg-black/70 shadow-2xl shadow-purple-900/50">
            {memories.map((memory) => (
              <MemoryStar key={memory.id} memory={memory} />
            ))}
          </div>

          <motion.button
            className="mt-16 bg-gradient-to-r from-pink-600 to-red-600 text-white px-12 py-5 rounded-full text-2xl font-bold shadow-2xl shadow-pink-900/70"
            whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(236, 72, 153, 0.9)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentAct("act3")}
          >
            Light the Final Candle 🎂
          </motion.button>
        </motion.div>
      </div>
    );
};

// ==================== 7. THE SAIMA CONSTELLATION COMPONENT - ANIMATION DELAY INCREASED ====================

const SAIMA_CONSTELLATION_POINTS = [
    // S
    { x: 10, y: 30 }, { x: 20, y: 15 }, { x: 30, y: 30 }, { x: 20, y: 45 }, { x: 10, y: 60 },
    // A
    { x: 35, y: 60 }, { x: 45, y: 15 }, { x: 55, y: 60 }, { x: 40, y: 40 }, { x: 50, y: 40 },
    // I
    { x: 65, y: 15 }, { x: 65, y: 60 },
    // M
    { x: 75, y: 60 }, { x: 75, y: 15 }, { x: 85, y: 40 }, { x: 95, y: 15 }, { x: 95, y: 60 },
];

const SAIMA_CONSTELLATION_LINES = [
    // S (Points 0-4)
    { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 },
    // A (Points 5-9)
    { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 8, to: 9 },
    // I (Points 10-11)
    { from: 10, to: 11 },
    // M (Points 12-16)
    { from: 12, to: 13 }, { from: 13, to: 14 }, { from: 14, to: 15 }, { from: 15, to: 16 }
];

const ConstellationDisplay = ({ points, lines }) => {
    const containerRef = useRef(null);
    const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  
    useEffect(() => {
      const updateSize = () => {
        if (containerRef.current) {
          setSvgSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight
          });
        }
      };
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }, []);
  
    const getPos = useCallback((point) => ({
      x: (point.x / 100) * svgSize.width,
      y: (point.y / 100) * svgSize.height
    }), [svgSize]);
  
    return (
      <div ref={containerRef} className="relative w-full max-w-4xl h-[350px] md:h-[500px] mx-auto mt-12">
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}>
          <defs>
            <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "rgb(255,255,255)", stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: "rgb(255,215,0)", stopOpacity: 1 }} />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
          </defs>

          {lines.map((line, i) => {
            const start = getPos(points[line.from]);
            const end = getPos(points[line.to]);
            const strokeDashLength = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

            return (
              <motion.line
                key={i}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="url(#constellation-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
                strokeDasharray={strokeDashLength}
                initial={{ strokeDashoffset: strokeDashLength }}
                animate={{ strokeDashoffset: 0 }}
                // Increased duration and delay for a more noticeable appearance
                transition={{ duration: 2.0, delay: 2 + i * 0.5 }} 
              />
            );
          })}
        </svg>
        
        {points.map((point, i) => {
          const pos = getPos(point);
          return (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_3px_gold] z-10" // Larger, brighter stars
              style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ type: 'spring', damping: 10, stiffness: 100, delay: i * 0.1 }}
            />
          );
        })}
      </div>
    );
};

// ==================== 8. RESTORED 3D CAKE (WITH LOGIC FIX) ====================
const Cake = ({ litCandles, setLitCandles, blowDetected, onAllBlown }) => {
    const total = 10;
    const [hasTriggered, setHasTriggered] = useState(false);
  
    useEffect(() => {
      if (litCandles.length === total && !hasTriggered) {
        setHasTriggered(true);
        onAllBlown();
      }
    }, [litCandles.length, onAllBlown, total, hasTriggered]);
  
    useEffect(() => {
      if (blowDetected && litCandles.length < total) {
        // Blow out a random unlit candle
        const unlit = Array.from({ length: total }, (_, i) => i).filter(i => !litCandles.includes(i));
        if (unlit.length > 0) {
            const randomIndex = unlit[Math.floor(Math.random() * unlit.length)];
            setLitCandles(p => [...p, randomIndex]);
        }
      }
    }, [blowDetected, setLitCandles, total, litCandles]);
  
    return (
      <div className="relative w-full max-w-2xl mx-auto mt-12 mb-8">
        {/* Cake Base/Plate */}
        <div className="absolute inset-x-0 bottom-0 mx-auto w-96 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full shadow-2xl shadow-black/50"
          style={{ transform: 'perspective(400px) rotateX(65deg)' }} />
  
        <div className="relative mx-auto w-80 h-96">
          {/* Cake Layers */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-72 h-32 bg-gradient-to-b from-amber-800 to-amber-900 rounded-3xl shadow-2xl border-4 border-amber-900" />
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-64 h-28 bg-gradient-to-b from-amber-700 to-amber-800 rounded-3xl shadow-2xl border-4 border-amber-800" />
          <div className="absolute bottom-44 left-1/2 -translate-x-1/2 w-56 h-24 bg-gradient-to-b from-amber-600 to-amber-700 rounded-3xl shadow-2xl border-4 border-amber-700" />
  
          {/* Frosting Swirls */}
          <div className="absolute bottom-52 left-1/2 -translate-x-1/2 w-60 h-16 bg-gradient-to-b from-pink-200 via-pink-100 to-white rounded-full shadow-inner overflow-visible">
            <div className="absolute -bottom-6 left-8 w-8 h-12 bg-gradient-to-b from-pink-100 to-pink-200 rounded-b-full" style={{ clipPath: 'ellipse(50% 80% at 50% 20%)' }} />
            <div className="absolute -bottom-8 left-24 w-10 h-14 bg-gradient-to-b from-pink-100 to-pink-200 rounded-b-full" style={{ clipPath: 'ellipse(50% 80% at 50% 20%)' }} />
            <div className="absolute -bottom-6 right-8 w-8 h-12 bg-gradient-to-b from-pink-100 to-pink-200 rounded-b-full" style={{ clipPath: 'ellipse(50% 80% at 50% 20%)' }} />
          </div>
  
          {/* Decorative Cherries/Dots */}
          <div className="absolute bottom-44 left-1/2 -translate-x-1/2 w-56 flex justify-around px-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-6 h-6 bg-red-600 rounded-full shadow-md shadow-red-900/50" />
            ))}
          </div>
  
          {/* Candles (Layer 1) */}
          <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute bottom-64 left-1/2 -translate-x-1/2 w-64 h-20 pointer-events-auto">
              {[0, 1, 2, 3, 4].map((i) => {
                const variation = [
                  { y: [0, -4, 0], duration: 1.8 }, { y: [0, -3, 0], duration: 2.1 }, { y: [0, -5, 0], duration: 1.9 }, { y: [0, -3.5, 0], duration: 2.3 }, { y: [0, -4.5, 0], duration: 1.7 }
                ][i];
                return (
                  <motion.div
                    key={i}
                    className="absolute cursor-pointer"
                    style={{ left: `${i * 18 + 10.5}%`, top: '8px' }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => !litCandles.includes(i) && setLitCandles((p) => [...p, i])}
                  >
                    <div className={`w-4 h-16 rounded-lg shadow-lg relative transition-all duration-500 ${litCandles.includes(i) ? "bg-gradient-to-b from-gray-500 to-gray-700" : "bg-gradient-to-b from-red-500 via-pink-600 to-red-700"}`}>
                      {!litCandles.includes(i) && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gray-900" />
                      )}
                      {!litCandles.includes(i) && (
                        <motion.div
                          className="absolute -top-8 left-1/2"
                          style={{ x: '-50%' }}
                          animate={{ scale: [1, 1.2, 1], y: variation.y }}
                          transition={{ duration: variation.duration, repeat: Infinity }}
                        >
                          <div className="relative w-4 h-8">
                            <div className="absolute inset-0 bg-orange-500 rounded-full blur-sm opacity-80 shadow-[0_0_10px_yellow]" />
                            <div className="absolute inset-0.5 bg-gradient-to-t from-orange-600 via-yellow-500 to-yellow-300 rounded-full" />
                          </div>
                        </motion.div>
                      )}
                       {litCandles.includes(i) && (
                        <motion.div className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl opacity-70" initial={{ y: 0, opacity: 0.7 }} animate={{ y: -60, opacity: 0 }} transition={{ duration: 2 }}>💨</motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
              {/* Candles (Layer 2) */}
              {[5, 6, 7, 8, 9].map((i) => {
                 const variation = [
                  { y: [0, -3.5, 0], duration: 2.2 }, { y: [0, -4, 0], duration: 1.8 }, { y: [0, -3, 0], duration: 2.0 }, { y: [0, -4.5, 0], duration: 1.9 }, { y: [0, -3.5, 0], duration: 2.1 }
                ][i - 5];
                return (
                  <motion.div
                    key={i}
                    className="absolute cursor-pointer"
                    style={{ left: `${(i - 5) * 18 + 19.5}%`, top: '35px' }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => !litCandles.includes(i) && setLitCandles((p) => [...p, i])}
                  >
                    <div className={`w-4 h-16 rounded-lg shadow-lg relative transition-all duration-500 ${litCandles.includes(i) ? "bg-gradient-to-b from-gray-500 to-gray-700" : "bg-gradient-to-b from-red-500 via-pink-600 to-red-700"}`}>
                       {!litCandles.includes(i) && <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gray-900" />}
                       {!litCandles.includes(i) && (
                        <motion.div className="absolute -top-8 left-1/2" style={{ x: '-50%' }} animate={{ scale: [1, 1.2, 1], y: variation.y }} transition={{ duration: variation.duration, repeat: Infinity }}>
                          <div className="relative w-4 h-8">
                            <div className="absolute inset-0 bg-orange-500 rounded-full blur-sm opacity-80 shadow-[0_0_10px_yellow]" />
                            <div className="absolute inset-0.5 bg-gradient-to-t from-orange-600 via-yellow-500 to-yellow-300 rounded-full" />
                          </div>
                        </motion.div>
                      )}
                       {litCandles.includes(i) && (
                        <motion.div className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl opacity-70" initial={{ y: 0, opacity: 0.7 }} animate={{ y: -60, opacity: 0 }} transition={{ duration: 2 }}>💨</motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

// ==================== 9. ACT 3 SCENE - LETTER TRANSITION ADDED ====================
const Act3Scene = () => {
    const [litCandles, setLitCandles] = useState([]);
    const [blowDetected, setBlowDetected] = useState(false);
    // Added 'letterTransition' step
    const [step, setStep] = useState('cake'); // cake -> letterTransition -> letter -> fireworks -> constellation
    
    // Microphone Logic (unchanged)
    useEffect(() => {
      if (step !== 'cake') return;
      let audioContext, analyser, microphone, javascriptNode;
      const startListening = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          analyser = audioContext.createAnalyser();
          microphone = audioContext.createMediaStreamSource(stream);
          javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 1024;
          microphone.connect(analyser);
          analyser.connect(javascriptNode);
          javascriptNode.connect(audioContext.destination);
          javascriptNode.onaudioprocess = () => {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            let values = 0;
            const length = array.length;
            for (let i = 0; i < length; i++) values += array[i];
            if (values / length > 80) {
              setBlowDetected(true);
              setTimeout(() => setBlowDetected(false), 1000);
            }
          };
        } catch (err) { console.log("Mic access denied"); }
      };
      startListening();
      return () => { if (microphone) microphone.disconnect(); if (javascriptNode) javascriptNode.disconnect(); if (audioContext) audioContext.close(); };
    }, [step]);
  
    const handleAllBlown = useCallback(() => {
      if (step === 'cake') {
        // Transition to the new intermediate state
        setTimeout(() => setStep('letterTransition'), 1500); 
      }
    }, [step]);
  
    return (
      // Background for a deep, dark night sky for the constellation
      <div className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-black via-gray-950 to-indigo-950">
        <Fireflies count={15} />
        <AnimatePresence mode="wait">
          
          {step === 'cake' && (
            <motion.div key="cake-scene" className="w-full max-w-4xl flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }}>
               {/* Title Text fix: Used responsive font sizes */}
               <motion.h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-center mb-10 shimmer-text whimsical whitespace-normal" animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
                Happy Birthday Angry Bird! 😤
              </motion.h1>
              <p className="text-2xl text-pink-300 mb-6 elegant">Make a wish and blow out the candles (or tap them)!</p>
              <Cake litCandles={litCandles} setLitCandles={setLitCandles} blowDetected={blowDetected} onAllBlown={handleAllBlown} />
              <p className="text-sm text-white/50 mt-4">(Try blowing into your microphone!)</p>
            </motion.div>
          )}

          {/* NEW INTERMEDIATE TRANSITION STEP */}
          {step === 'letterTransition' && (
            <motion.div 
                key="letter-transition" 
                className="text-center relative z-50 p-10 bg-black/70 rounded-2xl shadow-2xl border-4 border-purple-500"
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.8 }} 
                transition={{ duration: 0.5 }}
                // Auto-transition to the letter after 2.5 seconds
                onAnimationComplete={() => setTimeout(() => setStep('letter'), 2500)} 
            >
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 elegant">
                  Muhammad Hands You a Letter 💌
                </h2>
                <p className="text-xl text-pink-300">A personal message awaits...</p>
            </motion.div>
          )}

          {step === 'letter' && (
            <motion.div key="letter-scene" className="w-full max-w-4xl bg-white/95 backdrop-blur-xl text-gray-800 rounded-3xl p-10 md:p-14 shadow-2xl border-4 border-purple-400 relative" initial={{ opacity: 0, y: 100, rotate: 3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: -100 }} transition={{ duration: 0.8 }}>
              <motion.div 
                className="text-gray-800 text-lg md:text-xl leading-relaxed space-y-6 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-200 handwritten"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <p className="text-justify leading-loose">Happy Saima Day!!! Happy Birthday to the prettiest girl in the entire world. Your beauty doesn't limit just to your outer appearance but to your inner beauty as well. The kindest, softest and the purest heart a normal human being can possibly have. The prettiest soul I have ever come across and a genuine true to heart person. In short bolte gele tomar bairer beauty jodi Miss World hoi tomar inner beauty Miss Universe.</p>
                <p className="text-justify leading-loose">Thank you so much for bringing colours to my dull world 3 years ago. You cannot possibly imagine the respect I have for you. Your guts, your moral principles, your understanding of the world, your beliefs, your talent, all of it amazes me everyday.</p>
                <p className="text-justify leading-loose">It's true our university days are soon coming to end and we'll probably drift apart however Allah(SWT) has written it for us but I'll never be able to forget you Saima. I pray that Allah(SWT) guides you properly and you live the best way you have imagined yourself living. Peace, Love, Satisfaction may Allah(SWT) bless you with everything. You deserve every bit of happiness in this world.</p>
                <p className="text-justify leading-loose">We spent an unbelievably amazing time together so far and shared a bond I never thought I'll share with anyone cz I usually don't like people. We had a lifetime worth of fun in such a short time but it's fine cz even a lifetime worth of time would feel short when we are together.</p>
                <p className="font-bold text-xl md:text-2xl text-purple-900 text-center mt-8 leading-relaxed">
                  I don't think eta bolar dorkar ache but janoi toh Team Saima te keu thakuk aar na thakuk Muhammad will always be there as long as he lives.
                </p>
                <p className="italic text-base text-gray-700 text-right mt-6">P.S. ektu beshi appreciate kore felsi but I mean each and every word. Just bolar jonno boli nai.</p>
              </motion.div>
              <motion.button 
                className="mt-10 w-full bg-gradient-to-r from-purple-700 to-pink-700 text-white py-5 rounded-xl font-bold text-2xl shadow-lg hover:scale-[1.02] transition-transform" 
                onClick={() => setStep('fireworks')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Seal this Memory ✨
              </motion.button>
            </motion.div>
          )}

          {step === 'fireworks' && (
            <motion.div key="fireworks-scene" className="text-center relative z-50" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <FallingPetals count={80} />
              <motion.div className="text-9xl mb-8" animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>🎉</motion.div>
               {/* Title Text fix: Used responsive font sizes */}
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 whimsical whitespace-normal">Let the Celebration Begin!</h1>
              <p className="text-3xl text-pink-300 elegant mb-12">Around 23 more hours of this blessed day to go!!!</p>
              <div className="flex justify-center gap-6">
                <span className="text-7xl animate-pulse">🎂</span>
                <span className="text-7xl animate-pulse delay-75">🎁</span>
                <span className="text-7xl animate-pulse delay-150">🎈</span>
              </div>

            </motion.div>
          )}

          {step === 'constellation' && (
             <motion.div key="constellation-scene" className="text-center relative z-50 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                {/* Title Text fix: Used responsive font sizes */}
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-yellow-300 mb-8 whimsical shimmer-text whitespace-normal">The Saima Constellation</h1>
                <p className="text-2xl text-pink-300 elegant mb-12">Written in the stars, just for you.</p>
                <ConstellationDisplay points={SAIMA_CONSTELLATION_POINTS} lines={SAIMA_CONSTELLATION_LINES} />
                <p className="text-xl text-white/80 mt-16 elegant">Happy Birthday Saima. ❤️</p>
             </motion.div>
          )}

        </AnimatePresence>
      </div>
    );
  };


// ==================== 10. FIXED ACT 1 QUIZ SCENE ====================

const Act1QuizScene = ({ transitionTo }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const currentQuestion = quizQuestions[currentQuestionIndex];
  
    const handleAnswer = (value, label) => {
      setAnswers([...answers, { questionId: currentQuestion.id, value, label }]);
      
      if (currentQuestionIndex < quizQuestions.length - 1) {
        // Move to the next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // All questions answered, transition to soul reading
        setTimeout(() => {
          transitionTo("soulReading");
        }, 500); // Give time for last button animation
      }
    };
  
    // Determine the character's dialogue based on the stage
    const dialogue = currentQuestionIndex === 0 
        ? "Welcome... Let's see what the stars say about you." 
        : currentQuestionIndex === 1
        ? "Interesting choice. Now, reveal your ideal setting."
        : "The final question will illuminate your deepest yearning.";
  
    return (
        <motion.div key={`act1-q${currentQuestionIndex}`} className="min-h-screen flex flex-col items-center justify-center relative p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <DimRoomBackground />
            <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
                <Character costume="mystic" dialogue={dialogue} />
                
                <motion.div 
                    key={currentQuestion.id} 
                    className="w-full space-y-5 bg-black/40 backdrop-blur-md p-8 rounded-3xl border-2 border-purple-500/50 shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="text-3xl font-bold mb-6 text-purple-300 elegant text-center">{currentQuestion.question}</h2>
                    {currentQuestion.options.map((opt, i) => (
                        <motion.button 
                            key={i} 
                            className="w-full bg-white/10 p-5 rounded-xl text-left hover:bg-white/20 border-2 border-white/20 backdrop-blur-md transition-all flex items-center justify-between" 
                            whileHover={{ scale: 1.02 }} 
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAnswer(opt.value, opt.label)}
                        >
                            <span className="text-3xl mr-4">{opt.text}</span>
                            <span className="text-lg font-medium opacity-90 elegant">{opt.label}</span>
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
  };
  

// ==================== 11. MAIN APP ====================
export default function App() {
  const [currentAct, setCurrentAct] = useState("entrance");
  const transitionTo = (act) => setCurrentAct(act);

  // The final Soul Reading text can now be more dynamic if needed, but for simplicity, 
  // keeping it mostly static as the focus was the quiz flow fix.
  const SoulReadingScene = ({ transitionTo }) => (
    <motion.div key="soulReading" className="min-h-screen flex flex-col items-center justify-center relative p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <DimRoomBackground />
        <motion.div 
            className="relative z-10 max-w-2xl bg-black/50 backdrop-blur-md p-12 rounded-3xl border-4 border-purple-500/80 text-center shadow-3xl shadow-purple-900/70"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 50 }}
        >
             {/* Title Text fix: Used responsive font sizes */}
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-yellow-300 whimsical shimmer-text whitespace-normal">Soul Reading Complete!</h2>
            <p className="text-2xl leading-relaxed mb-10 elegant text-white/90">
                Saima, your spirit shines with a rare combination of depth and lightness. 
                You possess an intuitive understanding of the mysteries around you, 
                yet maintain a gentle, caring heart. You seek **Cosmic Wonder** in an 
                **Enchanted Forest**—a truly magical soul!
            </p>
            <motion.button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-4 rounded-full text-xl font-bold shadow-lg shadow-pink-900/50" 
                onClick={() => transitionTo("act2")}
                whileHover={{ scale: 1.1, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
            >
                Unfold the Next Chapter ✨
            </motion.button>
        </motion.div>
    </motion.div>
  );

  return (
    <div className="font-sans text-white">
      <MusicPlayer />
      <AnimatePresence mode="wait">
        {currentAct === "entrance" && (
          <motion.div key="entrance" className="min-h-screen flex flex-col items-center justify-center p-4 text-center relative" exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <CastleBackground />
            <div className="relative z-40">
              <motion.h1 className="text-7xl md:text-9xl font-bold mb-10 shimmer-text whimsical" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 100, delay: 0.5 }}>✨ Saima ✨</motion.h1>
              <motion.button 
                className="bg-white text-purple-900 px-16 py-5 rounded-full text-2xl font-bold shadow-2xl shadow-purple-900/50 hover:bg-purple-100" 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => transitionTo("act1")}
              >
                Enter the Castle 🏰
              </motion.button>
            </div>
          </motion.div>
        )}
        {currentAct === "act1" && (
          <Act1QuizScene key="act1" transitionTo={transitionTo} />
        )}
        {currentAct === "soulReading" && (
          <SoulReadingScene key="soulReading" transitionTo={transitionTo} />
        )}
        {currentAct === "act2" && (
          <motion.div key="act2" exit={{ opacity: 0 }}>
            <Act2Scene setCurrentAct={transitionTo} />
          </motion.div>
        )}
        {currentAct === "act3" && (
          <motion.div key="act3" exit={{ opacity: 0 }}>
            <Act3Scene />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}