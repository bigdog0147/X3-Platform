import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
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
  VolumeX,
  Play,
  Pause,
  Sliders,
  Eye,
  Rocket,
  ShieldAlert,
  Fan,
  Cpu,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TeslaVehicle3DCanvas } from "@/components/tesla-vehicle-3d-canvas";

export const Route = createFileRoute("/roadster")({
  component: RoadsterMasterPage,
  head: () => ({
    meta: [
      { title: "X3 Roadster — The Quickest Car in the World" },
      {
        name: "description",
        content:
          "Official X3 Roadster showcase. Three revolutionary trims: Performance, Thrust, and Rocket. Active ground suction, 10,000 PSI cold-gas thrusters, 1 Megawatt power output, and sub-0.59s 0-60 acceleration.",
      },
    ],
  }),
});

type TrimKey = "performance" | "thrust" | "rocket";

interface TrimData {
  name: string;
  badge: string;
  tagline: string;
  acceleration: string;
  accelSubtext: string;
  topSpeed: string;
  power: string;
  range: string;
  seating: string;
  aeroSystem: string;
  legalStatus: string;
  price: string;
  deposit: string;
  desc: string;
}

const TRIMS: Record<TrimKey, TrimData> = {
  performance: {
    name: "Performance",
    badge: "ROAD-READY",
    tagline: "Everyday Supercar Boundary Breaker",
    acceleration: "< 1.6 s",
    accelSubtext: "0-60 MPH",
    topSpeed: "+250 MPH",
    power: "1,100 HP",
    range: "620 Miles",
    seating: "2 Seats",
    aeroSystem: "Active Carbon Spoiler",
    legalStatus: "Fully Street Legal (DOT / EU)",
    price: "$200,000",
    deposit: "$50,000",
    desc: "Engineered for pure street performance with full daily driving capability. High-density battery architecture, tri-motor all-wheel torque vectoring, and active rear aero wing.",
  },
  thrust: {
    name: "Thrust",
    badge: "LIMITED RELEASE &middot; RACE-READY",
    tagline: "Active Ground-Suction & Rear Thrusters",
    acceleration: "< 0.9 s",
    accelSubtext: "0-60 MPH (Cold-Gas Boost)",
    topSpeed: "+260 MPH",
    power: "1,350 HP (1.0 MW)",
    range: "500 Miles",
    seating: "2 Seats",
    aeroSystem: "Active Suction System + Rear Thrusters",
    legalStatus: "Street & Track Certified",
    price: "$250,000",
    deposit: "$50,000",
    desc: "Race-ready configuration featuring active ground suction fans for instant downforce at 0 mph and twin cold-gas thruster nozzles behind the rear plate.",
  },
  rocket: {
    name: "Rocket",
    badge: "INVITE ONLY &middot; AIR-READY",
    tagline: "Perimeter Reaction Control Thrusters",
    acceleration: "< 0.59 s",
    accelSubtext: "0-60 MPH (Hyper-G Launch)",
    topSpeed: "+270 MPH",
    power: "1,500+ HP",
    range: "420 Miles",
    seating: "1 Seat (Center Monocoque)",
    aeroSystem: "Full Perimeter Thruster Matrix + Dual Suction Fans",
    legalStatus: "Private Track / Aerospace Proving Ground",
    price: "$300,000+",
    deposit: "$100,000",
    desc: "Equipped with cold-gas thrusters around the entire vehicle perimeter enabling forward, upward, and lateral rotational movement. So yes, it can fly.",
  },
};

