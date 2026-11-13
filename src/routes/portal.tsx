import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Car,
  CheckCircle2,
  Clock,
  ShieldCheck,
  CreditCard,
  Download,
  Bell,
  MapPin,
  Zap,
  Gauge,
  Wifi,
  ChevronRight,
  LogOut,
  Sliders,
  ExternalLink,
  Smartphone,
  Lock,
  ArrowRight,
  Sparkles,
  Radio,
  Flame,
  Key,
  Eye,
  Check,
  Layers,
  Activity,
  Crosshair,
  FileText,
  Volume2,
} from "lucide-react";
import { X3Logo3D } from "@/components/x3-logo-3d";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/portal")({
  component: CustomerPortalPage,
  head: () => ({
    meta: [
      { title: "X3 Pilot Portal — Vehicle Telemetry & Order Center" },
      {
        name: "description",
        content: "Track your bespoke X3 vehicle build in real-time, inspect production milestones, and manage telemetry.",
      },
    ],
  }),
});

interface VehicleAngle {
  id: string;
  label: string;
  icon: string;
  image: string;
}

interface VehicleOrder {
  id: string;
  vin: string;
  model: string;
  edition: string;
  color: string;
  colorHex: string;
  angles: VehicleAngle[];
  status: string;
  stageIndex: number;
  progressPercent: number;
  estDelivery: string;
  deliveryLocation: string;
  basePrice: number;
  depositPaid: number;
  specs: { label: string; value: string; unit?: string }[];
  stages: {
    name: string;
    date: string;
    status: "completed" | "current" | "upcoming";
    desc: string;
    inspector: string;
    qaNote: string;
  }[];
}

