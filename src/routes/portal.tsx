import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
} from "lucide-react";
import { X3Logo3D } from "@/components/x3-logo-3d";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/portal")({
  component: CustomerPortalPage,
  head: () => ({
    meta: [
      { title: "X3 Customer Portal — Order & Production Telemetry" },
      {
        name: "description",
        content: "Track your X3 vehicle build in real-time, inspect production milestones, and manage payment allocations.",
      },
    ],
  }),
});

interface VehicleOrder {
  id: string;
  vin: string;
  model: string;
  edition: string;
  color: string;
  image: string;
  status: string;
  stageIndex: number;
  progressPercent: number;
  estDelivery: string;
  deliveryLocation: string;
  basePrice: number;
  depositPaid: number;
  specs: { label: string; value: string }[];
  stages: { name: string; date: string; status: "completed" | "current" | "upcoming"; desc: string }[];
}

const DEMO_ORDERS: VehicleOrder[] = [
  {
    id: "X3-RDS-9042",
    vin: "X3RDS9042F00188",
    model: "X3 Roadster",
    edition: "Founders Series · Aero Flight Thruster Pack",
    color: "Titanium White & Raw Carbon",
    image: "/assets/roadster/roadster-studio-white.jpg",
    status: "In Production · Stage 3 of 5",
    stageIndex: 2,
    progressPercent: 78,
    estDelivery: "August 2026",
    deliveryLocation: "X3 Delivery Hub · Austin, TX",
    basePrice: 250000,
    depositPaid: 50000,
    specs: [
      { label: "0-60 MPH", value: "1.9 sec" },
      { label: "Top Speed", value: "+250 mph" },
      { label: "Range", value: "620 mi" },
      { label: "Drive", value: "Tri-Motor AWD" },
    ],
    stages: [
      {
        name: "Reservation & Allocation",
        date: "Confirmed · Oct 14, 2025",
        status: "completed",
        desc: "Founders Series reservation locked with initial $50,000 security deposit.",
      },
      {
        name: "Carbon Monocoque Assembly",
        date: "Completed · Jan 28, 2026",
        status: "completed",
        desc: "Single-piece structural composite safety cell laser-cured with aerospace tolerances.",
      },
      {
        name: "Tri-Motor & Cold-Gas Thrusters",
        date: "Active Phase · Current",
        status: "current",
        desc: "Integrating 10,000 Nm permanent-magnet motors and composite cold-gas aerodynamic thruster assembly.",
      },
      {
        name: "Autonomous Dyno Calibration",
        date: "Scheduled · June 2026",
        status: "upcoming",
        desc: "Wind-tunnel aero verification, track dyno validation, and sovereign firmware flashing.",
      },
      {
        name: "Track Handover & Final Delivery",
        date: "Target · August 2026",
        status: "upcoming",
        desc: "Private track day handover, keycard synchronization, and pilot orientation.",
      },
    ],
  },
  {
    id: "X3-CYB-3310",
    vin: "X3CYB3310T00941",
    model: "X3 Cybertruck",
    edition: "Cyberbeast Tri-Motor · Armor Exoskeleton",
    color: "Stainless Steel Monolith",
    image: "/assets/cybertruck/cybertruck-hero.avif",
    status: "Scheduled for Stamping",
    stageIndex: 1,
    progressPercent: 35,
    estDelivery: "November 2026",
    deliveryLocation: "X3 Delivery Hub · Austin, TX",
    basePrice: 99990,
    depositPaid: 25000,
    specs: [
      { label: "0-60 MPH", value: "2.6 sec" },
      { label: "Towing", value: "11,000 lbs" },
      { label: "Range", value: "340 mi" },
      { label: "Armor", value: "30X Steel" },
    ],
    stages: [
      {
        name: "Reservation & Allocation",
        date: "Confirmed · Dec 02, 2025",
        status: "completed",
        desc: "Exoskeleton order queued in Austin Gigasite allocation queue.",
      },
      {
        name: "30X Exoskeleton Pressing",
        date: "Active Phase · In Progress",
        status: "current",
        desc: "Hydro-formed Ultra-Hard cold-rolled panels undergoing automated robotic alignment.",
      },
      {
        name: "Cyberbeast Tri-Motor Powertrain",
        date: "Scheduled · July 2026",
        status: "upcoming",
        desc: "Steer-by-wire calibration and tri-motor inverter rack mounting.",
      },
      {
        name: "Durability & Ballistic Testing",
        date: "Scheduled · Sept 2026",
        status: "upcoming",
        desc: "Acoustic glass inspection and multi-terrain air suspension testing.",
      },
      {
        name: "Customer Delivery Handover",
        date: "Target · Nov 2026",
        status: "upcoming",
        desc: "White-glove delivery to customer residence or service center.",
      },
    ],
  },
];

