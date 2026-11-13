import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Shield,
  Zap,
  Gauge,
  Compass,
  Wind,
  Layers,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Sliders,
  CheckCircle2,
  BatteryCharging,
  Globe,
  CreditCard,
  Truck,
  Flame,
} from "lucide-react";
import { TeslaVehicle3DCanvas } from "@/components/tesla-vehicle-3d-canvas";

export const Route = createFileRoute("/cybertruck")({
  component: OfficialCybertruckPage,
  head: () => ({
    meta: [
      { title: "Cybertruck — Built for Any Planet | X3" },
      {
        name: "description",
        content:
          "Ultra-Hard 30X Cold-Rolled stainless-steel exoskeleton, armor glass, steer-by-wire, 11,000 lbs towing capacity, and 2.6s 0-60 mph Cyberbeast acceleration.",
      },
    ],
  }),
});

interface CyberFeature {
  id: string;
  title: string;
  copy: string;
  spec: string;
  sub: string;
}

const CYBER_FEATURES: CyberFeature[] = [
  {
    id: "exoskeleton",
    title: "Ultra-Hard 30X Cold-Rolled Stainless Steel",
    copy: "Helps eliminate dents, damage and long-term corrosion. Smooth monochrome exoskeleton puts the shell on the outside of the vehicle, providing maximum passenger protection.",
    spec: "30X",
    sub: "Cold-Rolled Alloy",
  },
  {
    id: "armor-glass",
    title: "Shatter-Resistant Armor Glass",
    copy: "Acoustic glass can resist the impact of a baseball at 70 mph or Class 4 hail. Acoustic treatment ensures whisper-quiet cabin acoustics across rough terrain.",
    spec: "Class 4",
    sub: "Hail Resistant",
  },
  {
    id: "suspension",
    title: "Adaptive Air Suspension",
    copy: "Electronically adaptive air suspension offers 12 inches of travel and up to 16 inches of ground clearance with on-the-fly dampening adjustments.",
    spec: "16 in",
    sub: "Max Ground Clearance",
  },
  {
    id: "powershare",
    title: "Powershare Generator & Outlets",
    copy: "Integrated 120V and 240V bed and cabin outlets supply up to 11.5 kW of continuous power to your tools or power your entire home during an electrical outage.",
    spec: "11.5 kW",
    sub: "Home Backup Power",
  },
];

