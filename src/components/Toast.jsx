import { useEffect, useRef } from "react";
import { CheckCircle2, XCircle, Info, Sparkles } from "lucide-react";

export default function Toast({ toast, onClose }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!toast?.show) return;

    try {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = "sine";

      if (toast.type === "error") {
        oscillator.frequency.setValueAtTime(240, ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.16);
      } else {
        oscillator.frequency.setValueAtTime(620, ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.12);
      }

      gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.22);

      audioRef.current = ctx;
    } catch (err) {
      console.error("TOAST SOUND ERROR:", err);
    }

    return () => {
      try {
        audioRef.current?.close?.();
      } catch {
        //
      }
    };
  }, [toast?.show, toast?.type]);

  if (!toast?.show) return null;

  const styles = {
    success: {
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
      border: "border-emerald-400/20",
      glow: "shadow-[0_18px_55px_rgba(16,185,129,0.18)]",
      title: "Success",
      accent: "from-emerald-400 via-cyan-400 to-emerald-300",
    },
    error: {
      icon: <XCircle className="h-5 w-5 text-rose-400" />,
      border: "border-rose-400/20",
      glow: "shadow-[0_18px_55px_rgba(244,63,94,0.18)]",
      title: "Error",
      accent: "from-rose-500 via-fuchsia-500 to-rose-400",
    },
    info: {
      icon: <Info className="h-5 w-5 text-cyan-300" />,
      border: "border-cyan-400/20",
      glow: "shadow-[0_18px_55px_rgba(34,211,238,0.16)]",
      title: "Notice",
      accent: "from-cyan-400 via-sky-400 to-cyan-300",
    },
  };

  const current = styles[toast.type] || styles.success;

  return (
    <div className="pointer-events-none fixed right-5 top-5 z-[120]">
      <div
        className={`pointer-events-auto relative min-w-[320px] max-w-[420px] overflow-hidden rounded-[24px] border bg-slate-950/88 backdrop-blur-2xl ${current.border} ${current.glow} animate-[toastIn_.38s_cubic-bezier(.22,1,.36,1)]`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />

        <div className="relative flex items-start gap-3 p-4">
          <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
            {current.icon}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-wide text-white">
                {toast.title || current.title}
              </span>
              <Sparkles className="h-3.5 w-3.5 text-cyan-300/80" />
            </div>

            <div className="mt-1 text-sm leading-6 text-slate-300">
              {toast.message}
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="h-[3px] w-full overflow-hidden bg-white/[0.03]">
          <div
            className={`h-full w-full origin-left animate-[toastBar_3.4s_linear_forwards] bg-gradient-to-r ${current.accent}`}
          />
        </div>
      </div>

      <style>{`
        @keyframes toastIn {
          0% {
            opacity: 0;
            transform: translateY(-18px) scale(0.94);
            filter: blur(6px);
          }
          60% {
            opacity: 1;
            transform: translateY(0) scale(1.01);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes toastBar {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </div>
  );
}