export function CustomerPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (localStorage.getItem("x3_pilot_authenticated") === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);
  const [emailInput, setEmailInput] = useState("pilot@x3.engineering");
  const [passwordInput, setPasswordInput] = useState("X3Roadster2026!");
  const [authError, setAuthError] = useState("");
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"tracker" | "telemetry" | "finance" | "settings">("tracker");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const order = DEMO_ORDERS[selectedOrderIndex];

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (emailInput.trim().length > 3 && passwordInput.length > 4) {
      localStorage.setItem("x3_pilot_authenticated", "true");
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Please enter valid pilot credentials.");
    }
  };

  const handleQuickDemoLogin = () => {
    setEmailInput("pilot@x3.engineering");
    setPasswordInput("X3Roadster2026!");
    localStorage.setItem("x3_pilot_authenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("x3_pilot_authenticated");
    setIsAuthenticated(false);
  };

  // If not authenticated, show high-tech Tesla authentication gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-between">
        <SiteHeader />

        <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-16 sm:px-6">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-black/80 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl">
            {/* Header Badge */}
            <div className="flex flex-col items-center text-center space-y-3">
              <X3Logo3D size="md" />
              <div className="mt-2 text-xs font-mono uppercase tracking-[0.25em] text-[var(--primary)] font-bold">
                Pilot Portal Access
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Vehicle Fleet & Order Telemetry
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                Log in to monitor live assembly progress, delivery tracking, and vehicle status.
              </p>
            </div>

            {/* Test Credentials Callout Box */}
            <div className="my-6 rounded-2xl border border-[var(--primary)]/40 bg-[var(--primary)]/10 p-4 text-xs font-mono space-y-1.5">
              <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                <Sparkles className="h-4 w-4" />
                <span>Verified Test Credentials</span>
              </div>
              <div className="text-white/90">
                <span className="text-muted-foreground">Email:</span>{" "}
                <span className="text-white font-bold select-all">pilot@x3.engineering</span>
              </div>
              <div className="text-white/90">
                <span className="text-muted-foreground">Password:</span>{" "}
                <span className="text-white font-bold select-all">X3Roadster2026!</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[var(--primary)] focus:outline-none transition-colors"
                  placeholder="name@domain.com"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Password / Access Key
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[var(--primary)] focus:outline-none transition-colors"
                  placeholder="••••••••••••"
                  required
                />
              </div>

              {authError && <div className="text-xs font-mono text-red-500">{authError}</div>}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-mono uppercase tracking-wider font-bold text-white shadow-xl transition-all hover:scale-[1.02]"
                style={{ background: "var(--gradient-gold)" }}
              >
                <Lock className="h-4 w-4" />
                Sign In to Portal
              </button>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold text-white hover:bg-white/10 transition-colors"
              >
                <Zap className="h-4 w-4 text-[var(--primary)]" />
                One-Click Instant Pilot Access
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-xs font-mono text-muted-foreground hover:text-white transition-colors"
              >
                ← Return to X3 Flagship
              </Link>
            </div>
          </div>
        </div>

        <SiteFooter />
      </div>
    );
  }

  // Authenticated Customer Dashboard
  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-between">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:py-12">
        {/* Top Pilot Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border border-[var(--primary)]/50 bg-[var(--primary)]/10 grid place-items-center">
              <Car className="h-5 w-5 text-[var(--primary)]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                  Pilot Command & Delivery Center
                </h1>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                  LIVE TELEMETRY
                </span>
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                Authenticated as: <span className="text-white font-medium">pilot@x3.engineering</span> · Account: #X3-ACC-782
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Multi-Vehicle Switcher */}
            <div className="inline-flex rounded-xl border border-white/15 bg-white/5 p-1">
              {DEMO_ORDERS.map((o, idx) => (
                <button
                  key={o.id}
                  onClick={() => setSelectedOrderIndex(idx)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-mono font-semibold transition-all ${
                    selectedOrderIndex === idx
                      ? "bg-[var(--primary)] text-white shadow-md"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {o.model}
                </button>
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-mono text-muted-foreground hover:bg-white/10 hover:text-white transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 flex border-b border-white/10 gap-6 text-sm font-mono">
          {[
            { id: "tracker", label: "01. Production Stepper" },
            { id: "telemetry", label: "02. Satellite Telemetry" },
            { id: "finance", label: "03. Financial & Payment" },
            { id: "settings", label: "04. Alert Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 transition-colors border-b-2 -mb-[1px] uppercase tracking-wider text-xs font-semibold ${
                activeTab === tab.id
                  ? "border-[var(--primary)] text-white"
                  : "border-transparent text-muted-foreground hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: PRODUCTION & DELIVERY STEPPER */}
        {activeTab === "tracker" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Vehicle Hero Card */}
            <div className="lg:col-span-5 rounded-3xl border border-white/15 bg-[var(--surface-elevated)]/80 p-6 sm:p-8 backdrop-blur-xl space-y-6">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={order.image}
                  alt={order.model}
                  className="h-full w-full object-cover object-center filter contrast-110"
                />
                <div className="absolute top-3 left-3 rounded-full bg-black/80 border border-white/20 px-3 py-1 text-[11px] font-mono font-bold text-white backdrop-blur-md">
                  VIN: {order.vin}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--primary)] font-bold">
                  {order.edition}
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white mt-1">{order.model}</h2>
                <p className="text-xs font-mono text-muted-foreground mt-1">Color: {order.color}</p>
              </div>

              {/* Specs Strip */}
              <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                {order.specs.map((s, idx) => (
                  <div key={idx}>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </div>
                    <div className="text-lg font-mono font-bold text-white mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Delivery Meta */}
              <div className="space-y-2 text-xs font-mono border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Target Delivery Date:</span>
                  <span className="font-bold text-white">{order.estDelivery}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivery Center:</span>
                  <span className="font-bold text-white">{order.deliveryLocation}</span>
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-[var(--surface-elevated)]/80 p-6 sm:p-8 backdrop-blur-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Live Assembly & Handover Pipeline</h3>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    Stage {order.stageIndex + 1} of {order.stages.length} · {order.status}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-mono font-bold text-[var(--primary)]">
                    {order.progressPercent}%
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Assembly Complete
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--primary)] transition-all duration-1000 shadow-[0_0_12px_rgba(232,33,39,0.8)]"
                  style={{ width: `${order.progressPercent}%` }}
                />
              </div>

              {/* Milestones List */}
              <div className="space-y-6 pt-2">
                {order.stages.map((stage, idx) => {
                  const isDone = stage.status === "completed";
                  const isCurrent = stage.status === "current";

                  return (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="relative flex flex-col items-center">
                        <div
                          className={`grid h-8 w-8 place-items-center rounded-full border transition-all ${
                            isDone
                              ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                              : isCurrent
                              ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-[0_0_12px_rgba(232,33,39,0.8)] animate-pulse"
                              : "border-white/20 bg-white/5 text-muted-foreground"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <span className="text-xs font-mono font-bold">{idx + 1}</span>
                          )}
                        </div>
                        {idx < order.stages.length - 1 && (
                          <div
                            className={`h-14 w-[1px] my-1 ${
                              isDone ? "bg-emerald-500/50" : "bg-white/10"
                            }`}
                          />
                        )}
                      </div>

                      <div className="flex-1 pb-2">
                        <div className="flex items-center justify-between gap-2">
                          <h4
                            className={`text-sm font-bold ${
                              isCurrent ? "text-white" : isDone ? "text-white/90" : "text-muted-foreground"
                            }`}
                          >
                            {stage.name}
                          </h4>
                          <span
                            className={`text-[11px] font-mono ${
                              isCurrent
                                ? "text-[var(--primary)] font-bold"
                                : isDone
                                ? "text-emerald-400"
                                : "text-muted-foreground"
                            }`}
                          >
                            {stage.date}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-sans">
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE TELEMETRY & SATELLITE LINK */}
        {activeTab === "telemetry" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-muted-foreground">Battery Storage</span>
                  <Zap className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-mono font-bold text-white mt-3">98.4%</div>
                <div className="text-xs text-emerald-400 font-mono mt-1">200 kWh High-Density Pack · Healthy</div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-muted-foreground">Satellite Link</span>
                  <Wifi className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-3xl font-mono font-bold text-white mt-3">&lt; 14 ms</div>
                <div className="text-xs text-blue-400 font-mono mt-1">Falcon Mesh Uplink · Synchronized</div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-muted-foreground">Firmware Engine</span>
                  <ShieldCheck className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <div className="text-3xl font-mono font-bold text-white mt-3">v2026.14.2</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">Cold-Gas Thruster Package Active</div>
              </div>
            </div>

            {/* Simulated Live Location HUD */}
            <div className="rounded-3xl border border-white/15 bg-black/60 p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Current Vehicle Telemetry Beacon</h3>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    Chassis GPS: 37°29'38.5"N 121°56'59.9"W · Fremont Factory High-Speed Loop
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  Signal Secured
                </div>
              </div>

              <div className="mt-6 aspect-[21/9] w-full rounded-2xl border border-white/10 bg-[#0A0B0E] p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#E82127_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="text-xs font-mono text-muted-foreground">
                    ACCELEROMETER: <span className="text-white font-bold">0.00 G</span>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    CABIN TEMP: <span className="text-white font-bold">68.0°F</span>
                  </div>
                </div>

                <div className="relative z-10 text-center space-y-2">
                  <div className="mx-auto h-16 w-16 rounded-full border-2 border-[var(--primary)] bg-[var(--primary)]/20 grid place-items-center shadow-[0_0_24px_rgba(232,33,39,0.9)] animate-pulse">
                    <Car className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                    {order.model} · {order.vin}
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    Undergoing precision dyno calibration in test bay 4
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <div>TYRE PRESSURE: 42 PSI</div>
                  <div>SECURITY PERIMETER: ENGAGED</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FINANCIAL LEDGER & PAYMENT SETTLEMENT */}
        {activeTab === "finance" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-[var(--surface-elevated)]/80 p-6 sm:p-8 backdrop-blur-xl space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
                Vehicle Ledger & Billing Breakdown
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Vehicle Base Price ({order.model})</span>
                  <span className="text-white font-bold">${order.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Founders Series Thruster Pack & Aero Package</span>
                  <span className="text-emerald-400 font-bold">Included</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Titanium White Paint & Carbon Inlay</span>
                  <span className="text-emerald-400 font-bold">Included</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10 text-emerald-400">
                  <span>Initial Reservation Security Deposit (Paid)</span>
                  <span>-${order.depositPaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 text-base font-bold">
                  <span className="text-white">Balance Due Upon Delivery Handover:</span>
                  <span className="text-[var(--primary)] text-xl font-mono">
                    ${(order.basePrice - order.depositPaid).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => alert("Official Tax Invoice PDF downloaded.")}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-mono uppercase tracking-wider font-bold text-white hover:bg-white/10 transition-colors"
                >
                  <Download className="h-4 w-4 text-[var(--primary)]" />
                  Download Official Receipt PDF
                </button>
              </div>
            </div>

            {/* Payment Method / Settle Deposit */}
            <div className="lg:col-span-5 rounded-3xl border border-white/15 bg-[var(--surface-elevated)]/80 p-6 sm:p-8 backdrop-blur-xl space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
                Escrow & Payment Gateway
              </h3>

              {paymentSuccess ? (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-white">Payment Method Secured</div>
                  <p className="text-xs text-muted-foreground font-mono">
                    Your allocation account is validated. Final balance will automatically settle upon handover.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                    Select your preferred settlement rail for closing the final balance or funding additional accessories.
                  </p>

                  <div className="space-y-2">
                    {["Direct Federal Wire (ACH/SWIFT)", "Private Banking Card", "Digital Asset / Bitcoin Lightning"].map(
                      (method, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3.5 cursor-pointer hover:border-white/30 transition-colors"
                        >
                          <span className="text-xs font-mono font-medium text-white">{method}</span>
                          <input type="radio" name="payment_method" defaultChecked={idx === 0} />
                        </label>
                      )
                    )}
                  </div>

                  <button
                    onClick={() => setPaymentSuccess(true)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-mono uppercase tracking-wider font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    <CreditCard className="h-4 w-4" />
                    Verify Settlement Method
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: AUTOMATED CUSTOMER NOTIFICATIONS */}
        {activeTab === "settings" && (
          <div className="max-w-2xl mx-auto rounded-3xl border border-white/15 bg-[var(--surface-elevated)]/80 p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
              Automated Customer Dispatch Alerts
            </h3>
            <p className="text-xs font-mono text-muted-foreground">
              Configure real-time automated updates sent to your registered contact channels.
            </p>

            <div className="space-y-4">
              {[
                { title: "Assembly Milestone Photos", desc: "Receive high-resolution photographs as your chassis moves between robotic stations." },
                { title: "Firmware OTA Notifications", desc: "Automatic alerts whenever new autonomy or flight-thruster profiles are flashed." },
                { title: "Delivery Handover Scheduling", desc: "Direct appointment scheduler for track day delivery once vehicle clears QA." },
                { title: "Financial & Escrow Receipts", desc: "Instant cryptographic payment receipts and warranty certificates." },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="pr-4">
                    <div className="text-sm font-bold text-white">{item.title}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">{item.desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-white/20 bg-black text-[var(--primary)] focus:ring-[var(--primary)]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