const DEMO_ORDERS: VehicleOrder[] = [
  {
    id: "X3-RDS-9042",
    vin: "X3RDS9042F00188",
    model: "X3 Roadster",
    edition: "Founders Series · SpaceX Cold-Gas Thruster Package",
    color: "Titanium White & Raw Aerospace Carbon",
    colorHex: "#F5F5F7",
    angles: [
      {
        id: "studio",
        label: "Studio Profile",
        icon: "🏎️",
        image: "/assets/roadster/roadster-studio-white.jpg",
      },
      {
        id: "cockpit",
        label: "Aero Cockpit & Yoke",
        icon: "💺",
        image: "/assets/roadster/roadster-interior-cockpit.jpg",
      },
      {
        id: "thrusters",
        label: "Cold-Gas Thrusters",
        icon: "🚀",
        image: "/assets/roadster/roadster-rear-thrusters.jpg",
      },
      {
        id: "wheels",
        label: "Forged Track Wheels",
        icon: "🛞",
        image: "/assets/roadster/roadster-wheel-tire.jpg",
      },
      {
        id: "track",
        label: "Aero Carbon Wings",
        icon: "🏁",
        image: "/assets/roadster/roadster-race-profile.jpg",
      },
    ],
    status: "In Assembly · Stage 3 of 5",
    stageIndex: 2,
    progressPercent: 78,
    estDelivery: "August 2026",
    deliveryLocation: "X3 Delivery Hub · Austin Gigasite, TX",
    basePrice: 250000,
    depositPaid: 50000,
    specs: [
      { label: "0-60 MPH", value: "1.90", unit: "sec" },
      { label: "Top Speed", value: "+250", unit: "mph" },
      { label: "Range", value: "620", unit: "mi" },
      { label: "Peak Torque", value: "10,000", unit: "Nm" },
    ],
    stages: [
      {
        name: "Reservation & Allocation",
        date: "Confirmed · Oct 14, 2025",
        status: "completed",
        desc: "Founders Series allocation locked with prioritized production slot #00188.",
        inspector: "Autonomous Ledger QA",
        qaNote: "Cryptographic escrow hash verified. Priority queue confirmed.",
      },
      {
        name: "Carbon-Fiber Monocoque Cure",
        date: "Completed · Jan 28, 2026",
        status: "completed",
        desc: "Single-piece structural composite safety cell cured in 12-bar aerospace autoclave.",
        inspector: "Robotic Ultrasonic Scan 04",
        qaNote: "Zero void defects detected. Torsional rigidity exceeded 65,000 Nm/deg.",
      },
      {
        name: "Tri-Motor & Thruster Integration",
        date: "Active Phase · In Progress",
        status: "current",
        desc: "Precision mounting of 10,000 Nm permanent-magnet motors and composite cold-gas thruster canisters.",
        inspector: "Flight Dynamics Cell B",
        qaNote: "Cold-gas manifold pressure tested to 12,500 PSI burst ceiling.",
      },
      {
        name: "Wind Tunnel & Dyno Verification",
        date: "Scheduled · June 2026",
        status: "upcoming",
        desc: "Automated 200 mph aerodynamic stability run, downforce verification, and firmware calibration.",
        inspector: "Aero Dyno Facility A",
        qaNote: "Pending completion of stage 3 powertrain integration.",
      },
      {
        name: "Private Track Handover & Delivery",
        date: "Target · August 2026",
        status: "upcoming",
        desc: "VIP track day handover, keycard synchronization, Starlink flight key provisioning.",
        inspector: "X3 Concierge Delivery Team",
        qaNote: "Handover schedule window will open 30 days prior to roll-out.",
      },
    ],
  },
  {
    id: "X3-CYB-3310",
    vin: "X3CYB3310T00941",
    model: "X3 Cybertruck",
    edition: "Cyberbeast Tri-Motor · Ultra-Hard 30X Steel Monolith",
    color: "Cold-Rolled Stainless Steel Monolith",
    colorHex: "#A0A0A5",
    angles: [
      {
        id: "hero",
        label: "Exoskeleton Front",
        icon: "📐",
        image: "/assets/cybertruck/cybertruck-hero.avif",
      },
    ],
    status: "Exoskeleton Pressing · Stage 2 of 5",
    stageIndex: 1,
    progressPercent: 35,
    estDelivery: "November 2026",
    deliveryLocation: "X3 Delivery Hub · Austin Gigasite, TX",
    basePrice: 99990,
    depositPaid: 25000,
    specs: [
      { label: "0-60 MPH", value: "2.60", unit: "sec" },
      { label: "Towing", value: "11,000", unit: "lbs" },
      { label: "Range", value: "340", unit: "mi" },
      { label: "Exoskeleton", value: "30X", unit: "Steel" },
    ],
    stages: [
      {
        name: "Reservation & Allocation",
        date: "Confirmed · Dec 02, 2025",
        status: "completed",
        desc: "Cyberbeast Tri-Motor slot secured with priority exoskeleton queue.",
        inspector: "Giga Austin Allocation",
        qaNote: "Monolith steel roll ID #SS-9042 allocated.",
      },
      {
        name: "30X Exoskeleton Pressing",
        date: "Active Phase · In Progress",
        status: "current",
        desc: "Ultra-hard cold-rolled stainless panels undergoing automated robotic laser bending.",
        inspector: "Robotic Press Line 2",
        qaNote: "Yield strength validated at 1,400 MPa.",
      },
      {
        name: "Cyberbeast Tri-Motor Powertrain",
        date: "Scheduled · July 2026",
        status: "upcoming",
        desc: "Steer-by-wire calibration, 800V silicon-carbide inverter installation.",
        inspector: "Powertrain Robotics",
        qaNote: "Queued behind batch #41.",
      },
      {
        name: "Durability & Ballistic Verification",
        date: "Scheduled · Sept 2026",
        status: "upcoming",
        desc: "Acoustic armor glass impact inspection and active air suspension articulation.",
        inspector: "Armor QA Bay",
        qaNote: "Standard procedure before final paintless finish.",
      },
      {
        name: "Customer Delivery Handover",
        date: "Target · Nov 2026",
        status: "upcoming",
        desc: "Customer delivery at Austin Delivery Center with full off-road kit.",
        inspector: "Austin Delivery Center",
        qaNote: "Appointment booking opens October 2026.",
      },
    ],
  },
];

