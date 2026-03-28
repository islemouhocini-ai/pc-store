import { AlertTriangle, CheckCircle2, X } from "lucide-react";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message = "Please confirm this action.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-md">
      <div className="w-full max-w-md animate-[dialogIn_.28s_ease] rounded-[28px] border border-white/10 bg-slate-950/90 shadow-[0_25px_80px_rgba(2,8,23,0.55)]">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                danger
                  ? "border-rose-400/20 bg-rose-500/10"
                  : "border-cyan-400/20 bg-cyan-500/10"
              }`}
            >
              {danger ? (
                <AlertTriangle className="h-6 w-6 text-rose-400" />
              ) : (
                <CheckCircle2 className="h-6 w-6 text-cyan-300" />
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-black text-white">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                {message}
              </p>
            </div>

            <button
              onClick={onCancel}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              onClick={onCancel}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08] hover:text-white"
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${
                danger
                  ? "bg-rose-500 text-white shadow-[0_12px_30px_rgba(244,63,94,0.22)] hover:bg-rose-400"
                  : "bg-cyan-400 text-slate-950 shadow-[0_12px_30px_rgba(34,211,238,0.2)] hover:opacity-95"
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dialogIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}