function OfficialCybertruckPage() {
  const [viewMode, setViewMode] = useState<"showcase" | "configurator">("showcase");
  const [activeFeature, setActiveFeature] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTrim, setSelectedTrim] = useState<"cyberbeast" | "awd">("cyberbeast");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // 3D Model interactive state
  const [isDriving3D, setIsDriving3D] = useState(true);
  const [vaultCoverOpen, setVaultCoverOpen] = useState(false);
  const [cyberHeight, setCyberHeight] = useState<"Entry" | "Low" | "Medium" | "High">("Medium");

  const handlePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 4500);
  };

  // =========================================================================
  // VIEW MODE: 1:1 CYBERTRUCK SPLIT CONFIGURATOR
  // =========================================================================
  if (viewMode === "configurator") {
    return (
      <div className="min-h-screen bg-[#07080B] text-[#E0E2EC] font-sans antialiased flex flex-col justify-between selection:bg-[#E6A020] selection:text-black">
        
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-6 bg-gradient-to-b from-[#07080B] via-[#07080B]/60 to-transparent">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-mono text-xl sm:text-2xl font-black tracking-[0.35em] text-white uppercase group-hover:text-[#E6A020] transition-colors">
              X3
            </span>
          </Link>

          <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest">
            <button
              onClick={() => setViewMode("showcase")}
              className="text-white/60 hover:text-white transition-colors"
            >
              ← Overview
            </button>
            <div className="flex items-center gap-1.5 text-white/80">
              <Globe className="h-4 w-4 text-white/70" />
              <span>US</span>
            </div>
          </div>
        </header>

        {/* Confirmation Toast */}
        {paymentSuccess && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-2xl border border-[#E6A020]/60 bg-black/95 px-8 py-4 text-xs font-mono text-[#E6A020] shadow-2xl backdrop-blur-2xl flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="h-5 w-5 text-[#E6A020]" />
            <div>
              <div className="font-bold uppercase text-white">Cybertruck Reservation Placed ($250 Deposit)</div>
              <div className="text-white/60 mt-0.5">Your production queue slot has been secured.</div>
            </div>
          </div>
        )}

        {/* Two-Column Split Layout */}
        <div className="relative pt-24 pb-12 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-screen overflow-hidden">
          
          {/* Left Column: 3D Exoskeleton Digital Twin */}
          <div className="lg:col-span-7 relative flex flex-col justify-center items-center p-6 lg:p-12 min-h-[480px]">
            <div className="w-full max-w-2xl aspect-[16/10] rounded-2xl overflow-hidden border border-[#2A2D38] bg-[#0E1015] shadow-2xl relative">
              <TeslaVehicle3DCanvas
                model="cybertruck"
                isDriving={isDriving3D}
                speed={isDriving3D ? 65 : 0}
                vaultOpen={vaultCoverOpen}
                headlightsOn={true}
              />

              {/* In-Canvas Cyber Controls */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md text-[11px] font-mono">
                <button
                  onClick={() => setIsDriving3D(!isDriving3D)}
                  className="px-3 py-1 rounded border border-white/20 text-white/80 hover:text-white"
                >
                  {isDriving3D ? "Pause Drive" : "Spin Orbit"}
                </button>

                <button
                  onClick={() => setVaultCoverOpen(!vaultCoverOpen)}
                  className={`px-3 py-1 rounded border transition-colors ${
                    vaultCoverOpen ? "border-[#E6A020] text-[#E6A020]" : "border-white/20 text-white/80"
                  }`}
                >
                  Vault: {vaultCoverOpen ? "OPEN" : "CLOSED"}
                </button>

                <div className="flex items-center gap-1">
                  <span className="text-white/40">Air:</span>
                  {(["Entry", "Low", "Medium", "High"] as const).map((h) => (
                    <button
                      key={h}
                      onClick={() => setCyberHeight(h)}
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        cyberHeight === h ? "bg-[#E6A020] text-black font-bold" : "text-white/60"
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 text-[11px] font-mono text-white/40">
              Drag mouse to inspect 360&deg; low-poly stainless exoskeleton &middot; All-Terrain 35" tires
            </div>
          </div>

          {/* Right Column: Configurator Options */}
          <div className="lg:col-span-5 relative flex flex-col justify-start p-6 lg:p-12 lg:border-l lg:border-white/10 overflow-y-auto max-w-xl mx-auto w-full">
            
            <div className="text-center sm:text-left mb-8">
              <div className="inline-block px-3 py-0.5 rounded bg-[#E6A020]/20 border border-[#E6A020]/40 font-mono text-[10px] font-bold text-[#E6A020] mb-2 uppercase">
                Utility Redefined
              </div>
              <h1 className="font-mono font-black uppercase tracking-[0.15em] text-4xl sm:text-5xl text-white">
                CYBERTRUCK
              </h1>
            </div>

            {/* Cyberbeast Option */}
            <div
              onClick={() => setSelectedTrim("cyberbeast")}
              className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 mb-4 ${
                selectedTrim === "cyberbeast"
                  ? "border-[#E6A020] bg-[#14161F] shadow-[0_0_25px_rgba(230,160,32,0.15)]"
                  : "border-white/15 bg-black/40 hover:border-white/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                  Cyberbeast
                </span>
                <span className="text-xs font-mono font-bold text-[#E6A020]">
                  Tri-Motor AWD
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-[#A8ABB7] leading-relaxed font-light">
                0-60 mph in 2.6 seconds. 845 HP, 11,000 lbs towing capacity, front and rear locking differentials.
              </p>
              <div className="mt-4 font-mono text-xl font-bold text-white">$99,990</div>
            </div>

            {/* All-Wheel Drive Option */}
            <div
              onClick={() => setSelectedTrim("awd")}
              className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 mb-8 ${
                selectedTrim === "awd"
                  ? "border-[#E6A020] bg-[#14161F] shadow-[0_0_25px_rgba(230,160,32,0.15)]"
                  : "border-white/15 bg-black/40 hover:border-white/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                  All-Wheel Drive
                </span>
                <span className="text-xs font-mono font-bold text-white/60">
                  Dual-Motor AWD
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-[#A8ABB7] leading-relaxed font-light">
                0-60 mph in 4.1 seconds. 600 HP, 340 miles estimated range, 11,000 lbs towing capacity.
              </p>
              <div className="mt-4 font-mono text-xl font-bold text-white">$79,990</div>
            </div>

            {/* Financial Summary */}
            <div className="space-y-4 pt-6 border-t border-white/10 text-sm font-mono">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-base font-bold text-white">Due Today</div>
                  <div className="text-[11px] text-white/50">Fully Refundable Deposit</div>
                </div>
                <div className="text-2xl font-bold text-[#E6A020]">$250</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3 font-mono">
              <button
                onClick={handlePayment}
                className="w-full py-4 rounded-xl bg-[#E6A020] hover:bg-[#cf8e18] text-black font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg shadow-[#E6A020]/20"
              >
                Reserve Cybertruck &middot; $250
              </button>

              <Link
                to="/portal"
                className="w-full py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-center text-xs font-bold uppercase tracking-wider text-white transition-all block"
              >
                Enter Cybertruck In-Car Cockpit
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW MODE: OFFICIAL 1:1 CYBERTRUCK SHOWCASE STORY PAGE
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#07080B] text-[#D8DAE2] font-sans antialiased selection:bg-[#E6A020] selection:text-black">
      
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-6 bg-gradient-to-b from-[#07080B] via-[#07080B]/60 to-transparent">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-mono text-xl sm:text-2xl font-black tracking-[0.35em] text-white uppercase group-hover:text-[#E6A020] transition-colors">
            X3
          </span>
        </Link>

        <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest">
          <button
            onClick={() => setViewMode("configurator")}
            className="text-[#E6A020] hover:text-[#f3b544] font-bold transition-colors"
          >
            Order Now
          </button>
          <Link
            to="/portal"
            className="hidden sm:inline-flex text-white/70 hover:text-white transition-colors"
          >
            Digital Cockpit
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/15 bg-black/40 text-white"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span>Menu</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-between items-center text-center px-6 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/assets/cybertruck/cybertruck-hero.avif"
            alt="Cybertruck Exoskeleton"
            className="w-full h-full object-cover object-center filter contrast-125 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-black/60" />
        </div>

        <div className="relative z-10 w-full" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E6A020]/40 bg-[#E6A020]/10 px-4 py-1.5 text-xs font-mono font-semibold tracking-wider text-[#E6A020] mb-4">
            ULTRA-HARD 30X COLD-ROLLED STAINLESS STEEL &middot; STEER-BY-WIRE
          </div>

          <h1 className="font-mono font-black uppercase tracking-[0.2em] text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)]">
            CYBERTRUCK
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#B8BBC7] max-w-2xl font-light">
            Built for any planet. More utility than a truck with more performance than a sports car.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md font-mono text-xs font-bold uppercase tracking-[0.2em]">
            <button
              onClick={() => setViewMode("configurator")}
              className="w-full sm:w-52 py-3.5 px-6 rounded-md bg-[#E6A020] hover:bg-[#cf8e18] text-black shadow-lg shadow-[#E6A020]/25 transition-all"
            >
              Order Now
            </button>
            <Link
              to="/portal"
              className="w-full sm:w-52 py-3.5 px-6 rounded-md border border-white/20 bg-black/60 hover:bg-black/90 text-white text-center transition-all"
            >
              Touchscreen Cockpit
            </Link>
          </div>
        </div>

        {/* Specs Strip */}
        <div className="relative z-10 max-w-6xl mx-auto w-full mt-12">
          <div className="rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 items-center shadow-2xl font-mono text-center">
            <div>
              <div className="text-3xl font-extrabold text-white">11,000 lbs</div>
              <div className="text-[11px] text-white/50 uppercase mt-0.5">Towing Capacity</div>
            </div>
            <div className="border-l border-white/10">
              <div className="text-3xl font-extrabold text-[#E6A020]">2.6 s</div>
              <div className="text-[11px] text-white/50 uppercase mt-0.5">0-60 MPH (Cyberbeast)</div>
            </div>
            <div className="border-l border-white/10">
              <div className="text-3xl font-extrabold text-white">340 mi</div>
              <div className="text-[11px] text-white/50 uppercase mt-0.5">Estimated Range</div>
            </div>
            <div className="border-l border-white/10">
              <div className="text-3xl font-extrabold text-white">2,500 lbs</div>
              <div className="text-[11px] text-white/50 uppercase mt-0.5">Max Payload</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep-Dive Grid */}
      <section className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-white mb-3 uppercase">
            Built For Any Planet
          </h2>
          <div className="w-20 h-[2px] bg-[#E6A020] mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#A8ABB7]">
            Extreme durability and passenger protection across extreme earthly and off-world environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CYBER_FEATURES.map((feat) => (
            <div key={feat.id} className="rounded-2xl border border-white/10 bg-[#0E1015] p-8 space-y-4">
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-3xl font-black text-[#E6A020]">{feat.spec}</span>
                <span className="font-mono text-xs uppercase text-white/50">{feat.sub}</span>
              </div>
              <h3 className="font-mono text-xl font-bold text-white">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-[#9CA0B0] leading-relaxed">{feat.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive 3D Digital Twin Section */}
      <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-mono font-bold uppercase text-white mb-2">
            Interactive Exoskeleton
          </h2>
          <p className="text-xs sm:text-sm font-mono text-white/50">
            Drag to rotate 360&deg; &middot; Test vault cover and air suspension height
          </p>
        </div>

        <div className="rounded-3xl border border-white/15 bg-black/80 p-6 sm:p-8 shadow-2xl">
          <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-2xl overflow-hidden bg-black/90">
            <TeslaVehicle3DCanvas
              model="cybertruck"
              isDriving={isDriving3D}
              speed={isDriving3D ? 72 : 0}
              vaultOpen={vaultCoverOpen}
              headlightsOn={true}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDriving3D(!isDriving3D)}
                className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white"
              >
                {isDriving3D ? "Pause Motion" : "Resume Motion"}
              </button>
              <button
                onClick={() => setVaultCoverOpen(!vaultCoverOpen)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  vaultCoverOpen ? "border-[#E6A020] bg-[#E6A020]/20 text-[#E6A020]" : "border-white/20 text-white"
                }`}
              >
                Vault Cover: {vaultCoverOpen ? "OPEN" : "CLOSED"}
              </button>
            </div>

            <button
              onClick={() => setViewMode("configurator")}
              className="px-6 py-2 rounded-lg bg-[#E6A020] text-black font-bold uppercase tracking-widest hover:bg-[#cf8e18]"
            >
              Order Cybertruck
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-xs font-mono text-white/40">
        <div>X3 &copy; 2026 &nbsp;&middot;&nbsp; Cybertruck Cyberbeast Platform &nbsp;&middot;&nbsp; Privacy &amp; Legal</div>
      </footer>

    </div>
  );
}
