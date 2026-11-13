import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Zap,
  Gauge,
  Compass,
  Wind,
  Shield,
  Layers,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Maximize2,
  CheckCircle2,
  Flame,
  Volume2,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TeslaVehicle3DCanvas } from "@/components/tesla-vehicle-3d-canvas";

export const Route = createFileRoute("/roadster")({
  component: RoadsterLearnMorePage,
  head: () => ({
    meta: [
      { title: "X3 Roadster — The Quickest Supercar in Existence" },
      {
        name: "description",
        content:
          "Record-setting acceleration from 0-60 mph in 1.1s, 620-mile range, SpaceX cold-gas thruster propulsion, and aerodynamic carbon-composite architecture.",
      },
    ],
  }),
});

function RoadsterLearnMorePage() {
  const [activeTab, setActiveTab] = useState<"performance" | "aero" | "spacex" | "interior">("performance");
  const [thrusterActive, setThrusterActive] = useState(false);
  const [isDriving3D, setIsDriving3D] = useState(true);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<"founders" | "base">("founders");

  const fireThruster = () => {
    setThrusterActive(true);
    setTimeout(() => setThrusterActive(false), 2200);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-[#E82127] selection:text-white">
      <SiteHeader />

      {/* ===================================================================== */}
      {/* 1. HERO SHOWCASE: RECORD-BREAKING SUPERCAR                            */}
      {/* ===================================================================== */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-28 pb-14 px-6 md:px-12 border-b border-white/10">
        
        {/* Background Official Image with Atmospheric Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/roadster/roadster-card-official.avif"
            alt="X3 Roadster Founders Series"
            className="w-full h-full object-cover object-center filter contrast-110 brightness-90 transform scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-[#050507]" />
        </div>

        {/* Top Eyebrow & Brand Badging */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/40 px-3.5 py-1 text-xs font-mono font-semibold tracking-wider text-red-400 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            PURE ELECTRIC VELOCITY &middot; SPACEX REACTION PROPULSION
          </div>

          <h1 className="mt-4 font-black italic tracking-tighter text-5xl sm:text-7xl lg:text-8xl uppercase text-white drop-shadow-2xl">
            ROADSTER
          </h1>
          <p className="mt-2 text-base sm:text-xl text-white/80 max-w-2xl font-light">
            The quickest electric supercar in existence. Engineered with carbon-composite architecture, tri-motor all-wheel drive, and cold-gas thruster acceleration.
          </p>
        </div>

        {/* Bottom Hero Specs Strip (Tesla-Style Glass Bar) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full mt-16">
          <div className="rounded-2xl border border-white/15 bg-black/60 backdrop-blur-2xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-5 gap-6 items-center shadow-2xl">
            
            <div className="text-center sm:text-left">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                1.9 <span className="text-sm font-sans font-normal text-white/60">sec</span>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 mt-0.5">
                0-60 MPH (Base)
              </div>
            </div>

            <div className="text-center sm:text-left border-l border-white/10 pl-4 sm:pl-6">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-red-500 tracking-tight flex items-baseline justify-center sm:justify-start gap-1">
                &lt; 1.1 <span className="text-sm font-sans font-normal text-red-400">sec</span>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-red-400/80 mt-0.5 font-bold">
                0-60 With SpaceX Package
              </div>
            </div>

            <div className="text-center sm:text-left border-l border-white/10 pl-4 sm:pl-6">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                +250 <span className="text-sm font-sans font-normal text-white/60">mph</span>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 mt-0.5">
                Top Speed
              </div>
            </div>

            <div className="text-center sm:text-left border-l border-white/10 pl-4 sm:pl-6">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                620 <span className="text-sm font-sans font-normal text-white/60">mi</span>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 mt-0.5">
                Electric Range
              </div>
            </div>

            <div className="col-span-2 lg:col-span-1 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center">
              <button
                onClick={() => setReservationModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E82127] to-[#B31419] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/40 hover:opacity-95 transition-all"
              >
                Reserve Now
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/portal"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-all text-center"
              >
                Digital Cockpit
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. REAL INTERACTIVE 3D DIGITAL TWIN IN ACTIVE MOTION                 */}
      {/* ===================================================================== */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-mono font-medium text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-red-500" />
            3D DIGITAL TWIN &middot; AEROSPACE SIMULATION
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black italic tracking-tight uppercase">
            Interactive Aerodynamic Model
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/60">
            Drag to rotate 360&deg; in real-time. Test the active aero downforce wing, launch motion, and cold-gas thruster reaction control system.
          </p>
        </div>

        {/* 3D Canvas Box */}
        <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#0D0E13] to-[#060608] overflow-hidden shadow-2xl p-4 sm:p-8">
          
          {/* Controls Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-red-600 text-white font-bold">
                X3 ROADSTER
              </span>
              <span className="text-white/60">Tri-Motor AWD &middot; Founders Edition</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDriving3D(!isDriving3D)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  isDriving3D
                    ? "border-emerald-500/50 bg-emerald-950/40 text-emerald-300"
                    : "border-white/20 bg-white/5 text-white/60"
                }`}
              >
                {isDriving3D ? "● Drive Simulation Active" : "○ Park / Orbit Mode"}
              </button>

              <button
                onClick={fireThruster}
                disabled={thrusterActive}
                className={`px-4 py-1.5 rounded-lg border text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                  thrusterActive
                    ? "border-red-500 bg-red-600 text-white animate-pulse"
                    : "border-red-500/40 bg-red-950/40 text-red-400 hover:bg-red-900/50"
                }`}
              >
                <Flame className="h-3.5 w-3.5" />
                {thrusterActive ? "THRUSTERS FIRING!" : "Test Cold-Gas Thrusters"}
              </button>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="relative w-full aspect-[16/9] min-h-[420px] max-h-[620px] rounded-2xl overflow-hidden border border-white/10 bg-black/80">
            <TeslaVehicle3DCanvas
              model="roadster"
              isDriving={isDriving3D}
              speed={thrusterActive ? 165 : 74}
              thrusterFiring={thrusterActive}
              headlightsOn={true}
            />

            {/* Thruster Overlay Notification */}
            {thrusterActive && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 rounded-full border border-red-500/60 bg-black/90 px-6 py-2 text-xs font-mono text-red-400 shadow-2xl flex items-center gap-2 animate-bounce">
                <Flame className="h-4 w-4 text-red-500" />
                <span>10,000 PSI REACTION CONTROL SYSTEM EXHAUST PURGE</span>
              </div>
            )}

            <div className="absolute bottom-4 left-4 text-[11px] font-mono text-white/40 pointer-events-none">
              Drag mouse to rotate &middot; Smooth wheel rotation enabled
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. PERFORMANCE BREAKDOWN: RECORD-SETTING METRICS                     */}
      {/* ===================================================================== */}
      <section className="py-20 px-6 md:px-12 border-t border-white/10 bg-[#07080B]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/20 px-3 py-1 text-xs font-mono text-red-400">
              <Gauge className="h-3.5 w-3.5" />
              RECORD-SETTING DYNAMICS
            </div>

            <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tight">
              Designed for Speed and Aero Efficiency
            </h2>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              As an all-electric supercar, Roadster maximizes the potential of aerodynamic design with an active downforce spoiler, integrated diffuser channels, and record-setting efficiency.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10 font-mono">
              <div className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
                <span className="text-white/60">0-60 MPH</span>
                <span className="font-bold text-white text-base">1.9 s (Base) / 1.1 s (SpaceX)</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
                <span className="text-white/60">0-100 MPH</span>
                <span className="font-bold text-white text-base">4.2 s</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
                <span className="text-white/60">1/4 Mile Sprint</span>
                <span className="font-bold text-white text-base">8.8 s</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
                <span className="text-white/60">Top Speed</span>
                <span className="font-bold text-white text-base">+250 MPH</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
                <span className="text-white/60">Wheel Torque</span>
                <span className="font-bold text-white text-base">10,000 Nm</span>
              </div>
              <div className="flex items-center justify-between py-2 text-sm">
                <span className="text-white/60">Range</span>
                <span className="font-bold text-emerald-400 text-base">620 Miles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Specs Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
              <div className="h-10 w-10 rounded-xl bg-red-600/20 text-red-500 grid place-items-center mb-4">
                <Flame className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-white">SpaceX Rocket Package</h3>
              <p className="mt-2 text-xs text-white/60 leading-relaxed">
                10 cold-gas thruster nozzles seamlessly arranged around the vehicle. Ultra-high pressure composite vessels enable instantaneous lateral thrust and sub-1.1s launch acceleration.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
              <div className="h-10 w-10 rounded-xl bg-blue-600/20 text-blue-400 grid place-items-center mb-4">
                <Wind className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Removable Glass Roof</h3>
              <p className="mt-2 text-xs text-white/60 leading-relaxed">
                A lightweight, removable panoramic glass roof stores easily in the rear boot for an open-air convertible grand touring experience with zero aerodynamic drag penalties.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
              <div className="h-10 w-10 rounded-xl bg-amber-600/20 text-amber-400 grid place-items-center mb-4">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Seating For Four</h3>
              <p className="mt-2 text-xs text-white/60 leading-relaxed">
                The first production supercar to comfortably seat four adults. Sculpted carbon-fiber racing bucket seats with integrated 6-point harness anchors.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
              <div className="h-10 w-10 rounded-xl bg-emerald-600/20 text-emerald-400 grid place-items-center mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Tri-Motor All-Wheel Drive</h3>
              <p className="mt-2 text-xs text-white/60 leading-relaxed">
                One front drive unit and two independent rear motors with millisecond torque vectoring at each individual wheel for extraordinary wet, dry, and track agility.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. RESERVATION TIERS MODAL / COLUMN                                  */}
      {/* ===================================================================== */}
      {reservationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl rounded-3xl border border-white/20 bg-[#0E0F14] p-8 shadow-2xl">
            <button
              onClick={() => setReservationModalOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white text-lg font-mono"
            >
              ✕
            </button>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/40 px-3 py-1 text-xs font-mono font-semibold text-red-400 mb-2">
                RESERVATION PORTAL
              </div>
              <h3 className="text-2xl sm:text-3xl font-black italic uppercase">Reserve X3 Roadster</h3>
              <p className="text-xs text-white/60 mt-1">
                Priority delivery slot backed by Gigafactory 3 advanced production lines.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={() => setSelectedTier("founders")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedTier === "founders"
                    ? "border-red-500 bg-red-950/30 ring-1 ring-red-500"
                    : "border-white/15 bg-white/5"
                }`}
              >
                <div className="text-xs font-mono uppercase text-red-400 font-bold">Founders Series</div>
                <div className="text-xl font-bold font-mono text-white mt-1">$250,000</div>
                <div className="text-[11px] text-white/60 mt-1">Limited to 1,000 units with SpaceX Package included</div>
              </button>

              <button
                onClick={() => setSelectedTier("base")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedTier === "base"
                    ? "border-red-500 bg-red-950/30 ring-1 ring-red-500"
                    : "border-white/15 bg-white/5"
                }`}
              >
                <div className="text-xs font-mono uppercase text-white/60 font-bold">Base Model</div>
                <div className="text-xl font-bold font-mono text-white mt-1">$200,000</div>
                <div className="text-[11px] text-white/60 mt-1">$50,000 initial reservation deposit</div>
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <input
                type="text"
                placeholder="Full Legal Name"
                className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-red-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Corporate or Personal Email"
                className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-red-500 focus:outline-none"
              />
            </div>

            <button
              onClick={() => {
                alert("Reservation secured! Welcome to the X3 Founders Circle.");
                setReservationModalOpen(false);
              }}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#E82127] to-[#B31419] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/50 hover:opacity-95 transition-all"
            >
              Confirm Reservation &middot; {selectedTier === "founders" ? "$250,000" : "$50,000 Deposit"}
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 5. BOTTOM PERSISTENT DOCK / ACTION BAR                                */}
      {/* ===================================================================== */}
      <div className="sticky bottom-0 z-30 w-full border-t border-white/10 bg-black/90 backdrop-blur-xl px-6 py-4 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-white/60 hover:text-white transition-colors">
            ← Home
          </Link>
          <span className="text-white/20">|</span>
          <span className="text-white font-bold">X3 ROADSTER APEX</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setReservationModalOpen(true)}
            className="rounded-xl bg-[#E82127] hover:bg-[#d01c22] px-5 py-2 font-bold uppercase text-white shadow-md transition-colors"
          >
            Reserve Now
          </button>
          <Link
            to="/portal"
            className="hidden sm:inline-flex rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-4 py-2 font-semibold text-white transition-colors"
          >
            In-Car Cockpit
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
