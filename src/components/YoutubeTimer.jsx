import { useEffect, useState } from "react";
import {
  Pause,
  Play,
  RotateCcw,
  X,
  Timer,
} from "lucide-react";

const TOTAL = 15 * 60;

export default function YoutubeTimer({ onClose }) {
  const [seconds, setSeconds] = useState(TOTAL);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running || seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((value) => Math.max(value - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [running, seconds]);

  useEffect(() => {
    if (seconds !== 0) return;

    setRunning(false);

    try {
      const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

      if (AudioContext) {
        const context = new AudioContext();
        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.connect(gain);
        gain.connect(context.destination);

        oscillator.frequency.value = 880;
        gain.gain.value = 0.2;

        oscillator.start();

        setTimeout(() => {
          oscillator.stop();
          context.close();
        }, 700);
      }
    } catch {
      // Audio is optional.
    }
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const percentage =
    ((TOTAL - seconds) / TOTAL) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-md">
      <div className="glass w-full max-w-md rounded-[2rem] p-7 shadow-2xl">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-gold-500/10 p-3 text-gold-400">
              <Timer size={23} />
            </div>

            <div>
              <h2 className="font-bold">
                تایمر یوتیوب
              </h2>

              <p className="text-xs text-slate-500">
                محدودیت ۱۵ دقیقه‌ای
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="my-10 text-center">

          <div
            dir="ltr"
            className={`text-6xl font-black tracking-wider ${
              seconds === 0
                ? "text-gold-400"
                : "text-white"
            }`}
          >
            {String(minutes).padStart(2, "0")}:
            {String(secs).padStart(2, "0")}
          </div>

          {seconds === 0 && (
            <p className="mt-4 font-bold text-gold-400">
              زمان تمام شد! ⏰
            </p>
          )}

        </div>

        <div className="mb-7 h-2 overflow-hidden rounded-full bg-black/30">
          <div
            className="progress-bar h-full rounded-full bg-gradient-to-l from-gold-500 to-emerald-400"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => setRunning((value) => !value)}
            disabled={seconds === 0}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gold-500 px-5 py-3 font-bold text-emerald-950 transition hover:bg-gold-400 disabled:opacity-40"
          >
            {running ? (
              <Pause size={18} />
            ) : (
              <Play size={18} />
            )}

            {running ? "توقف" : "ادامه"}
          </button>

          <button
            onClick={() => {
              setSeconds(TOTAL);
              setRunning(true);
            }}
            className="rounded-2xl border border-white/10 px-5 py-3 text-slate-300 hover:bg-white/5"
          >
            <RotateCcw size={18} />
          </button>

        </div>

      </div>
    </div>
  );
}