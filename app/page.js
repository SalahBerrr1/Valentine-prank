// app/page.js
"use client";

import { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { Heart, Gem, CheckCircle, XCircle, Fullscreen } from 'lucide-react';

export default function ValentinePage() {
  // State management
  const [showAlert, setShowAlert] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [noClicks, setNoClicks] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [noButtonText, setNoButtonText] = useState("No");
  const [showImg, setShowImg] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const containerRef = useRef(null);
  const noButtonRef = useRef(null);
  

  // No button texts for random selection
  const noButtonTexts = [
    "No", "Ah ma sm3tkch, NO?", "No mala?", 
    "Aki 7a tendmi", "Akher mo7awla"
  ];

  // Handle No button click - make it move
  const handleNoClick = () => {
    // Update click count
    const newClickCount = noClicks + 1;
    setNoClicks(newClickCount);

    if(newClickCount=== 5) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0; // Reset to start
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setShowImg(true);
      setTimeout(() => setShowImg(false), 3000);
  }
    // Change button text
    const indexText = noButtonTexts.indexOf(noButtonText) + 1;
    setNoButtonText(noButtonTexts[indexText % noButtonTexts.length]);
  };

  // Handle Yes button click - show first alert
  const handleYesClick = () => {
    setConfetti(true);
    setTimeout(() => setShowAlert(true), 500);
    
    // Stop confetti after 5 seconds
    setTimeout(() => setConfetti(false), 5000);
  };


  // Handle second question - No (correct answer)
  const handleAlertNo = () => {
    setShowAlert(false);
    setTimeout(() => {
      setShowCorrect(true);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 5000);
    }, 300);
  };

  // Close modals
  const closeModals = () => {
    setShowCorrect(false);
    setShowWrong(false);
    setConfetti(false);
    setNoClicks(0);
  };

  // Create floating hearts effect
  useEffect(() => {
    const createHeart = () => {
      const heart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 3000 + 4000,
      };
      
      setFloatingHearts(prev => [...prev, heart]);
      
      // Remove heart after animation
      setTimeout(() => {
        setFloatingHearts(prev => prev.filter(h => h.id !== heart.id));
      }, heart.duration);
    };

    // Create initial hearts
    for (let i = 0; i < 8; i++) {
      setTimeout(createHeart, i * 400);
    }

    // Keep creating hearts periodically
    const interval = setInterval(createHeart, 800);
    
    return () => clearInterval(interval);
  }, []);


  return (
  <>
    <audio ref={audioRef} preload="auto">
      <source src="/scare.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  {showImg ? (
    <div className="absolute w-full z-60 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <img src="/scare.jpg" alt="Scare" className="w-full h-full object-cover animate-pulse" />
    </div>
  ):(
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-500 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Confetti */}
      {confetti && (
        <Confetti width={typeof window !== 'undefined' ? window.innerWidth : Fullscreen.width}
          height={typeof window !== 'undefined' ? window.innerHeight : 800}
          recycle={false} numberOfPieces={200} gravity={0.1}
        />
      )}
      
      {/* Floating Hearts */}
      {floatingHearts.map(heart => (
        <div key={heart.id} className="absolute text-rose-900 z-0 pointer-events-none"
          style={{ left: `${heart.left}vw`, top: '100vh', fontSize: `${heart.size}px`, opacity: 0.7, animation: `floatUp ${heart.duration}ms linear forwards`,}}>
          <Heart size={heart.size} fill="currentColor" />
        </div>
      ))}

      {/* Main Container */}
      <main  ref={containerRef} className="relative p-6 w-full max-w-xl bg-white/30 backdrop-blur-sm rounded-3xl shadow-2xl text-center justify-center items-start z-10 overflow-hidden">
          <div className='w-full h-24 flex justify-center'>
            <img src="/ss.webp" alt="her" className="w-24 h-24 rounded-md object-cover items-center justify-center shadow-[0_0_3px_#000000]" />
            <img src="/aa.webp" alt="me" className="w-24 h-24 rounded-md object-cover shadow-[0_0_3px_#000000]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-rose-600  mb-3">
            For My Senouma</h1>
          
          <p className="text-gray-600 mb-6 md:mb-8 text-lg">
            kima t3rfy ana dimo9raty w peace👨🏻. w ha na3tik le choix tkhayri (yes✔️/ no✖️) b ra7tek, ma n'obligik 3a walo.</p>
          {/* Question Box */}
          <div className="bg-rose-50 border-2 border-dashed border-rose-200 rounded-2xl p-6">
            <p className="text-2xl md:text-3xl font-bold text-rose-700 mb-6">
              Would you be my Valentine? ❤️</p>
            
            <div className='flex flex-col sm:flex-row justify-center gap-4 md:gap-6 '>
              <button onClick={handleYesClick}
                className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
                >YES!</button>
              {noClicks<5 &&(
                <button ref={noButtonRef} onClick={handleNoClick} style={noButtonStyle}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg relative"
              >{noButtonText}</button>
              )}
              
            </div>
          </div>
      </main>

      {/* First Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-md w-full relative overflow-hidden">
            <div className="flex justify-center mb-6">
              <div className="animate-pulse">
                <Gem size={60} className="text-yellow-500" />
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-rose-600 mb-4">
              You Said YES! 💍</h2>
            
            <p className="text-gray-600 mb-2 text-lg">
              Drk 2 eme question...
            </p>
            
            <p className="text-xl font-bold text-rose-700 mb-8">
              Do you think I&apos;ll be your Valentine too?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300">
                Yes</button>
              
              <button onClick={handleAlertNo} className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300">
                No</button>
            </div>
          </div>
        </div>
      )}

      {/* Correct Answer Modal */}
      {showCorrect && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-md w-full">
            <div className="flex justify-center mb-6">
              <CheckCircle size={70} className="text-green-500" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">
              CORRECT! 🎉
            </h2>
            
            <div className="space-y-4 text-gray-700 mb-8">
              <p className="text-lg">
                Nti brk thebi tkouni valentine t3y bsh ana mn9blch,haha
              </p>
              <p className="text-lg">Just kidding, of course I&apos;ll be your Valentine! Happy Valentine&apos;s Day, my love! ❤️</p>
                <p className="text-xl font-bold text-rose-600">
                <button onClick={() => {
                  if (audioRef.current) {
                      audioRef.current.currentTime = 0; // Reset to start
                      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
                    }
                    setShowImg(true);
                    setTimeout(() => setShowImg(false), 3000);
                    closeModals();
                }} className="text-rose-500 hover:text-rose-700 font-bold transition-colors duration-300">click here 🌹</button>
              </p>
            </div>
            
            <button onClick={closeModals} className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-full shadow-lg transition-all duration-300 text-lg">
              Aww, I Love You Too!</button>
          </div>
        </div>
      )}


    </div>
  )}
  </>
);}