export function CustomerPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState("pilot@x3.engineering");
  const [passwordInput, setPasswordInput] = useState("X3Roadster2026!");
  const [authError, setAuthError] = useState("");
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"tracker" | "telemetry" | "finance" | "settings">("tracker");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Simulated Remote Action Feedback
  const [remoteActionFeedback, setRemoteActionFeedback] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Monroney Sticker Modal
  const [showStickerModal, setShowStickerModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (localStorage.getItem("x3_pilot_authenticated") === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const order = DEMO_ORDERS[selectedOrderIndex];
  const currentAngle = order.angles[activeAngleIndex] || order.angles[0];

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (emailInput.trim().length > 3 && passwordInput.length > 4) {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("x3_pilot_authenticated", "true");
      }
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Please provide valid pilot credentials.");
    }
  };

  const handleQuickDemoLogin = () => {
    setEmailInput("pilot@x3.engineering");
    setPasswordInput("X3Roadster2026!");
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("x3_pilot_authenticated", "true");
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("x3_pilot_authenticated");
    }
    setIsAuthenticated(false);
  };

  const triggerRemoteAction = (actionName: string, message: string) => {
    setActionLoading(actionName);
    setRemoteActionFeedback(null);
    setTimeout(() => {
      setActionLoading(null);
      setRemoteActionFeedback(message);
      setTimeout(() => setRemoteActionFeedback(null), 4500);
    }, 900);
  };

  // =========================================================================
  // 1. HIGH-TECH CYBER PILOT LOGIN INTERFACE
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-[#060608] text-white flex flex-col justify-between selection:bg-[#E82127] selection:text-white overflow-hidden">
        {/* Subtle Ambient Red Thruster Glow in Background */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(232,33,39,0.18),transparent_70%)] blur-[100px] opacity-75" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_60%)] blur-[90px]" />

        {/* Global Navigation Header */}
        <SiteHeader />

        {/* Main Split-Screen / Centered Command Center */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Reserved Vehicle Live Radar Badge */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E82127]/40 bg-[#E82127]/10 px-3.5 py-1 text-xs font-mono font-semibold text-[#E82127] backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#E82127] animate-ping" />
                <span>STARLINK MESH ENCRYPTED · CHASSIS TELEMETRY</span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans leading-[1.08]">
                  Pilot Command & Delivery Center.
                </h1>
                <p className="mt-3 text-sm sm:text-base text-white/60 font-mono leading-relaxed">
                  Real-time factory telemetry, cold-gas thruster assembly milestones, and direct chassis controls for confirmed X3 reservation holders.
                </p>
              </div>

              {/* Reserved Roadster Showcase Card Preview */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-black/60 p-5 backdrop-blur-xl shadow-2xl transition-all hover:border-[#E82127]/50">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d12]">
                  <img
                    src="/assets/roadster/roadster-studio-white.jpg"
                    alt="X3 Roadster Founders Series"
                    className="h-full w-full object-cover object-center filter contrast-110 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-black/85 border border-white/20 px-3 py-1 text-[11px] font-mono font-bold text-white backdrop-blur-md">
                    ALLOCATION: #X3-RDS-9042
                  </div>
                  <div className="absolute bottom-3 right-3 rounded-full bg-[#E82127] px-3 py-1 text-[11px] font-mono font-bold text-white shadow-[0_0_15px_rgba(232,33,39,0.8)]">
                    STAGE 3: 78% COMPLETE
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-white/50">MODEL:</span>{" "}
                    <span className="font-bold text-white">X3 ROADSTER FOUNDERS</span>
                  </div>
                  <div>
                    <span className="text-white/50">HANDOVER:</span>{" "}
                    <span className="font-bold text-emerald-400">AUGUST 2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Tech Glass Cockpit Login Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl border border-white/20 bg-[#0d0d12]/90 p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
                {/* Top Corner Red Aerospace Accent */}
                <div className="absolute -top-[1px] -left-[1px] h-12 w-12 rounded-tl-3xl border-t-2 border-l-2 border-[#E82127]" />
                <div className="absolute -bottom-[1px] -right-[1px] h-12 w-12 rounded-br-3xl border-b-2 border-r-2 border-[#E82127]" />

                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <X3Logo3D size="sm" />
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#E82127] font-bold">
                        SECURE ACCESS
                      </div>
                      <h2 className="text-xl font-bold tracking-tight text-white font-sans">
                        Pilot Authentication
                      </h2>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full border border-white/15 bg-white/5 grid place-items-center">
                    <Lock className="h-4 w-4 text-[#E82127]" />
                  </div>
                </div>

                {/* Verified Test Credentials Card */}
                <div className="my-6 rounded-2xl border border-[#E82127]/40 bg-[#E82127]/10 p-4 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#E82127] font-bold">
                      <Sparkles className="h-4 w-4" />
                      <span>OFFICIAL TEST CREDENTIALS</span>
                    </div>
                    <span className="text-[10px] text-white/60 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                      Auto-fill Ready
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="bg-black/40 p-2 rounded-xl border border-white/10">
                      <div className="text-white/50 text-[10px]">PILOT EMAIL</div>
                      <div className="text-white font-bold truncate">pilot@x3.engineering</div>
                    </div>
                    <div className="bg-black/40 p-2 rounded-xl border border-white/10">
                      <div className="text-white/50 text-[10px]">SECURITY KEY</div>
                      <div className="text-white font-bold">X3Roadster2026!</div>
                    </div>
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Pilot Account Identifier / Email
                    </label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3.5 text-sm font-mono text-white placeholder-white/30 focus:border-[#E82127] focus:ring-1 focus:ring-[#E82127] focus:outline-none transition-all"
                      placeholder="pilot@x3.engineering"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60">
                        Flight Passcode / Key
                      </label>
                      <span className="text-[10px] font-mono text-[#E82127] hover:underline cursor-pointer">
                        Reset Passkey
                      </span>
                    </div>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3.5 text-sm font-mono text-white placeholder-white/30 focus:border-[#E82127] focus:ring-1 focus:ring-[#E82127] focus:outline-none transition-all"
                      placeholder="••••••••••••"
                      required
                    />
                  </div>

                  {authError && (
                    <div className="text-xs font-mono text-[#E82127] bg-[#E82127]/10 p-3 rounded-xl border border-[#E82127]/30">
                      {authError}
                    </div>
                  )}

                  {/* Submit Button with High-Tech Red Aerospace Gradient */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E82127] to-[#B31419] px-6 py-4 text-xs font-mono uppercase tracking-wider font-bold text-white shadow-[0_0_25px_rgba(232,33,39,0.5)] transition-all hover:brightness-110 active:scale-[0.99]"
                  >
                    <Lock className="h-4 w-4" />
                    <span>Verify Credentials & Enter Cockpit</span>
                  </button>

                  {/* One-Click Instant Pilot Access */}
                  <button
                    type="button"
                    onClick={handleQuickDemoLogin}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-xs font-mono uppercase tracking-wider font-bold text-white transition-all active:scale-[0.99]"
                  >
                    <Zap className="h-4 w-4 text-[#E82127]" />
                    <span>One-Click Instant Pilot Access</span>
                  </button>
                </form>

                {/* Back Link */}
                <div className="mt-6 flex items-center justify-between text-xs font-mono text-white/50 border-t border-white/10 pt-4">
                  <Link
                    to="/"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    ← Return to X3 Flagship
                  </Link>
                  <span>Chassis Uplink: Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Footer */}
        <SiteFooter />
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED PILOT COMMAND & DELIVERY CENTER
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#07070A] text-white flex flex-col justify-between selection:bg-[#E82127] selection:text-white">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:py-12">
        {/* Top Pilot Profile & Status Banner */}
        <div className="mb-8 rounded-3xl border border-white/15 bg-[#0C0D12]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            
            {/* Pilot Identity Badge */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl border-2 border-[#E82127] bg-[#E82127]/10 grid place-items-center shadow-[0_0_20px_rgba(232,33,39,0.6)]">
                  <Car className="h-7 w-7 text-[#E82127]" />
                </div>
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-black animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                    Pilot Command Center
                  </h1>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono text-emerald-400 font-bold">
                    ● ACTIVE STARLINK UPLINK
                  </span>
                  <span className="rounded-full bg-white/10 border border-white/20 px-2.5 py-0.5 text-[10px] font-mono text-white/80">
                    FOUNDERS RESERVE PILOT
                  </span>
                </div>
                <p className="text-xs font-mono text-white/60 mt-1">
                  Chassis Reservation: <span className="text-white font-bold">{order.id}</span> · VIN:{" "}
                  <span className="text-white font-bold">{order.vin}</span> · Delivery Center:{" "}
                  <span className="text-white">{order.deliveryLocation}</span>
                </p>
              </div>
            </div>

            {/* Action Bar: Vehicle Switcher & Sign Out */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Multi-Vehicle Tabs */}
              <div className="inline-flex rounded-xl border border-white/15 bg-black/60 p-1">
                {DEMO_ORDERS.map((o, idx) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setSelectedOrderIndex(idx);
                      setActiveAngleIndex(0);
                    }}
                    className={`rounded-lg px-3.5 py-2 text-xs font-mono font-bold transition-all ${
                      selectedOrderIndex === idx
                        ? "bg-gradient-to-r from-[#E82127] to-[#B31419] text-white shadow-lg shadow-[#E82127]/30"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {o.model}
                  </button>
                ))}
              </div>

              {/* Window Sticker Modal Button */}
              <button
                onClick={() => setShowStickerModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-mono font-bold text-white transition-colors"
              >
                <FileText className="h-3.5 w-3.5 text-[#E82127]" />
                <span>Monroney Sticker</span>
              </button>

              {/* Sign Out Button */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-mono text-white/60 hover:text-white transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Feedback alert for simulated remote chassis controls */}
          {remoteActionFeedback && (
            <div className="mt-5 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 font-mono text-xs text-emerald-400 flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>{remoteActionFeedback}</span>
              </div>
              <span className="text-[10px] text-white/50">Telecommand Confirmed</span>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 flex border-b border-white/15 gap-4 sm:gap-8 text-sm font-mono overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "tracker", label: "01. Production Stepper & Visuals" },
            { id: "telemetry", label: "02. Satellite Telemetry & Remote Actions" },
            { id: "finance", label: "03. Financial Escrow & Ledger" },
            { id: "settings", label: "04. Automated Alerts" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3.5 transition-all border-b-2 -mb-[1px] uppercase tracking-wider text-xs font-bold whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-[#E82127] text-white shadow-[0_2px_12px_rgba(232,33,39,0.5)]"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================================================================= */}
        {/* TAB 1: PRODUCTION & DELIVERY STEPPER WITH MULTI-ANGLE SHOWCASE   */}
        {/* ================================================================= */}
        {activeTab === "tracker" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Vehicle Card with Interactive Angles Selector */}
            <div className="lg:col-span-5 rounded-3xl border border-white/15 bg-[#0C0D12]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-6">
              
              {/* Image Viewport */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black">
                <img
                  src={currentAngle.image}
                  alt={currentAngle.label}
                  className="h-full w-full object-cover object-center filter contrast-110 transition-all duration-500"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 rounded-full bg-black/85 border border-white/20 px-3 py-1 text-[11px] font-mono font-bold text-white backdrop-blur-md">
                  VIEW: {currentAngle.label.toUpperCase()}
                </div>

                <div className="absolute bottom-3 left-3 rounded-full bg-black/85 border border-white/20 px-3 py-1 text-[11px] font-mono text-white/80 backdrop-blur-md">
                  VIN: {order.vin}
                </div>
              </div>

              {/* Interactive Camera Angle Selector Pills */}
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/50 mb-2">
                  Select Visual Perspective:
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {order.angles.map((ang, idx) => (
                    <button
                      key={ang.id}
                      onClick={() => setActiveAngleIndex(idx)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                        activeAngleIndex === idx
                          ? "border-[#E82127] bg-[#E82127]/20 text-white shadow-md shadow-[#E82127]/20"
                          : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="text-base">{ang.icon}</span>
                      <span className="text-[9px] font-mono font-bold mt-1 truncate w-full">
                        {ang.label.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Title & Trim */}
              <div>
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#E82127] font-bold">
                  {order.edition}
                </div>
                <h2 className="text-3xl font-black tracking-tight text-white mt-1 font-sans">
                  {order.model}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className="h-3 w-3 rounded-full border border-white/30"
                    style={{ backgroundColor: order.colorHex }}
                  />
                  <p className="text-xs font-mono text-white/70">Finish: {order.color}</p>
                </div>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                {order.specs.map((s, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                      {s.label}
                    </div>
                    <div className="text-xl font-mono font-bold text-white mt-1">
                      {s.value} <span className="text-xs text-[#E82127] font-normal">{s.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Meta */}
              <div className="space-y-2 text-xs font-mono border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Target Handover Date:</span>
                  <span className="font-bold text-white">{order.estDelivery}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Handover Location:</span>
                  <span className="font-bold text-white">{order.deliveryLocation}</span>
                </div>
              </div>
            </div>

            {/* Stepper Timeline & Quality Inspection */}
            <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-[#0C0D12]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-6">
              
              {/* Progress Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <h3 className="text-lg font-bold text-white font-sans">
                    Assembly & Handover Milestones
                  </h3>
                  <p className="text-xs font-mono text-white/60 mt-0.5">
                    Stage {order.stageIndex + 1} of {order.stages.length} · {order.status}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-mono font-black text-[#E82127]">
                    {order.progressPercent}%
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                    Production Complete
                  </div>
                </div>
              </div>

              {/* Progress Bar with Glow */}
              <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#E82127] via-[#FF3B42] to-[#E82127] transition-all duration-1000 shadow-[0_0_16px_rgba(232,33,39,0.9)]"
                  style={{ width: `${order.progressPercent}%` }}
                />
              </div>

              {/* Milestones List with Expanded Inspector QA Notes */}
              <div className="space-y-5 pt-2">
                {order.stages.map((stage, idx) => {
                  const isDone = stage.status === "completed";
                  const isCurrent = stage.status === "current";

                  return (
                    <div
                      key={idx}
                      className={`relative flex gap-4 items-start p-4 rounded-2xl border transition-all ${
                        isCurrent
                          ? "border-[#E82127]/60 bg-[#E82127]/10 shadow-[0_0_20px_rgba(232,33,39,0.15)]"
                          : isDone
                          ? "border-emerald-500/20 bg-emerald-500/5"
                          : "border-white/5 bg-white/[0.02] opacity-60"
                      }`}
                    >
                      <div className="relative flex flex-col items-center">
                        <div
                          className={`grid h-9 w-9 place-items-center rounded-full border transition-all ${
                            isDone
                              ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                              : isCurrent
                              ? "border-[#E82127] bg-[#E82127] text-white shadow-[0_0_16px_rgba(232,33,39,0.9)] animate-pulse"
                              : "border-white/20 bg-white/5 text-white/50"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <span className="text-xs font-mono font-bold">{idx + 1}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4
                            className={`text-sm font-bold font-sans ${
                              isCurrent
                                ? "text-white"
                                : isDone
                                ? "text-white"
                                : "text-white/60"
                            }`}
                          >
                            {stage.name}
                          </h4>
                          <span
                            className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                              isCurrent
                                ? "bg-[#E82127]/20 text-[#E82127] font-bold border border-[#E82127]/40"
                                : isDone
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "text-white/40"
                            }`}
                          >
                            {stage.date}
                          </span>
                        </div>

                        <p className="text-xs text-white/70 mt-1.5 leading-relaxed font-sans">
                          {stage.desc}
                        </p>

                        {/* Inspector Note & Audit Stamp */}
                        <div className="mt-3 rounded-xl border border-white/10 bg-black/40 p-2.5 text-[11px] font-mono space-y-1">
                          <div className="flex items-center justify-between text-white/50 text-[10px]">
                            <span>INSPECTOR: {stage.inspector.toUpperCase()}</span>
                            <span>QA STAMP: PASS</span>
                          </div>
                          <div className="text-white/80 font-mono text-[11px]">
                            ↳ {stage.qaNote}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: LIVE TELEMETRY & CHASSIS REMOTE CONTROLS                   */}
        {/* ================================================================= */}
        {activeTab === "telemetry" && (
          <div className="space-y-8">
            
            {/* Top Telemetry Sensors Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-white/15 bg-[#0C0D12]/90 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between text-xs font-mono text-white/50 uppercase">
                  <span>Battery Storage</span>
                  <Zap className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-mono font-bold text-white mt-2">98.4%</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">200 kWh High-Density Cell</div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-[#0C0D12]/90 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between text-xs font-mono text-white/50 uppercase">
                  <span>Cold-Gas Thrusters</span>
                  <Flame className="h-4 w-4 text-[#E82127]" />
                </div>
                <div className="text-3xl font-mono font-bold text-white mt-2">10,000 <span className="text-xs font-normal">PSI</span></div>
                <div className="text-[11px] text-[#E82127] font-mono mt-1">Composite COPV Tanks Full</div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-[#0C0D12]/90 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between text-xs font-mono text-white/50 uppercase">
                  <span>Satellite Ping</span>
                  <Wifi className="h-4 w-4 text-blue-400" />
                </div>
                <div className="text-3xl font-mono font-bold text-white mt-2">&lt; 11 <span className="text-xs font-normal">ms</span></div>
                <div className="text-[11px] text-blue-400 font-mono mt-1">Starlink Direct-to-Cell</div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-[#0C0D12]/90 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between text-xs font-mono text-white/50 uppercase">
                  <span>Chassis Status</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-mono font-bold text-white mt-2">SECURED</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">Perimeter Guard Engaged</div>
              </div>
            </div>

            {/* Interactive Remote Action Cockpit Console */}
            <div className="rounded-3xl border border-white/15 bg-[#0C0D12]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-sans">
                    Direct Chassis Telecommand Controls
                  </h3>
                  <p className="text-xs font-mono text-white/60 mt-0.5">
                    Send real-time encrypted commands to the vehicle test rig.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-mono text-emerald-400">
                  Ready for Input
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => triggerRemoteAction("lights", "Matrix LED Headlights flashed 3 times for visual verification.")}
                  disabled={actionLoading !== null}
                  className="flex flex-col items-start justify-between p-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-[0.98] text-left"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/10 grid place-items-center mb-3 text-white">
                    <Sparkles className="h-5 w-5 text-[#E82127]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-sans">Flash Matrix Beams</div>
                    <div className="text-[11px] text-white/50 font-mono mt-0.5">3-pulse signature beacon</div>
                  </div>
                </button>

                <button
                  onClick={() => triggerRemoteAction("thrusters", "Cold-Gas Thruster manifold purge complete. 50 PSI test puff fired.")}
                  disabled={actionLoading !== null}
                  className="flex flex-col items-start justify-between p-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-[0.98] text-left"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/10 grid place-items-center mb-3 text-white">
                    <Flame className="h-5 w-5 text-[#E82127]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-sans">Purge Thruster Nozzles</div>
                    <div className="text-[11px] text-white/50 font-mono mt-0.5">Test cold-gas reaction puff</div>
                  </div>
                </button>

                <button
                  onClick={() => triggerRemoteAction("cabin", "Thermal preconditioning active: Cabin target 68°F, Battery pack heated.")}
                  disabled={actionLoading !== null}
                  className="flex flex-col items-start justify-between p-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-[0.98] text-left"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/10 grid place-items-center mb-3 text-white">
                    <Zap className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-sans">Precondition Pack</div>
                    <div className="text-[11px] text-white/50 font-mono mt-0.5">Optimum race track temp</div>
                  </div>
                </button>

                <button
                  onClick={() => triggerRemoteAction("security", "Chassis security lock verified: Keycards synchronized.")}
                  disabled={actionLoading !== null}
                  className="flex flex-col items-start justify-between p-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-[0.98] text-left"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/10 grid place-items-center mb-3 text-white">
                    <Key className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-sans">Lock Vehicle Monolith</div>
                    <div className="text-[11px] text-white/50 font-mono mt-0.5">Encrypt Bluetooth keys</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Simulated Live Location HUD & TPMS Gauge */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Radar Position */}
              <div className="lg:col-span-8 rounded-3xl border border-white/15 bg-black/80 p-6 sm:p-8 backdrop-blur-2xl">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-sans">
                      Chassis Telemetry Radar & GPS
                    </h3>
                    <p className="text-xs font-mono text-white/60 mt-0.5">
                      Chassis GPS: 37°29'38.5"N 121°56'59.9"W · Fremont Factory High-Speed Testing Track
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    Radar Live
                  </div>
                </div>

                <div className="mt-6 aspect-[21/10] w-full rounded-2xl border border-white/10 bg-[#07080B] p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#E82127_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="relative z-10 flex items-center justify-between text-xs font-mono text-white/60">
                    <div>ACCELEROMETER: <span className="text-white font-bold">0.00 G</span></div>
                    <div>INVERTER TEMP: <span className="text-white font-bold">41.2°C</span></div>
                  </div>

                  <div className="relative z-10 text-center space-y-2">
                    <div className="mx-auto h-16 w-16 rounded-full border-2 border-[#E82127] bg-[#E82127]/20 grid place-items-center shadow-[0_0_30px_rgba(232,33,39,0.9)] animate-pulse">
                      <Car className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                      {order.model} · {order.vin}
                    </div>
                    <p className="text-xs text-white/60 font-mono">
                      Mounted on Autonomous Dyno Verification Rig 04
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-xs font-mono text-white/60">
                    <div>ELEVATION: 54 FT</div>
                    <div>ODOMETER: 12.4 MILES</div>
                  </div>
                </div>
              </div>

              {/* 4-Wheel TPMS Tire Pressure Visualizer */}
              <div className="lg:col-span-4 rounded-3xl border border-white/15 bg-[#0C0D12]/90 p-6 sm:p-8 backdrop-blur-2xl space-y-4">
                <h3 className="text-lg font-bold text-white font-sans border-b border-white/10 pb-3">
                  Tire Pressure (TPMS)
                </h3>
                <div className="grid grid-cols-2 gap-3 text-center font-mono">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[10px] text-white/50">FRONT LEFT</div>
                    <div className="text-2xl font-bold text-emerald-400 mt-1">42.0 <span className="text-xs">PSI</span></div>
                    <div className="text-[10px] text-white/40 mt-1">102°F · Optimal</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[10px] text-white/50">FRONT RIGHT</div>
                    <div className="text-2xl font-bold text-emerald-400 mt-1">42.0 <span className="text-xs">PSI</span></div>
                    <div className="text-[10px] text-white/40 mt-1">102°F · Optimal</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[10px] text-white/50">REAR LEFT</div>
                    <div className="text-2xl font-bold text-emerald-400 mt-1">44.0 <span className="text-xs">PSI</span></div>
                    <div className="text-[10px] text-white/40 mt-1">104°F · Optimal</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[10px] text-white/50">REAR RIGHT</div>
                    <div className="text-2xl font-bold text-emerald-400 mt-1">44.0 <span className="text-xs">PSI</span></div>
                    <div className="text-[10px] text-white/40 mt-1">104°F · Optimal</div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono text-white/60">
                  Michelin Pilot Sport Cup 2 Track Tires verified with high-speed balancing.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: FINANCIAL ESCROW & LEDGER                                  */}
        {/* ================================================================= */}
        {activeTab === "finance" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-[#0C0D12]/90 p-6 sm:p-8 backdrop-blur-2xl space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 font-sans">
                Official Vehicle Ledger & Billing Breakdown
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/60">Base Chassis Price ({order.model})</span>
                  <span className="text-white font-bold">${order.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/60">Founders Series Cold-Gas Thrusters</span>
                  <span className="text-emerald-400 font-bold">Included ($0)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/60">Titanium White Paint & Raw Carbon Inlays</span>
                  <span className="text-emerald-400 font-bold">Included ($0)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10 text-emerald-400">
                  <span>Initial Security Deposit Escrow (Paid)</span>
                  <span className="font-bold">-${order.depositPaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-4 text-base font-bold">
                  <span className="text-white">Balance Due Upon Delivery Handover:</span>
                  <span className="text-[#E82127] text-2xl font-mono">
                    ${(order.basePrice - order.depositPaid).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => alert("Official Tax Invoice PDF downloaded.")}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3 text-xs font-mono uppercase tracking-wider font-bold text-white transition-colors"
                >
                  <Download className="h-4 w-4 text-[#E82127]" />
                  Download Escrow Receipt PDF
                </button>

                <button
                  onClick={() => setShowStickerModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#E82127]/40 bg-[#E82127]/10 hover:bg-[#E82127]/20 px-5 py-3 text-xs font-mono uppercase tracking-wider font-bold text-white transition-colors"
                >
                  <FileText className="h-4 w-4 text-[#E82127]" />
                  View Monroney Window Sticker
                </button>
              </div>
            </div>

            {/* Settle Deposit / Payment Method */}
            <div className="lg:col-span-5 rounded-3xl border border-white/15 bg-[#0C0D12]/90 p-6 sm:p-8 backdrop-blur-2xl space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 font-sans">
                Escrow Settlement Gateway
              </h3>

              {paymentSuccess ? (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-white">Payment Method Secured & Verified</div>
                  <p className="text-xs text-white/60 font-mono">
                    Your escrow account is validated. Final balance will automatically settle at the track upon handover.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-white/60 font-mono leading-relaxed">
                    Select your preferred settlement rail for closing the final balance at vehicle handover:
                  </p>

                  <div className="space-y-2">
                    {[
                      "Direct Federal Wire (ACH / FedNow / SWIFT)",
                      "Private Banking Signature Line",
                      "Digital Asset / Bitcoin Lightning Settlement",
                    ].map((method, idx) => (
                      <label
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3.5 cursor-pointer hover:border-white/30 transition-colors"
                      >
                        <span className="text-xs font-mono font-medium text-white">{method}</span>
                        <input type="radio" name="payment_method" defaultChecked={idx === 0} />
                      </label>
                    ))}
                  </div>

                  <button
                    onClick={() => setPaymentSuccess(true)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E82127] to-[#B31419] px-6 py-4 text-xs font-mono uppercase tracking-wider font-bold text-white shadow-[0_0_20px_rgba(232,33,39,0.5)] transition-all hover:brightness-110 active:scale-[0.99]"
                  >
                    <CreditCard className="h-4 w-4" />
                    Verify Escrow Settlement Method
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: AUTOMATED NOTIFICATION DISPATCH SETTINGS                   */}
        {/* ================================================================= */}
        {activeTab === "settings" && (
          <div className="max-w-3xl mx-auto rounded-3xl border border-white/15 bg-[#0C0D12]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 font-sans">
              Automated Production & Delivery Dispatch Alerts
            </h3>
            <p className="text-xs font-mono text-white/60">
              Configure real-time push dispatches directly to your mobile device and email.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "High-Resolution Assembly Photos",
                  desc: "Automated photo delivery as your chassis enters robotic carbon layup and motor mounting.",
                },
                {
                  title: "Flight Thruster Calibration Logs",
                  desc: "Direct telemetric notifications during wind-tunnel and 10,000 PSI cold-gas testing.",
                },
                {
                  title: "Track Day VIP Handover Scheduling",
                  desc: "Priority notification when your delivery slot opens 30 days before factory release.",
                },
                {
                  title: "Over-the-Air Firmware Manifest",
                  desc: "Detailed release notes for new autonomy, dyno profiling, and launch control maps.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4.5"
                >
                  <div className="pr-4">
                    <div className="text-sm font-bold text-white font-sans">{item.title}</div>
                    <div className="text-xs text-white/50 font-mono mt-0.5">{item.desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 rounded border-white/20 bg-black text-[#E82127] focus:ring-[#E82127] cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ================================================================= */}
      {/* MONRONEY WINDOW STICKER MODAL                                     */}
      {/* ================================================================= */}
      {showStickerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/20 bg-[#0d0e14] p-6 sm:p-8 text-white shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <X3Logo3D size="sm" />
                <h3 className="text-lg font-bold font-sans">
                  Official Monroney Vehicle Window Sticker
                </h3>
              </div>
              <button
                onClick={() => setShowStickerModal(false)}
                className="rounded-full border border-white/15 bg-white/5 p-1.5 text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl border border-white/15 bg-black p-5 font-mono text-xs space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <div>
                  <div className="font-bold text-white text-sm">{order.model}</div>
                  <div className="text-white/50 text-[10px]">{order.edition}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/50 text-[10px]">VIN IDENTIFIER</div>
                  <div className="font-bold text-white">{order.vin}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[11px]">
                <div>
                  <span className="text-white/50">EXTERIOR FINISH:</span>
                  <div className="font-bold text-white">{order.color}</div>
                </div>
                <div>
                  <span className="text-white/50">INTERIOR:</span>
                  <div className="font-bold text-white">White & Raw Carbon Sport Bucket</div>
                </div>
                <div>
                  <span className="text-white/50">POWERTRAIN:</span>
                  <div className="font-bold text-white">Tri-Motor AWD + Cold-Gas Package</div>
                </div>
                <div>
                  <span className="text-white/50">MANUFACTURING:</span>
                  <div className="font-bold text-white">Austin Gigasite, Texas, USA</div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between items-center text-sm font-bold">
                <span>TOTAL SUGGESTED RETAIL (MSRP):</span>
                <span className="text-[#E82127] text-xl font-mono">${order.basePrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => setShowStickerModal(false)}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white/70 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert("Official Monroney PDF generated.");
                  setShowStickerModal(false);
                }}
                className="rounded-xl bg-gradient-to-r from-[#E82127] to-[#B31419] px-4 py-2.5 font-bold text-white"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