function RoadsterMasterPage() {
  const [selectedTrim, setSelectedTrim] = useState<TrimKey>("thrust");
  const [isDriving3D, setIsDriving3D] = useState(true);
  const [thrusterActive, setThrusterActive] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeTrim = TRIMS[selectedTrim];

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
      setVideoPlaying(false);
    } else {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoMuted;
    setVideoMuted(!videoMuted);
  };

  const testThrusters = () => {
    setThrusterActive(true);
    setTimeout(() => setThrusterActive(false), 2400);
  };

  return (
    <div className="min-h-screen bg-[#040406] text-white font-sans selection:bg-[#E82127] selection:text-white">
      <SiteHeader />

      {/* ===================================================================== */}
      {/* 1. CINEMATIC FULL-BLEED VIDEO HERO (OFFICIAL TESLA STYLE)             */}
      {/* ===================================================================== */}
      <section className="relative h-screen min-h-[720px] flex flex-col justify-between overflow-hidden pt-24 pb-8 px-6 md:px-12 border-b border-white/10">
        
        {/* Background Looping Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={videoMuted}
            playsInline
            poster="/assets/roadster/roadster-card-official.avif"
            className="w-full h-full object-cover object-center filter contrast-110 brightness-90 transition-opacity duration-700"
          >
            <source src="/assets/roadster/roadster-hero-video.mp4" type="video/mp4" />
          </video>

          {/* Vignette Overlays for Maximum Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-black/25 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-[#040406]/80 pointer-events-none" />
        </div>

        {/* Video Control Buttons Floating Top Right */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex justify-end gap-2 pt-2">
          <button
            onClick={toggleVideoPlayback}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md transition-colors"
            title={videoPlaying ? "Pause Video" : "Play Video"}
          >
            {videoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={toggleVideoMute}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md transition-colors"
            title={videoMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {videoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-red-500" />}
          </button>
        </div>

        {/* Hero Headline & Identity */}
        <div className="relative z-20 max-w-7xl mx-auto w-full text-center sm:text-left my-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/40 px-4 py-1.5 text-xs font-mono font-semibold tracking-wider text-red-400 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            PURE ELECTRIC VELOCITY &middot; SPACEX REACTION CONTROL
          </div>

          <h1 className="mt-4 font-black italic tracking-tighter text-6xl sm:text-8xl lg:text-9xl uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
            ROADSTER
          </h1>

          <p className="mt-3 text-base sm:text-xl md:text-2xl text-white/90 max-w-2xl font-light drop-shadow-md">
            The quickest car in the world, with record-setting acceleration, range, and cold-gas thruster propulsion.
          </p>
        </div>

        {/* Bottom Hero Glass HUD Specs Strip (Exact Tesla Geometry) */}
        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <div className="rounded-2xl border border-white/15 bg-black/75 backdrop-blur-2xl p-5 sm:p-7 grid grid-cols-2 lg:grid-cols-5 gap-6 items-center shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            
            <div className="text-center sm:text-left">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {activeTrim.acceleration}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 mt-0.5">
                {activeTrim.accelSubtext}
              </div>
            </div>

            <div className="text-center sm:text-left border-l border-white/10 pl-4 sm:pl-6">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-red-500 tracking-tight">
                {activeTrim.topSpeed}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-red-400/80 mt-0.5">
                Top Speed
              </div>
            </div>

            <div className="text-center sm:text-left border-l border-white/10 pl-4 sm:pl-6">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {activeTrim.range}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 mt-0.5">
                Electric Range
              </div>
            </div>

            <div className="text-center sm:text-left border-l border-white/10 pl-4 sm:pl-6">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {activeTrim.power}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 mt-0.5">
                Peak Output (1 MW)
              </div>
            </div>

            <div className="col-span-2 lg:col-span-1 flex flex-col sm:flex-row lg:flex-col gap-2 justify-center">
              <button
                onClick={() => setReservationModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E82127] to-[#B31419] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/50 hover:brightness-110 transition-all"
              >
                Reserve Now
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <Link
                to="/portal"
                className="w-full inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-all text-center"
              >
                In-Car Cockpit
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. REVERSE-ENGINEERED 3 CONFIGURATION TIERS (PERFORMANCE / THRUST / ROCKET) */}
      {/* ===================================================================== */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-mono text-white/70">
            <Rocket className="h-3.5 w-3.5 text-red-500" />
            OFFICIAL VEHICLE CONFIGURATIONS
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black italic tracking-tight uppercase">
            Three Revolutionary Trims
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/60">
            Choose your configuration level: from street-legal daily hypercar to perimeter cold-gas thruster flight dynamics.
          </p>

          {/* 3-Tier Switcher Bar */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl border border-white/15 bg-black/80 backdrop-blur-xl">
            {(["performance", "thrust", "rocket"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTrim(t)}
                className={`px-5 sm:px-7 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase transition-all ${
                  selectedTrim === t
                    ? "bg-gradient-to-r from-[#E82127] to-[#B31419] text-white shadow-lg shadow-red-900/40"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {t === "performance" && "1. Performance"}
                {t === "thrust" && "2. Thrust (Limited)"}
                {t === "rocket" && "3. Rocket (Invite Only)"}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Tier Spotlight Card */}
        <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0D0E13] via-[#090A0E] to-[#040406] p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 font-mono text-xs font-bold">
                  {activeTrim.badge}
                </span>
                <span className="text-white/40 font-mono text-xs">
                  {activeTrim.legalStatus}
                </span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-black italic uppercase text-white">
                {activeTrim.name} Edition
              </h3>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
                {activeTrim.desc}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 font-mono">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">{activeTrim.acceleration}</div>
                  <div className="text-[11px] text-white/50 uppercase">{activeTrim.accelSubtext}</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-red-500">{activeTrim.topSpeed}</div>
                  <div className="text-[11px] text-white/50 uppercase">Top Track Speed</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">{activeTrim.power}</div>
                  <div className="text-[11px] text-white/50 uppercase">System Power</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{activeTrim.range}</div>
                  <div className="text-[11px] text-white/50 uppercase">Electric Range</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">{activeTrim.seating}</div>
                  <div className="text-[11px] text-white/50 uppercase">Cabin Layout</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">{activeTrim.price}</div>
                  <div className="text-[11px] text-white/50 uppercase">MSRP</div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => setReservationModalOpen(true)}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E82127] to-[#B31419] font-bold text-xs uppercase tracking-wider text-white shadow-lg hover:brightness-110 transition-all"
                >
                  Reserve {activeTrim.name} &middot; {activeTrim.deposit} Deposit
                </button>
                <button
                  onClick={testThrusters}
                  className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 font-semibold text-xs text-white hover:bg-white/15 transition-all flex items-center gap-2"
                >
                  <Flame className="h-4 w-4 text-red-500" />
                  Test Thruster Purge
                </button>
              </div>
            </div>

            {/* Right Side: Interactive 3D Digital Twin Viewport */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-black/90 shadow-2xl">
                <TeslaVehicle3DCanvas
                  model="roadster"
                  isDriving={isDriving3D}
                  speed={selectedTrim === "rocket" ? 180 : selectedTrim === "thrust" ? 120 : 74}
                  thrusterFiring={thrusterActive || selectedTrim === "rocket"}
                  headlightsOn={true}
                />

                {/* Floating Interactive 3D Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-white/15 text-[10px] font-mono">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>360&deg; DRAG TO ROTATE &middot; REAL THREE.JS</span>
                </div>

                <div className="absolute bottom-4 right-4 z-10">
                  <button
                    onClick={() => setIsDriving3D(!isDriving3D)}
                    className="px-3 py-1 rounded-lg border border-white/20 bg-black/70 text-[10px] font-mono text-white/80 hover:text-white"
                  >
                    {isDriving3D ? "Pause Wheel Motion" : "Resume Drive"}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. AEROSPACE ENGINEERING & SUCTION AERODYNAMICS                      */}
      {/* ===================================================================== */}
      <section className="py-24 px-6 md:px-12 border-t border-white/10 bg-[#06070A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/20 px-3 py-1 text-xs font-mono text-red-400">
              <Fan className="h-3.5 w-3.5" />
              GROUND-EFFECT REVOLUTION
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-black italic uppercase tracking-tight">
              Active Aerodynamics & Ground Suction
            </h2>
            <p className="mt-2 text-white/70 text-sm sm:text-base">
              Powered turbine suction systems generate tons of downforce even while stationary at 0 mph, eliminating mechanical grip limits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-md space-y-4">
              <div className="h-12 w-12 rounded-xl bg-red-600/20 text-red-500 grid place-items-center">
                <Fan className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase">Multi-Mode Suction System</h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                Dual underside electric ground fans pull low-pressure airflow from underneath the carbon monocoque, effectively gluing the chassis to the tarmac for unprecedented cornering G-forces.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-md space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-600/20 text-blue-400 grid place-items-center">
                <Wind className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase">Deployable Aero Downforce Wing</h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                Multi-axis carbon spoiler extends and adjusts pitch angle dynamically in milliseconds, serving as both high-speed stabilizing wing and vertical airbrake under heavy deceleration.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-md space-y-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-600/20 text-emerald-400 grid place-items-center">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase">Cold-Gas Thrusters (10,000 PSI)</h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                SpaceX composite overwrapped pressure vessels (COPV) feed ultra-fast solenoid thrusters to counteract inertia, stabilize high-speed cornering, and execute sub-1-second acceleration.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. SUPERSONIC INTERIOR & STEER-BY-WIRE                               */}
      {/* ===================================================================== */}
      <section className="py-24 px-6 md:px-12 border-t border-white/10 bg-[#040406]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-mono text-white/70">
              <Cpu className="h-3.5 w-3.5 text-blue-400" />
              NEXT-GENERATION COCKPIT
            </div>

            <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tight">
              Supersonic Interior & Steer-by-Wire
            </h2>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Designed from first principles to shed weight and heighten driver connectivity. Featuring an ultra-white and gray microsuede palette with racing bucket bolsters.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10 font-mono text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">Full Steer-by-Wire Yoke:</span> Variable steering ratio adapts seamlessly from parking maneuvers to 250 mph straightaways without cross-arm hand turns.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">Triple Flight Display Architecture:</span> Central curved OLED touchscreen flanked by dual driver-focused telemetry pods for instant G-force and thruster pressure readout.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">Removable Lightweight Glass Roof:</span> Effortlessly unlatches and stows in the rear trunk for open-air grand touring.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">Mass-Optimized Metallurgy:</span> Extensive application of structural titanium, magnesium subframes, and pre-preg carbon fiber.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interior Image Preview */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl border border-white/15 overflow-hidden shadow-2xl group">
              <img
                src="/assets/roadster/4-roadster-interior.avif"
                alt="X3 Roadster Supersonic Interior"
                className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-white uppercase">Ultrawhite Microsuede Cockpit</span>
                <span className="text-white/60">Yoke Steer-by-Wire</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. RESERVATION MODAL                                                  */}
      {/* ===================================================================== */}
      {reservationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl rounded-3xl border border-white/20 bg-[#0E0F14] p-8 shadow-2xl">
            <button
              onClick={() => setReservationModalOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white text-lg font-mono"
            >
              ✕
            </button>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/40 px-3 py-1 text-xs font-mono font-semibold text-red-400 mb-2">
                OFFICIAL RESERVATION DESK
              </div>
              <h3 className="text-2xl sm:text-3xl font-black italic uppercase">Secure Your Roadster</h3>
              <p className="text-xs text-white/60 mt-1">
                Priority assembly sequence on the Gigafactory 3 advanced robotics line.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              {(["performance", "thrust", "rocket"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTrim(t)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedTrim === t
                      ? "border-red-500 bg-red-950/30 ring-1 ring-red-500"
                      : "border-white/15 bg-white/5"
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase text-red-400 font-bold">{TRIMS[t].name}</div>
                  <div className="text-sm font-bold font-mono text-white mt-0.5">{TRIMS[t].price}</div>
                  <div className="text-[9px] text-white/50 mt-1">{TRIMS[t].deposit} deposit</div>
                </button>
              ))}
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
                alert(`Reservation confirmed for X3 Roadster ${activeTrim.name}! Welcome to the Founders Circle.`);
                setReservationModalOpen(false);
              }}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#E82127] to-[#B31419] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/50 hover:brightness-110 transition-all"
            >
              Confirm Reservation &middot; {activeTrim.deposit} Deposit
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 6. BOTTOM PERSISTENT DOCK                                             */}
      {/* ===================================================================== */}
      <div className="sticky bottom-0 z-30 w-full border-t border-white/10 bg-black/90 backdrop-blur-xl px-6 py-4 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-white/60 hover:text-white transition-colors">
            ← Home
          </Link>
          <span className="text-white/20">|</span>
          <span className="text-white font-bold">X3 ROADSTER &middot; {activeTrim.name.toUpperCase()}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setReservationModalOpen(true)}
            className="rounded-xl bg-[#E82127] hover:bg-[#d01c22] px-5 py-2 font-bold uppercase text-white shadow-md transition-colors"
          >
            Reserve Now ({activeTrim.deposit})
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
