import { Cpu, MemoryStick, HardDrive, MonitorSpeaker } from "lucide-react";

export const categories = [
  {
    key: "cpu",
    name: "Processors",
    icon: Cpu,
    desc: "Intel and AMD CPUs for powerful performance",
  },
  {
    key: "gpu",
    name: "Graphics Cards",
    icon: MonitorSpeaker,
    desc: "Latest gaming and creator GPUs",
  },
  {
    key: "ram",
    name: "Memory",
    icon: MemoryStick,
    desc: "DDR4 and DDR5 high-speed RAM",
  },
  {
    key: "storage",
    name: "Storage",
    icon: HardDrive,
    desc: "NVMe SSD and HDD options",
  },
];

export const productsData = [
  {
    id: 1,
    name: "NVIDIA GeForce RTX 4070 SUPER",
    category: "gpu",
    price: 109900,
    oldPrice: 118500,
    rating: 4.9,
    badge: "Best For Gamers",
    specs: ["12GB GDDR6X", "Ray Tracing", "DLSS 3"],
    short: "A powerful card for high-end 1440p gaming and smooth 4K entry performance.",
    image:
      "https://www.gainward.com/main/product/vga/pro/p01203/p01203_pic2_1055658bcdfc9b4ad.png",
  },
  {
    id: 2,
    name: "AMD Ryzen 7 7800X3D",
    category: "cpu",
    price: 84900,
    oldPrice: 91500,
    rating: 5.0,
    badge: "Power Beast",
    specs: ["8 Cores", "16 Threads", "3D V-Cache"],
    short: "One of the best processors for premium gaming builds.",
    image:
      "https://github.com/islemouhocini-ai/pc-store/blob/main/images/39f736_Ryzen-7-7800x3d-1-removebg-preview.png?raw=true",
  },
  {
    id: 3,
    name: "Corsair Vengeance DDR5 32GB",
    category: "ram",
    price: 21900,
    oldPrice: 25500,
    rating: 4.8,
    badge: "Special Offer",
    specs: ["32GB", "6000MHz", "CL30"],
    short: "Fast memory built for modern gaming and workstation platforms.",
    image:
      "https://raw.githubusercontent.com/islemouhocini-ai/pc-store/refs/heads/main/images/Vengeance-RGB-DDR5-2UP-32GB-GRAY_01.avif",
  },
  {
    id: 4,
    name: "Samsung 990 PRO 2TB NVMe",
    category: "storage",
    price: 29900,
    oldPrice: 33500,
    rating: 4.9,
    badge: "Ultra Fast",
    specs: ["2TB", "PCIe 4.0", "NVMe M.2"],
    short: "Blazing-fast storage for games, workloads, and instant loading.",
    image:
      "https://raw.githubusercontent.com/islemouhocini-ai/pc-store/refs/heads/main/images/au-990pro-nvme-m2-ssd-mz-v9p2t0bw-533718268.avif",
  },
  {
    id: 5,
    name: "Intel Core i7-14700K",
    category: "cpu",
    price: 79900,
    oldPrice: 85900,
    rating: 4.7,
    badge: "Great Value",
    specs: ["20 Cores", "Turbo Boost", "Unlocked"],
    short: "A strong choice for both gaming and productivity.",
    image:
      "https://github.com/islemouhocini-ai/pc-store/blob/main/images/intel-core-i7-14700k-df-deal-removebg-preview.png?raw=true",
  },
  {
    id: 6,
    name: "Kingston Fury Beast 16GB DDR5",
    category: "ram",
    price: 12500,
    oldPrice: 14600,
    rating: 4.6,
    badge: "Budget Pick",
    specs: ["16GB", "5600MHz", "DDR5"],
    short: "A smart upgrade for everyday performance and gaming.",
    image:
      "https://github.com/islemouhocini-ai/pc-store/blob/main/images/FURY_Beast_Black_DDR5_2_angle-sm-removebg-preview.png?raw=true",
  },
  {
    id: 7,
    name: "WD Black SN850X 1TB",
    category: "storage",
    price: 18500,
    oldPrice: 21200,
    rating: 4.8,
    badge: "Pro Choice",
    specs: ["1TB", "NVMe", "PCIe 4.0"],
    short: "High-speed SSD that cuts boot and load times dramatically.",
    image:
      "https://github.com/islemouhocini-ai/pc-store/blob/main/images/wd-black-sn850x-nvme-ssd-heatsink-front.png.thumb.1280.1280.png?raw=true",
  },
  {
    id: 8,
    name: "AMD Radeon RX 7800 XT",
    category: "gpu",
    price: 89900,
    oldPrice: 96500,
    rating: 4.7,
    badge: "Performance Pick",
    specs: ["16GB GDDR6", "1440p Gaming", "AV1"],
    short: "Excellent GPU for gamers who want strong value and high FPS.",
    image:
      "https://github.com/islemouhocini-ai/pc-store/blob/main/images/Radeon%20RX%207800%20XT%20Phantom%20Gaming%2016GB%20OC(L1).png?raw=true",
  },
];

export const formatDZD = (value) =>
  new Intl.NumberFormat("en-US").format(value) + " DZD";