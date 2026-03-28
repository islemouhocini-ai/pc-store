import { ShieldCheck, Truck, Headset } from "lucide-react";

export default function Services() {
  const items = [
    [
      Truck,
      "Fast Shipping",
      "Reliable delivery with secure packaging for premium components.",
    ],
    [
      ShieldCheck,
      "Trusted Warranty",
      "Clear warranty coverage and dependable post-purchase support.",
    ],
    [
      Headset,
      "Expert Guidance",
      "Professional help choosing compatible parts for your next build.",
    ],
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="grid gap-5 md:grid-cols-3">
        {items.map(([Icon, title, desc]) => (
          <div
            key={title}
            className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7 text-left shadow-lg shadow-black/20"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}