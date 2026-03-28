import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import TypingDots from "./TypingDots";

export default function Hero({ setPage, setHeroQuery }) {
  const [localQuery, setLocalQuery] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      text: "Hi — I’m your PC Parts Assistant. I only answer questions about PC hardware, compatibility, gaming builds, workstations, and choosing the best parts for your budget.",
      isTyping: false,
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (aiOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, aiOpen]);

  const containsAny = (text, words) => words.some((word) => text.includes(word));

  const getAiReply = (input) => {
    const q = input.toLowerCase().trim();

    const pcKeywords = [
      "pc",
      "computer",
      "gaming",
      "build",
      "gpu",
      "graphics",
      "cpu",
      "processor",
      "ram",
      "memory",
      "ssd",
      "storage",
      "nvme",
      "motherboard",
      "psu",
      "power supply",
      "cooler",
      "case",
      "intel",
      "amd",
      "nvidia",
      "rtx",
      "radeon",
      "1440p",
      "1080p",
      "4k",
      "fps",
      "streaming",
      "editing",
      "workstation",
      "bottleneck",
      "ddr4",
      "ddr5",
      "pcie",
      "monitor",
    ];

    if (!containsAny(q, pcKeywords)) {
      return "I only answer PC-related questions. Ask me about CPUs, GPUs, RAM, SSDs, gaming builds, compatibility, performance, or the best parts for your budget.";
    }

    if (containsAny(q, ["hello", "hi", "hey"])) {
      return "Hi — I can help you choose the right PC parts, compare hardware, suggest a full build, explain compatibility, or recommend the best parts for gaming, editing, streaming, or work.";
    }

    if (containsAny(q, ["budget", "cheap", "low budget", "mid range", "high end"])) {
      return "For choosing the right PC by budget, start with your main use case first. For gaming, the GPU usually matters most, then the CPU. For editing or workstation use, CPU cores, RAM capacity, and storage speed become more important. A good budget setup usually balances a strong value CPU, at least 16GB RAM, and a 1TB NVMe SSD. A better mid-range or premium setup often moves to 32GB RAM, a stronger GPU, and faster cooling and power delivery. If you want, tell me your exact budget and I’ll suggest a full parts list.";
    }

    if (containsAny(q, ["gaming build", "build me", "full build", "pc build"])) {
      return "To build a good PC, first decide the target: 1080p, 1440p, or 4K gaming, or productivity like editing and rendering. For a modern gaming-focused build, a strong combination is a Ryzen 7 7800X3D with an RTX 4070 SUPER, 32GB DDR5 RAM, and a fast NVMe SSD. If the budget is lower, you can scale down the GPU first, then RAM, while keeping a balanced CPU. The best build is always the one that matches your budget, monitor resolution, and games or software. Send me your budget and use case and I’ll recommend the exact parts.";
    }

    if (containsAny(q, ["cpu", "processor", "best cpu"])) {
      return "The best CPU depends on what you do. For pure gaming, the Ryzen 7 7800X3D is one of the strongest choices because it performs extremely well in modern games. For mixed use like gaming plus productivity, the Intel Core i7-14700K is a strong option because it offers more multi-core flexibility. If you mostly game, choose a CPU that pairs well with your GPU and resolution. If you also edit, render, code, or multitask heavily, a stronger multi-core CPU may be the better buy.";
    }

    if (containsAny(q, ["gpu", "graphics card", "best gpu", "rtx", "radeon"])) {
      return "The right GPU depends mostly on your resolution and the games you play. For premium 1440p gaming with strong features, the RTX 4070 SUPER is an excellent choice thanks to strong ray tracing, DLSS support, and high frame rates. If you care more about value and raw performance, cards like the RX 7800 XT can also be very attractive. For 1080p, you can spend less, while 4K usually requires a more powerful class of GPU. If you tell me your monitor resolution and game types, I can narrow it down properly.";
    }

    if (containsAny(q, ["ram", "memory", "16gb", "32gb", "ddr4", "ddr5"])) {
      return "For most modern gaming and general-use PCs, 16GB is still usable, but 32GB is becoming the better long-term choice, especially for modern games, multitasking, streaming, or productivity. DDR5 is generally the better platform choice for newer builds because it offers higher speeds and better long-term upgrade potential. If your budget allows it, 32GB DDR5 is an excellent sweet spot. If you are building on a tighter budget, 16GB is still acceptable, but 32GB feels more future-ready.";
    }

    if (containsAny(q, ["ssd", "storage", "nvme", "hdd"])) {
      return "For a modern PC, an NVMe SSD is one of the best upgrades you can buy because it improves boot times, game loading, app responsiveness, and overall system feel. Drives like the Samsung 990 PRO or WD Black SN850X are excellent high-speed options. For most people, 1TB is a practical minimum, while 2TB is more comfortable for larger game libraries or creative work. HDDs are still useful for cheap bulk storage, but your operating system and main games should ideally be on an NVMe SSD.";
    }

    if (containsAny(q, ["motherboard", "board", "chipset"])) {
      return "A motherboard should be chosen after the CPU, not before it. First decide on Intel or AMD, then choose a board with the right socket and chipset. A good motherboard should have stable power delivery, enough M.2 slots, quality cooling, and the connectivity you need, like Wi-Fi, USB ports, and PCIe support. You do not always need the most expensive board — the best one is the board that gives you reliability, compatibility, and room for future upgrades without wasting budget.";
    }

    if (containsAny(q, ["psu", "power supply", "watt", "watts"])) {
      return "Your power supply should be reliable, not just high wattage. A quality PSU from a trusted brand is extremely important for system stability and long-term safety. For a mid-to-high-end gaming PC, a well-built 750W or 850W unit is often a strong choice, depending on the GPU. Look for good efficiency, solid reviews, and enough headroom for upgrades. Never treat the PSU as an afterthought — it is one of the most important parts in the build.";
    }

    if (containsAny(q, ["cooler", "cooling", "air cooler", "aio"])) {
      return "Cooling depends on your CPU and noise preference. Many gaming builds do very well with a strong air cooler, while hotter or more power-hungry chips may benefit from a quality AIO liquid cooler. Good cooling improves performance stability, temperatures, and noise levels. The best choice depends on your CPU class, case airflow, and whether you prefer simpler maintenance or a cleaner premium look.";
    }

    if (containsAny(q, ["case", "airflow"])) {
      return "A good case should have strong airflow, enough room for your GPU and cooler, and easy cable management. People often choose cases only for looks, but airflow matters a lot for temperatures and noise. A well-ventilated case with front intake support and space for future upgrades is a smarter choice than a case that only looks premium from the outside.";
    }

    if (containsAny(q, ["intel or amd", "intel vs amd", "amd vs intel"])) {
      return "Intel and AMD both make excellent CPUs, but the better choice depends on your goals. AMD is especially strong in gaming with chips like the Ryzen 7 7800X3D, while Intel can be very attractive for mixed workloads and high-core-count versatility. The best comparison is not brand versus brand, but specific model versus specific model, your budget, and whether you care more about gaming, productivity, or both.";
    }

    if (containsAny(q, ["nvidia or amd", "nvidia vs amd", "amd vs nvidia"])) {
      return "NVIDIA is often preferred for ray tracing, DLSS, and some creator workflows, while AMD can offer excellent raw performance and value in many price ranges. The better buy depends on your exact budget, resolution, and whether you care more about features or pure value. If you want, I can compare a specific NVIDIA card to a specific AMD card for you.";
    }

    if (containsAny(q, ["1080p", "1440p", "4k", "resolution"])) {
      return "Your target resolution strongly affects which GPU makes sense. For 1080p, you can usually spend less and still get excellent frame rates. For 1440p, you benefit from a stronger GPU, and this is often the sweet spot for a premium gaming experience. For 4K, GPU demand rises a lot, so it is important to choose a card that can keep up without compromising too much on settings.";
    }

    if (containsAny(q, ["bottleneck", "compatible", "compatibility", "pair"])) {
      return "Compatibility matters more than people think. The CPU must match the motherboard socket, the RAM type must match the platform, the case must fit your GPU and cooler, and the PSU must support the system safely. Bottleneck concerns are most useful when comparing your whole setup and your target resolution. A balanced PC is better than overspending on one part while neglecting the rest.";
    }

    if (containsAny(q, ["editing", "rendering", "workstation", "productivity", "streaming"])) {
      return "For editing, rendering, and workstation tasks, CPU strength, RAM capacity, and storage speed matter more than they do in a pure gaming build. 32GB RAM is a strong starting point, and 64GB can make sense for heavier workloads. Fast NVMe storage helps with large files and caching. For streaming or mixed gaming and content creation, a balanced CPU and GPU combination is ideal, rather than focusing on only one component.";
    }

    if (containsAny(q, ["which is better", "better", "recommend"])) {
      return "To recommend the best part properly, I need three things: your budget, your main use case, and your monitor resolution. The best component for 1080p esports gaming is not the same as the best component for 4K gaming, editing, or workstation tasks. If you give me those details, I can recommend the right CPU, GPU, RAM, and storage combination.";
    }

    return "I can help with choosing CPUs, GPUs, RAM, SSDs, power supplies, cooling, full PC builds, compatibility, and the best parts for gaming or productivity. Tell me your budget and what you want the PC for, and I’ll guide you properly.";
  };

  const typeAiMessage = (fullText) => {
    const typingId = Date.now();

    setMessages((prev) => [
      ...prev,
      { id: typingId, role: "ai", text: "", isTyping: true },
    ]);

    window.setTimeout(() => {
      let index = 0;

      const interval = window.setInterval(() => {
        index += 1;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === typingId
              ? {
                  ...msg,
                  text: fullText.slice(0, index),
                  isTyping: false,
                }
              : msg
          )
        );

        if (index >= fullText.length) {
          window.clearInterval(interval);
        }
      }, 14);
    }, 650);
  };

  const handleHeroSearch = () => {
    setHeroQuery(localQuery);
    setPage("shop");
  };

  const handleAiSend = () => {
    const trimmed = aiInput.trim();
    if (!trimmed) return;

    const reply = getAiReply(trimmed);

    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, role: "user", text: trimmed, isTyping: false },
    ]);

    setAiInput("");
    typeAiMessage(reply);
  };

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_left,rgba(59,130,246,0.12),transparent_26%),linear-gradient(to_bottom,rgba(8,15,37,0.85),rgba(5,8,22,1))]" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8 flex flex-col gap-4 rounded-[30px] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:p-5">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
            <Search className="h-4 w-4 text-cyan-300" />
            <input
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleHeroSearch();
              }}
              placeholder="Search the entire catalog"
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleHeroSearch}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.08]"
            >
              Shop Deals
            </button>

            <button
              onClick={() => setAiOpen((prev) => !prev)}
              className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_14px_30px_rgba(34,211,238,0.18)]"
            >
              AI Assisted Search
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <button
            onClick={() => setPage("shop")}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-100 to-slate-300 p-8 text-left shadow-2xl"
          >
            <div className="max-w-[70%]">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-600">
                Seasonal Deals
              </div>
              <h2 className="mt-3 text-4xl font-black leading-tight text-slate-900">
                Top Spring Offers
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-700">
                Limited-time discounts on premium gear, gaming hardware, and
                creator essentials.
              </p>
            </div>

            <div className="absolute right-6 top-6 rounded-full bg-violet-600 px-5 py-6 text-center text-white shadow-xl">
              <div className="text-xs font-semibold uppercase">Up to</div>
              <div className="text-3xl font-black">40%</div>
              <div className="text-xs">off</div>
            </div>

            <div className="absolute bottom-6 right-6 rounded-full bg-orange-500 p-4 text-white shadow-xl">
              +
            </div>
          </button>

          <button
            onClick={() => setPage("product")}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-950 via-slate-950 to-slate-900 p-8 text-left shadow-2xl"
          >
            <div className="max-w-[68%]">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                Display & Entertainment
              </div>
              <h2 className="mt-3 text-4xl font-black leading-tight text-white">
                A premium screen should not cost a fortune.
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-300">
                Discover standout display gear, performance monitors, and
                immersive setups at sharper prices.
              </p>
            </div>

            <div className="absolute bottom-6 right-6 rounded-full bg-white p-4 text-slate-900 shadow-xl">
              +
            </div>

            <div className="absolute right-6 top-8 rounded-full bg-cyan-400 px-5 py-6 text-center text-slate-950 shadow-xl">
              <div className="text-xs font-semibold uppercase">Save up to</div>
              <div className="text-3xl font-black">40%</div>
              <div className="text-xs">today</div>
            </div>
          </button>

          <button
            onClick={() => setPage("shop")}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-emerald-100 via-cyan-100 to-sky-200 p-8 text-left shadow-2xl"
          >
            <div className="max-w-[72%]">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-700">
                Certified Value
              </div>
              <h2 className="mt-3 text-4xl font-black leading-tight text-slate-900">
                Refurbished at the right price.
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-700">
                Save more on carefully selected refurbished hardware and trusted
                open-box picks.
              </p>
            </div>

            <div className="absolute bottom-6 right-6 rounded-full bg-orange-500 p-4 text-white shadow-xl">
              +
            </div>
          </button>
        </div>
      </div>

      {aiOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-24px)] rounded-[30px] border border-cyan-400/20 bg-slate-900/75 p-4 backdrop-blur-2xl shadow-[0_20px_60px_rgba(2,8,23,0.55)]">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">PC Parts Assistant</h3>
            <button
              onClick={() => setAiOpen(false)}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 hover:bg-white/[0.08]"
            >
              Close
            </button>
          </div>

          <div className="max-h-[300px] space-y-3 overflow-auto rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-8 ${
                  message.role === "user"
                    ? "ml-auto bg-cyan-400 text-slate-950"
                    : "bg-white/[0.05] text-slate-200"
                }`}
              >
                {message.isTyping ? <TypingDots /> : message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-3 flex gap-3">
            <input
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAiSend();
              }}
              placeholder="Ask about CPUs, GPUs, RAM, SSDs, builds, or compatibility..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            />
            <button
              onClick={handleAiSend}
              className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </section>
  );
}