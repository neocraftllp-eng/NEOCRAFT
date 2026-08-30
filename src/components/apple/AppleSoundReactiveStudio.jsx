import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Mic, Sparkles, Play, Pause, Zap, Sliders, Radio } from 'lucide-react';
import { playClickSound } from '../../audio/soundEffects';

const AUDIO_TRACKS = [
  { id: 'synthwave', name: 'Cyberpunk Synthwave 128 BPM', mood: 'High Voltage Pulse', color: '#00F0FF', pulseSpeed: 'animate-pulse' },
  { id: 'lounge', name: 'Deep House VIP Lounge 122 BPM', mood: 'Smooth Strobe', color: '#FF1493', pulseSpeed: 'animate-bounce' },
  { id: 'zen', name: 'Himalayan Ambient 60 BPM', mood: 'Calm Breathing Wave', color: '#FFD700', pulseSpeed: 'animate-pulse' }
];

export default function AppleSoundReactiveStudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(AUDIO_TRACKS[0]);
  const [customText, setCustomText] = useState('NEON RHYTHM');
  const [selectedColor, setSelectedColor] = useState('#00F0FF');
  const [strobeSensitivity, setStrobeSensitivity] = useState(80);
  const [isMicMode, setIsMicMode] = useState(false);
  const [micLevel, setMicLevel] = useState(0);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Toggle audio track playback simulation
  const handleTogglePlay = (track) => {
    playClickSound();
    if (activeTrack.id === track.id && isPlaying) {
      setIsPlaying(false);
    } else {
      setActiveTrack(track);
      setSelectedColor(track.color);
      setIsPlaying(true);
      setIsMicMode(false);
    }
  };

  // Toggle Live Microphone Input
  const handleToggleMic = async () => {
    playClickSound();
    if (isMicMode) {
      setIsMicMode(false);
      setIsPlaying(false);
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
      }
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsMicMode(true);
      setIsPlaying(true);

      const updateMic = () => {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((p, c) => p + c, 0) / dataArray.length;
        setMicLevel(avg);
        animationFrameRef.current = requestAnimationFrame(updateMic);
      };
      updateMic();
    } catch (err) {
      console.log('Mic access error, falling back to track mode:', err);
      handleTogglePlay(AUDIO_TRACKS[0]);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (micStreamRef.current) micStreamRef.current.getTracks().forEach(t => t.stop());
    };
  }, []);

  const computedGlowIntensity = isPlaying 
    ? (isMicMode ? Math.min(1.5, Math.max(0.4, micLevel / 45)) : 1.2)
    : 0.6;

  return (
    <section id="sound-reactive-section" className="py-20 md:py-28 bg-[#000000] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1140px] mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Music className="w-3.5 h-3.5" /> SOUND-REACTIVE SMART CONTROLLER
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            Light that pulses to your beat.
          </h2>
          <p className="text-sm text-[#86868b]">
            Every NEOCRAFT sign is available with an intelligent 12V acoustic driver that syncs your illumination to room music, DJ beats, or ambient voice in real-time.
          </p>
        </div>

        {/* 2-Column Split: Visual Stage on Left, Controls on Right */}
        <div className="apple-card p-6 sm:p-12 border border-[#2d2d30] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Visual Stage (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[340px] sm:min-h-[400px] rounded-3xl bg-[#08080a] border border-[#222225] relative overflow-hidden p-8">
              
              {/* Radial Glow Backdrop */}
              <div 
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${selectedColor}25 0%, transparent 70%)`,
                  opacity: isPlaying ? computedGlowIntensity : 0.2
                }}
              />

              {/* Dynamic Sound Wave Visualizer Bars */}
              <div className="flex items-end justify-center gap-1.5 h-16 mb-8">
                {[40, 75, 55, 95, 60, 85, 45, 100, 70, 90, 50, 80, 65, 95, 40].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full transition-all duration-150"
                    style={{
                      backgroundColor: selectedColor,
                      height: isPlaying ? `${Math.max(8, (h * computedGlowIntensity) % 64)}px` : '6px',
                      opacity: isPlaying ? 0.9 : 0.2
                    }}
                  />
                ))}
              </div>

              {/* The Glowing Neon Text */}
              <div
                className="text-3xl sm:text-5xl md:text-6xl font-black text-center tracking-wider transition-all duration-200"
                style={{
                  color: selectedColor,
                  textShadow: isPlaying 
                    ? `0 0 10px ${selectedColor}, 0 0 25px ${selectedColor}, 0 0 50px ${selectedColor}`
                    : `0 0 8px ${selectedColor}88`,
                  transform: isPlaying ? `scale(${1 + (computedGlowIntensity - 0.6) * 0.08})` : 'scale(1)'
                }}
              >
                {customText || 'NEON RHYTHM'}
              </div>

              {/* Live Audio Status Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#86868b]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-[#444]'}`} />
                  <span className="text-white font-mono text-[11px]">
                    {isMicMode ? 'Live Acoustic Mic Syncing' : isPlaying ? activeTrack.name : 'Paused - Select a track'}
                  </span>
                </div>

                <span className="text-[10px] text-[#2997ff] font-mono">12V Acoustic Sync Mode</span>
              </div>

            </div>

            {/* Right Interactive Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6 text-xs">
              
              {/* Text Input */}
              <div>
                <label className="font-semibold text-white block mb-1.5">Sign Text to Test:</label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                  placeholder="TYPE YOUR TEXT..."
                  className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#2997ff]"
                />
              </div>

              {/* Sample Rhythm Tracks */}
              <div className="space-y-2">
                <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
                  Select Acoustic Preset:
                </span>
                
                <div className="space-y-2">
                  {AUDIO_TRACKS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTogglePlay(t)}
                      className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                        activeTrack.id === t.id && isPlaying && !isMicMode
                          ? 'bg-[#1f1f25] border-cyan-400 text-white shadow-md'
                          : 'bg-[#121214] border-[#262629] text-[#86868b] hover:border-[#333]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {activeTrack.id === t.id && isPlaying && !isMicMode ? (
                          <Pause className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <Play className="w-4 h-4 text-white" />
                        )}
                        <div>
                          <div className="font-semibold text-white">{t.name.split(' ')[0]} {t.name.split(' ')[1]}</div>
                          <div className="text-[10px] text-[#86868b]">{t.mood}</div>
                        </div>
                      </div>

                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: t.color }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Microphone Real-Time Mode Button */}
              <button
                onClick={handleToggleMic}
                className={`w-full py-3 px-4 rounded-xl border font-semibold text-xs cursor-pointer flex items-center justify-center gap-2 transition-all ${
                  isMicMode
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg'
                    : 'bg-[#161618] border-[#2d2d30] text-white hover:border-[#444]'
                }`}
              >
                <Mic className={`w-4 h-4 ${isMicMode ? 'animate-bounce text-white' : 'text-emerald-400'}`} />
                <span>{isMicMode ? 'Acoustic Mic Active (Listening...)' : 'Enable Live Microphone Reactivity'}</span>
              </button>

              <p className="text-[10px] text-[#86868b] leading-relaxed text-center">
                *The Smart Acoustic Controller box attaches seamlessly between the 12V adapter and the sign with zero app pairing required.
              </p>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
