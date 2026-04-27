import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX, X } from "lucide-react";

interface LightboxState {
  src: string;
  title?: string;
  meta?: string;
}

interface LightboxCtx {
  open: (state: LightboxState) => void;
  close: () => void;
}

const Ctx = createContext<LightboxCtx | null>(null);

export function useVideoLightbox() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useVideoLightbox must be used within VideoLightboxProvider");
  return ctx;
}

export function VideoLightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LightboxState | null>(null);

  const open = useCallback((s: LightboxState) => setState(s), []);
  const close = useCallback(() => setState(null), []);

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {state && <Lightbox state={state} onClose={close} />}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function Lightbox({ state, onClose }: { state: LightboxState; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Try to autoplay unmuted; fall back to muted on autoplay block
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    setMuted(false);
    v.play()
      .then(() => setPlaying(true))
      .catch(() => {
        v.muted = true;
        setMuted(true);
        v.play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      });
  }, [state.src]);

  // Keyboard shortcuts: Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const t = (parseFloat(e.target.value) / 100) * duration;
    v.currentTime = t;
    setCurrent(t);
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-3xl flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full md:h-[92vh] md:w-auto md:max-w-[min(92vw,calc(92vh*9/16))] aspect-[9/16] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={state.src}
          loop
          playsInline
          autoPlay
          preload="auto"
          className="w-full h-full object-contain rounded-none md:rounded-2xl bg-black cursor-pointer"
          onClick={togglePlay}
          onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        {/* Close */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 rounded-full bg-black/25 hover:bg-black/45 backdrop-blur-xl text-white/90 flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        {/* Controls bar */}
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 pointer-events-none">
          <div
            className="pointer-events-auto rounded-2xl bg-black/25 backdrop-blur-xl px-4 py-3 flex items-center gap-3 text-white"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <button
              aria-label={playing ? "Pause" : "Play"}
              onClick={togglePlay}
              className="shrink-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              {playing ? <Pause size={16} /> : <Play size={16} className="ml-[2px]" />}
            </button>

            <span className="text-xs tabular-nums text-white/80 w-10 text-right">
              {fmt(current)}
            </span>

            <div className="relative flex-1 h-1.5 group">
              <div className="absolute inset-0 rounded-full bg-white/15" />
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-white"
                style={{ width: `${progress}%` }}
              />
              <input
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={progress}
                onChange={onSeek}
                aria-label="Seek"
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
            </div>

            <span className="text-xs tabular-nums text-white/60 w-10">
              {fmt(duration)}
            </span>

            <button
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={toggleMute}
              className="shrink-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
