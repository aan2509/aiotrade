import {
  BarChart3,
  Clock3,
  Link2,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";
import heroImage from "@/bahan foto/hero.jpg";
import logoImage from "@/bahan foto/Logo-AIOTrade.png";
import phoneImage from "@/bahan foto/phone.png";
import chartImage from "@/bahan foto/chart.webp";
import binanceLogo from "@/bahan foto/binance.webp";
import bitgetLogo from "@/bahan foto/bitget.webp";
import tokocryptoLogo from "@/bahan foto/tokocrypto.png";
import type {
  Article,
  FaqEntry,
  Feature,
  NavItem,
  PartnerLogo,
  Plan,
  StatItem,
  Step,
} from "@/components/landing/types";

export const landingImages = {
  heroImage,
  logoImage,
  phoneImage,
  chartImage,
} as const;

export const navItems: NavItem[] = [
  { label: "Feature", href: "#fitur" },
  { label: "Harga", href: "#harga" },
  { label: "FAQ", href: "#faq" },
  { label: "User Guide", href: "#panduan" },
  { label: "Blog", href: "#blog" },
];

export const stats: StatItem[] = [
  { label: "Pengguna aktif", value: "1.200+" },
  { label: "Exchange terhubung", value: "Binance, Bitget, Tokocrypto" },
  { label: "Model akses", value: "Lifetime access" },
];

export const features: Feature[] = [
  {
    title: "24/7 Trading",
    description: "Bot tetap berjalan sepanjang hari tanpa Anda perlu memantau layar terus-menerus.",
    icon: Clock3,
  },
  {
    title: "Cepat dan efisien",
    description: "Analisa market dibuat otomatis agar eksekusi lebih disiplin dan responsif.",
    icon: BarChart3,
  },
  {
    title: "Strategi adaptif",
    description: "Grid, averaging, dan pengaturan custom bisa dipilih sesuai gaya trading Anda.",
    icon: ShieldCheck,
  },
  {
    title: "Referral siap pakai",
    description: "Halaman referral tetap utuh karena CTA, signup, dan aktivasi member tidak diubah.",
    icon: Link2,
  },
  {
    title: "Komunitas aktif",
    description: "Belajar bareng, dapat insight, dan diskusi setup dengan member lainnya.",
    icon: Users,
  },
  {
    title: "Pembayaran simpel",
    description: "Pilihan paket disusun ringkas agar orang langsung paham apa yang didapat.",
    icon: WalletCards,
  },
];

export const plans: Plan[] = [
  {
    name: "Bot Crypto",
    price: "$130",
    description:
      "Akses bot spot dengan grid, averaging, trailing stop, dan pengaturan custom untuk market crypto.",
  },
  {
    name: "Combo",
    price: "$190",
    description:
      "Gabungkan akses bot crypto dan saham dalam satu paket lengkap dengan prioritas update.",
    highlight: "Best price",
    emphasis: true,
  },
  {
    name: "Bot Saham",
    price: "$130",
    description:
      "Akses bot saham berbasis AI untuk analisa dan strategi otomatis yang sedang terus dikembangkan.",
  },
];

export const faqEntries: FaqEntry[] = [
  {
    question: "Apa itu AIOTrade?",
    answer:
      "AIOTrade adalah alat bantu trading berbasis AI untuk membantu pengguna menjalankan strategi otomatis di market spot dengan koneksi API yang aman.",
  },
  {
    question: "Exchange apa saja yang bisa dipakai?",
    answer:
      "Landing page ini menonjolkan integrasi Binance, Bitget, dan Tokocrypto, dengan fokus pada alur setup yang cepat untuk pengguna baru.",
  },
  {
    question: "Apakah saya harus online terus?",
    answer:
      "Tidak. Setelah API dan strategi diatur, bot dapat berjalan terus sambil Anda memantau performa dari dashboard dan histori transaksi.",
  },
  {
    question: "Bagaimana alur referral tetap bekerja?",
    answer:
      "Semua tombol daftar tetap memakai tujuan signup yang sama, jadi homepage utama maupun halaman referral user tetap mengarah ke alur pendaftaran yang konsisten.",
  },
];

export const steps: Step[] = [
  {
    number: "01",
    title: "Daftar akun",
    description: "Buat akun AIOTrade lalu masuk ke area member untuk menyiapkan akun Anda.",
  },
  {
    number: "02",
    title: "Hubungkan API",
    description: "Sambungkan API spot dari exchange pilihan dan sesuaikan parameter bot yang diinginkan.",
  },
  {
    number: "03",
    title: "Jalankan strategi",
    description: "Pilih mode trading, pantau histori transaksi, lalu optimalkan setup sesuai kondisi market.",
  },
];

export const articles: Article[] = [
  {
    title: "Trading crypto otomatis di Bitget",
    description: "Mulai dengan setup yang rapi untuk market spot dan pemantauan yang lebih tenang.",
    image: bitgetLogo,
    label: "Crypto news",
  },
  {
    title: "Kenapa Binance tetap jadi favorit trader",
    description: "Likuiditas besar dan integrasi yang familiar bikin onboarding jadi lebih cepat.",
    image: binanceLogo,
    label: "Exchange",
  },
  {
    title: "Partner lokal untuk akses yang lebih dekat",
    description: "Tokocrypto memberi opsi tambahan untuk pengguna yang ingin tetap dekat dengan ekosistem lokal.",
    image: tokocryptoLogo,
    label: "Partner",
  },
];

export const partnerLogos: PartnerLogo[] = [
  { src: tokocryptoLogo, alt: "Tokocrypto" },
  { src: binanceLogo, alt: "Binance" },
  { src: bitgetLogo, alt: "Bitget" },
];
