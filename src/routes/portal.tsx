import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
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
  Unlock,
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
  VolumeX,
  ShoppingCart,
  PlusCircle,
  Cpu,
  RefreshCw,
  Terminal,
  Compass,
  AlertTriangle,
  Fan,
  Navigation,
  BatteryCharging,
  SlidersHorizontal,
  ChevronDown,
  Info,
  Play,
  Pause,
  RotateCw,
} from "lucide-react";
import { X3Logo3D } from "@/components/x3-logo-3d";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/portal")({
  component: CustomerPortalPage,
  head: () => ({
    meta: [
      { title: "Tesla & X3 Customer Account — Dynamic 3D Vehicle Dashboard & Upgrades" },
      {
        name: "description",
        content: "Official Tesla owner portal: 360-degree interactive 3D vehicle turntable, live motion feed, over-the-air upgrades, and complete order history.",
      },
    ],
  }),
});

function playHapticBeep(type: "click" | "success" | "thruster" | "lock") {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === "click") {
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === "lock") {
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.setValueAtTime(1200, now + 0.06);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === "success") {
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(780, now + 0.08);
      osc.frequency.setValueAtTime(1040, now + 0.16);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "thruster") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (e) {}
}

interface VehicleUpgrade {
  id: string;
  title: string;
  category: "Performance" | "Autonomy" | "Hardware" | "Connectivity";
  badge: string;
  price: number;
  description: string;
  specsBoost: { label: string; value: string };
  installed: boolean;
}

interface PurchaseItem {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: "Completed" | "Escrow Secured";
  txId: string;
}

interface VehicleOrder {
  id: string;
  vin: string;
  name: string;
  model: string;
  trim: string;
  color: string;
  interior: string;
  wheels: string;
  heroVideo?: string;
  galleryImages: { label: string; url: string }[];
  turntableFrames: string[];
  status: "In Assembly" | "Ready for Delivery" | "Delivered";
  deliveryEstimate: string;
  deliveryCenter: string;
  batteryPercent: number;
  rangeMiles: number;
  odometer: number;
  isLocked: boolean;
  climateOn: boolean;
  climateTemp: number;
  sentryActive: boolean;
  chargeLimit: number;
  upgrades: VehicleUpgrade[];
  tasks: { title: string; completed: boolean; desc: string }[];
  documents: { title: string; date: string; size: string }[];
  purchases: PurchaseItem[];
}

// 40 High-Res Roadster Frames for 360-Degree Turntable
const ROADSTER_TURNTABLE_FRAMES = Array.from({ length: 40 }, (_, i) => {
  const num = i + 1 < 10 ? `0${i + 1}` : `${i + 1}`;
  return `/assets/roadster/gallery/roadster-${num}.jpg`;
});

const DEFAULT_VEHICLES: VehicleOrder[] = [
  {
    id: "RN109482710",
    vin: "5YJSA1E26PF904288",
    name: "Founders Roadster",
    model: "X3 Roadster",
    trim: "Founders Series · SpaceX Cold-Gas Thruster Package",
    color: "Titanium Pearl White",
    interior: "Lightweight White Sport Bucket & Yoke",
    wheels: "21\" Forged Aero Carbon Wheels",
    heroVideo: "/assets/roadster/roadster-motion.mp4",
    galleryImages: [
      { label: "Studio White", url: "/assets/roadster/roadster-studio-white.jpg" },
      { label: "Aero Yoke Cockpit", url: "/assets/roadster/roadster-interior-cockpit.jpg" },
      { label: "SpaceX Thrusters", url: "/assets/roadster/roadster-rear-thrusters.jpg" },
      { label: "Track Wheels", url: "/assets/roadster/roadster-wheel-tire.jpg" },
      { label: "Aero Wings", url: "/assets/roadster/roadster-race-profile.jpg" },
    ],
    turntableFrames: ROADSTER_TURNTABLE_FRAMES,
    status: "In Assembly",
    deliveryEstimate: "August 18 – September 04, 2026",
    deliveryCenter: "Tesla Gigafactory Texas Delivery Hub",
    batteryPercent: 98,
    rangeMiles: 620,
    odometer: 14,
    isLocked: true,
    climateOn: false,
    climateTemp: 68,
    sentryActive: true,
    chargeLimit: 90,
    upgrades: [
      {
        id: "upg-spacex",
        title: "SpaceX Cold-Gas Thruster Package",
        category: "Performance",
        badge: "0-60 IN 1.1 SEC",
        price: 25000,
        description: "Surround composite cold-gas helium thrusters providing 1.1s launch, high-G track cornering, and active aerodynamic braking downforce.",
        specsBoost: { label: "0-60 MPH Acceleration", value: "1.9s → 1.1s (Rocket Mode)" },
        installed: true,
      },
      {
        id: "upg-fsd",
        title: "Full Self-Driving (Supervised) HW5",
        category: "Autonomy",
        badge: "FSD V13 READY",
        price: 8000,
        description: "Full point-to-point neural network autonomous driving on highways and city streets with track apex race line autopilot.",
        specsBoost: { label: "Autonomy Level", value: "Level 2 → Supervised FSD" },
        installed: false,
      },
      {
        id: "upg-track-brakes",
        title: "Carbon-Ceramic Matrix Track Brakes",
        category: "Performance",
        badge: "ZERO FADE",
        price: 8500,
        description: "410mm continuous-fiber carbon-silicon-carbide brake discs with high-temperature 6-piston monobloc calipers.",
        specsBoost: { label: "100-0 MPH Braking", value: "285 ft → 215 ft" },
        installed: false,
      },
      {
        id: "upg-starlink",
        title: "Starlink Direct-to-Vehicle Gigabit",
        category: "Connectivity",
        badge: "LEO SATELLITE",
        price: 1500,
        description: "Phased array Starlink antenna built directly into vehicle carbon roof panel for zero dead zones worldwide.",
        specsBoost: { label: "Satellite Uplink", value: "< 12 ms Low Earth Orbit" },
        installed: false,
      },
      {
        id: "upg-armor-wrap",
        title: "Obsidian Stealth Ballistic PPF",
        category: "Hardware",
        badge: "10MIL SATIN",
        price: 6000,
        description: "Self-healing 10mil satin ballistic protection film in deep obsidian black with hydrophobic ceramic coating.",
        specsBoost: { label: "Paint Defense", value: "Standard → 10mil Ballistic Shield" },
        installed: false,
      },
    ],
    tasks: [
      { title: "Delivery Location & Time Window", completed: true, desc: "Gigafactory Texas Delivery Center confirmed." },
      { title: "Registration Details & Identity", completed: true, desc: "Driver license and registration names submitted." },
      { title: "Proof of Active Insurance", completed: true, desc: "Policy validated with Tesla Insurance Network." },
      { title: "Final Balance Escrow Settlement", completed: false, desc: "$50,000 security deposit locked; final balance settles at handover." },
    ],
    documents: [
      { title: "Motor Vehicle Purchase Agreement (MVPA)", date: "Oct 14, 2025", size: "1.4 MB" },
      { title: "Founders Series Reservation Certificate", date: "Oct 14, 2025", size: "840 KB" },
      { title: "Monroney Window Sticker & MSRP Breakdown", date: "Jan 28, 2026", size: "2.1 MB" },
      { title: "Tesla Limited Vehicle Warranty Disclosures", date: "Jan 28, 2026", size: "620 KB" },
    ],
    purchases: [
      {
        id: "ORD-9042-01",
        title: "X3 Roadster Founders Series Allocation",
        date: "Oct 14, 2025",
        amount: 50000,
        status: "Escrow Secured",
        txId: "TX-7821-FND",
      },
      {
        id: "ORD-9042-02",
        title: "SpaceX Cold-Gas Thruster Package",
        date: "Jan 12, 2026",
        amount: 25000,
        status: "Completed",
        txId: "TX-4409-SPX",
      },
    ],
  },
  {
    id: "RN104829105",
    vin: "7G2CE1E38RA009412",
    name: "Cyberbeast",
    model: "X3 Cybertruck",
    trim: "Cyberbeast Tri-Motor · Armor Monolith",
    color: "Cold-Rolled 30X Stainless Steel",
    interior: "Tactical Gray Armor Cabin",
    wheels: "20\" Cyber Wheels with 35\" All-Terrain Tires",
    galleryImages: [
      { label: "Exoskeleton Front", url: "/assets/cybertruck/cybertruck-hero.avif" },
    ],
    turntableFrames: ["/assets/cybertruck/cybertruck-hero.avif"],
    status: "In Assembly",
    deliveryEstimate: "November 05 – November 25, 2026",
    deliveryCenter: "Austin South Delivery Hub",
    batteryPercent: 88,
    rangeMiles: 340,
    odometer: 6,
    isLocked: true,
    climateOn: false,
    climateTemp: 70,
    sentryActive: true,
    chargeLimit: 80,
    upgrades: [
      {
        id: "upg-bed-extender",
        title: "Bed-Mounted 50 kWh Range Extender",
        category: "Hardware",
        badge: "470+ MI RANGE",
        price: 16000,
        description: "Factory auxiliary battery pack fitted cleanly into the truck bed for cross-country heavy towing.",
        specsBoost: { label: "Total Range", value: "340 mi → 470 mi" },
        installed: false,
      },
      {
        id: "upg-lightbar",
        title: "Cyber 500-Meter Laser Roof Lightbar",
        category: "Hardware",
        badge: "50,000 LUMENS",
        price: 2800,
        description: "Flush integrated roof lightbar illuminating trails up to 500 meters ahead.",
        specsBoost: { label: "Forward Lumens", value: "Standard → 50,000 lm" },
        installed: false,
      },
    ],
    tasks: [
      { title: "Delivery Location", completed: true, desc: "Austin South Hub selected." },
      { title: "Driver License Upload", completed: true, desc: "Verified via DMV records." },
      { title: "Insurance Upload", completed: false, desc: "Pending proof of vehicle insurance policy." },
    ],
    documents: [
      { title: "Cybertruck Order Agreement", date: "Dec 02, 2025", size: "1.2 MB" },
      { title: "Stainless Steel Care Guide", date: "Dec 02, 2025", size: "450 KB" },
    ],
    purchases: [
      {
        id: "ORD-3310-01",
        title: "X3 Cybertruck Cyberbeast Reservation",
        date: "Dec 02, 2025",
        amount: 25000,
        status: "Escrow Secured",
        txId: "TX-9901-CYB",
      },
    ],
  },
];

export function CustomerPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState("pilot@x3.engineering");
  const [passwordInput, setPasswordInput] = useState("X3Roadster2026!");
  const [authError, setAuthError] = useState("");
  
  // Vehicles State
  const [vehicles, setVehicles] = useState<VehicleOrder[]>(DEFAULT_VEHICLES);
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(0);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<"controls" | "checklist" | "upgrades" | "charging" | "documents" | "purchases">("controls");

  // Dynamic Motion & 3D Turntable Modes:
  // "video": 4K Dynamic Motion Driving Video
  // "turntable": 360-Degree Interactive Drag / Auto-Spin Turntable
  // "gallery": High-Res Cockpit / Thruster Still
  const [motionMode, setMotionMode] = useState<"video" | "turntable" | "gallery">("video");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Simulated Car State Controls
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [thrusterPurging, setThrusterPurging] = useState(false);
  const [suspensionSetting, setSuspensionSetting] = useState<"low" | "standard" | "high">("low");

  // Drag interaction for 360 Turntable
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Remote Actions
  const [toastAlert, setToastAlert] = useState<string | null>(null);
  const [flashingUpgradeId, setFlashingUpgradeId] = useState<string | null>(null);
  const [flashProgress, setFlashProgress] = useState(0);

  // Monroney Modal
  const [showMonroneyModal, setShowMonroneyModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (localStorage.getItem("x3_pilot_authenticated") === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Turntable Auto-spin loop
  useEffect(() => {
    let interval: any;
    if (motionMode === "turntable" && isAutoSpinning) {
      interval = setInterval(() => {
        setCurrentFrameIndex((prev) => (prev + 1) % ROADSTER_TURNTABLE_FRAMES.length);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [motionMode, isAutoSpinning]);

  const currentCar = vehicles[activeVehicleIndex] || vehicles[0];

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (emailInput.trim().length > 3 && passwordInput.length > 4) {
      playHapticBeep("success");
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("x3_pilot_authenticated", "true");
      }
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      playHapticBeep("click");
      setAuthError("Please provide valid login credentials.");
    }
  };

  const handleQuickDemoLogin = () => {
    playHapticBeep("success");
    setEmailInput("pilot@x3.engineering");
    setPasswordInput("X3Roadster2026!");
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("x3_pilot_authenticated", "true");
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    playHapticBeep("click");
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("x3_pilot_authenticated");
    }
    setIsAuthenticated(false);
  };

  // Toggle Car Lock
  const toggleLock = () => {
    playHapticBeep("lock");
    setVehicles((prev) =>
      prev.map((v, i) =>
        i === activeVehicleIndex ? { ...v, isLocked: !v.isLocked } : v
      )
    );
    setToastAlert(currentCar.isLocked ? "Doors Unlocked." : "Vehicle Locked & Monolith Secured.");
    setTimeout(() => setToastAlert(null), 3000);
  };

  // Toggle Climate
  const toggleClimate = () => {
    playHapticBeep("click");
    setVehicles((prev) =>
      prev.map((v, i) =>
        i === activeVehicleIndex ? { ...v, climateOn: !v.climateOn } : v
      )
    );
    setToastAlert(currentCar.climateOn ? "Climate Turned Off." : `Climate Turned On to ${currentCar.climateTemp}°F.`);
    setTimeout(() => setToastAlert(null), 3000);
  };

  // Cold Gas Thruster Purge
  const purgeThrusters = () => {
    playHapticBeep("thruster");
    setThrusterPurging(true);
    setToastAlert("🚀 Cold-Gas Thrusters: 50 PSI Manifold Test Purge Active!");
    setTimeout(() => {
      setThrusterPurging(false);
      setToastAlert(null);
    }, 3500);
  };

  // Flash Lights
  const flashLights = () => {
    playHapticBeep("click");
    setHeadlightsOn(true);
    setToastAlert("💡 Matrix LED Headlights: High-Beam Laser Beacons Active.");
    setTimeout(() => {
      setHeadlightsOn(false);
      setToastAlert(null);
    }, 3000);
  };

  // Drag handler for 360 turntable
  const handleMouseDown = (e: React.MouseEvent) => {
    if (motionMode !== "turntable") return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    setIsAutoSpinning(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || motionMode !== "turntable") return;
    const delta = e.clientX - startXRef.current;
    if (Math.abs(delta) > 12) {
      const step = delta > 0 ? 1 : -1;
      setCurrentFrameIndex((prev) => {
        const next = prev + step;
        if (next < 0) return ROADSTER_TURNTABLE_FRAMES.length - 1;
        return next % ROADSTER_TURNTABLE_FRAMES.length;
      });
      startXRef.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Purchase Upgrade
  const handlePurchaseUpgrade = (upgrade: VehicleUpgrade) => {
    if (upgrade.installed || flashingUpgradeId) return;

    playHapticBeep("click");
    setFlashingUpgradeId(upgrade.id);
    setFlashProgress(15);

    setTimeout(() => setFlashProgress(50), 600);
    setTimeout(() => setFlashProgress(85), 1300);
    setTimeout(() => {
      setFlashProgress(100);
      playHapticBeep("success");

      setTimeout(() => {
        setVehicles((prev) =>
          prev.map((v, i) => {
            if (i !== activeVehicleIndex) return v;
            const newPurchase: PurchaseItem = {
              id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
              title: upgrade.title,
              date: "Just Now",
              amount: upgrade.price,
              status: "Completed",
              txId: `TX-${Math.random().toString(16).slice(2, 6).toUpperCase()}`,
            };
            return {
              ...v,
              upgrades: v.upgrades.map((u) =>
                u.id === upgrade.id ? { ...u, installed: true } : u
              ),
              purchases: [newPurchase, ...v.purchases],
            };
          })
        );
        setFlashingUpgradeId(null);
        setToastAlert(`✓ ${upgrade.title} Installed to ${currentCar.vin}!`);
        setTimeout(() => setToastAlert(null), 4000);
      }, 700);
    }, 2000);
  };

  // =========================================================================
  // 1. TESLA SIGN-IN EXPERIENCE
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-black text-white flex flex-col justify-between selection:bg-[#E82127] selection:text-white">
        <SiteHeader />

        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 mb-2">
                <X3Logo3D size="md" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
                Tesla Account
              </h1>
              <p className="text-xs text-white/50 font-mono">
                Sign in to manage your vehicle delivery, live 3D controls, and over-the-air upgrades.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121212] p-4 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-white/70">
                <span className="font-bold flex items-center gap-1.5 text-[#E82127]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>DEMO PILOT ACCOUNT</span>
                </span>
                <span className="text-[10px] text-emerald-400">Ready</span>
              </div>
              <div className="text-[11px] text-white/80 space-y-1">
                <div>Email: <span className="text-white font-bold select-all">pilot@x3.engineering</span></div>
                <div>Pass: <span className="text-white font-bold select-all">X3Roadster2026!</span></div>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-[#161616] px-4 py-3 text-sm text-white focus:border-white focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-[#161616] px-4 py-3 text-sm text-white focus:border-white focus:outline-none transition-colors"
                  required
                />
              </div>

              {authError && <div className="text-xs font-mono text-[#E82127]">{authError}</div>}

              <button
                type="submit"
                className="w-full rounded-lg bg-[#3E6AE1] hover:bg-[#3457B2] py-3 text-sm font-semibold text-white transition-colors"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 py-3 text-xs font-mono font-bold text-white transition-colors"
              >
                One-Click Instant Pilot Access
              </button>
            </form>

            <div className="text-center pt-4">
              <Link to="/" className="text-xs text-white/50 hover:text-white transition-colors">
                ← Return to X3 Flagship
              </Link>
            </div>
          </div>
        </div>

        <SiteFooter />
      </div>
    );
  }

  // =========================================================================
  // 2. OFFICIAL TESLA CUSTOMER DASHBOARD WITH DYNAMIC 3D / MOTION CAR
  // =========================================================================
  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col justify-between selection:bg-[#E82127] selection:text-white select-none"
      onMouseUp={handleMouseUp}
    >
      <SiteHeader />

      {/* Toast Alert */}
      {toastAlert && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 rounded-xl border border-white/20 bg-[#161616] px-5 py-3 text-xs font-mono text-white shadow-2xl backdrop-blur-2xl animate-fadeIn">
          {toastAlert}
        </div>
      )}

      {/* OTA Flashing Progress Modal */}
      {flashingUpgradeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#121212] p-6 text-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold">Software Update in Progress</div>
              <div className="text-xs font-mono text-[#E82127] font-bold">{flashProgress}%</div>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#E82127] transition-all duration-300"
                style={{ width: `${flashProgress}%` }}
              />
            </div>
            <p className="text-xs text-white/60 font-mono">
              Flashing digital cryptographic firmware over Starlink mesh directly to VIN {currentCar.vin}...
            </p>
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:py-8 space-y-6">
        
        {/* TOP STATUS BAR: VEHICLE SWITCHER & BATTERY / LOCATION */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-4">
            
            {/* Multi-Vehicle Picker */}
            <div className="flex items-center gap-2">
              {vehicles.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => {
                    playHapticBeep("click");
                    setActiveVehicleIndex(idx);
                    setActiveGalleryIndex(0);
                    setCurrentFrameIndex(0);
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-mono font-semibold transition-all ${
                    activeVehicleIndex === idx
                      ? "bg-white text-black"
                      : "bg-[#161616] text-white/60 hover:text-white"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>

            <div className="hidden sm:block h-4 w-[1px] bg-white/20" />

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/60">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>{currentCar.status} · {currentCar.deliveryCenter}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <BatteryCharging className="h-4 w-4 text-emerald-400" />
              <span className="font-bold text-white">{currentCar.batteryPercent}%</span>
              <span className="text-white/50">({currentCar.rangeMiles} mi)</span>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-white/60 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS (MATCHING TESLA ECOSYSTEM) */}
        <div className="flex border-b border-white/10 gap-6 text-xs font-mono uppercase tracking-wider overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "controls", label: "Controls & 3D Motion" },
            { id: "checklist", label: "Delivery Checklist" },
            { id: "upgrades", label: "Upgrades & Store" },
            { id: "purchases", label: "Purchases & Invoices" },
            { id: "charging", label: "Charging & Stats" },
            { id: "documents", label: "Documents & Specs" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playHapticBeep("click");
                setActiveTab(tab.id as any);
              }}
              className={`pb-3 font-semibold transition-colors border-b-2 -mb-[1px] ${
                activeTab === tab.id
                  ? "border-white text-white"
                  : "border-transparent text-white/40 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================================================================= */}
        {/* TAB 1: CONTROLS & DYNAMIC 3D/MOTION CAR                           */}
        {/* ================================================================= */}
        {activeTab === "controls" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Center Dynamic Vehicle Motion Viewport */}
            <div className="lg:col-span-8 rounded-3xl border border-white/10 bg-[#0E0E10] p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white">
                    {currentCar.model}
                  </h2>
                  <p className="text-xs font-mono text-white/60 mt-0.5">
                    {currentCar.trim} · VIN: <span className="text-white">{currentCar.vin}</span>
                  </p>
                </div>

                {/* Motion Mode Pill Switcher */}
                <div className="flex items-center gap-1 rounded-full border border-white/15 bg-[#161616] p-1 font-mono text-xs">
                  {currentCar.heroVideo && (
                    <button
                      onClick={() => {
                        playHapticBeep("click");
                        setMotionMode("video");
                      }}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold transition-all ${
                        motionMode === "video" ? "bg-white text-black" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <Play className="h-3 w-3" />
                      <span>Live Motion</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      playHapticBeep("click");
                      setMotionMode("turntable");
                      setIsAutoSpinning(true);
                    }}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold transition-all ${
                      motionMode === "turntable" ? "bg-white text-black" : "text-white/60 hover:text-white"
                    }`}
                  >
                    <RotateCw className="h-3 w-3" />
                    <span>360° Turntable</span>
                  </button>

                  <button
                    onClick={() => {
                      playHapticBeep("click");
                      setMotionMode("gallery");
                    }}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold transition-all ${
                      motionMode === "gallery" ? "bg-white text-black" : "text-white/60 hover:text-white"
                    }`}
                  >
                    <Eye className="h-3 w-3" />
                    <span>Angles</span>
                  </button>
                </div>
              </div>

              {/* MAIN DYNAMIC VIEWPORT (CAN BE LIVE 4K MOTION, 360 TURNTABLE, OR ANGLE) */}
              <div
                className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black border border-white/10 cursor-grab active:cursor-grabbing group"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
              >
                {/* 1. LIVE MOTION VIDEO MODE */}
                {motionMode === "video" && currentCar.heroVideo && (
                  <div className="relative h-full w-full">
                    <video
                      ref={videoRef}
                      src={currentCar.heroVideo}
                      autoPlay
                      loop
                      muted={isVideoMuted}
                      playsInline
                      className="h-full w-full object-cover object-center filter contrast-110"
                    />
                    
                    {/* Video Audio Control Overlay */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <button
                        onClick={() => setIsVideoMuted(!isVideoMuted)}
                        className="rounded-full bg-black/70 border border-white/20 p-2 text-white/80 hover:text-white backdrop-blur-md"
                        title={isVideoMuted ? "Unmute Audio" : "Mute Audio"}
                      >
                        {isVideoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-[#E82127]" />}
                      </button>
                    </div>

                    <div className="absolute top-4 left-4 rounded-full bg-black/80 border border-white/15 px-3 py-1 text-xs font-mono text-white backdrop-blur-md flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#E82127] animate-ping" />
                      <span>4K DYNAMIC TRACK MOTION</span>
                    </div>
                  </div>
                )}

                {/* 2. 360-DEGREE INTERACTIVE TURNTABLE ROTATION */}
                {motionMode === "turntable" && (
                  <div className="relative h-full w-full flex items-center justify-center">
                    <img
                      src={currentCar.turntableFrames[currentFrameIndex] || currentCar.turntableFrames[0]}
                      alt="360 Turntable Frame"
                      className="h-full w-full object-cover object-center filter contrast-105 pointer-events-none"
                    />

                    {/* Turntable Overlay Instructions */}
                    <div className="absolute top-4 left-4 rounded-full bg-black/80 border border-white/15 px-3.5 py-1 text-xs font-mono text-white backdrop-blur-md flex items-center gap-2">
                      <RotateCw className="h-3 w-3 text-emerald-400" />
                      <span>360° INTERACTIVE TURNTABLE (DRAG TO ROTATE)</span>
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-black/80 border border-white/20 px-4 py-1.5 backdrop-blur-md text-xs font-mono">
                      <button
                        onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                        className="flex items-center gap-1.5 text-white hover:text-emerald-400 font-semibold"
                      >
                        {isAutoSpinning ? <Pause className="h-3.5 w-3.5 text-[#E82127]" /> : <Play className="h-3.5 w-3.5 text-emerald-400" />}
                        <span>{isAutoSpinning ? "Pause Spin" : "Auto-Spin 360°"}</span>
                      </button>
                      <span className="text-white/30">|</span>
                      <span className="text-white/60">Angle {currentFrameIndex + 1} / {currentCar.turntableFrames.length}</span>
                    </div>
                  </div>
                )}

                {/* 3. HIGH-RES ANGLE GALLERY */}
                {motionMode === "gallery" && (
                  <div className="relative h-full w-full">
                    <img
                      src={currentCar.galleryImages[activeGalleryIndex]?.url || currentCar.heroImage}
                      alt={currentCar.name}
                      className="h-full w-full object-cover object-center filter contrast-105 transition-all duration-500"
                    />
                    <div className="absolute top-4 left-4 rounded-full bg-black/80 border border-white/15 px-3 py-1 text-xs font-mono text-white backdrop-blur-md">
                      {currentCar.galleryImages[activeGalleryIndex]?.label}
                    </div>
                  </div>
                )}

                {/* DYNAMIC VISUAL OVERLAYS: HEADLIGHT BEAMS */}
                {headlightsOn && (
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-transparent to-transparent mix-blend-screen animate-pulse" />
                )}

                {/* DYNAMIC VISUAL OVERLAYS: COLD-GAS THRUSTER PLUME */}
                {thrusterPurging && (
                  <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-64 h-32 bg-[radial-gradient(ellipse_at_right,rgba(232,33,39,0.8),transparent_70%)] blur-md animate-ping" />
                )}
              </div>

              {/* View Switchers when in Gallery Mode */}
              {motionMode === "gallery" && (
                <div className="flex flex-wrap gap-2">
                  {currentCar.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playHapticBeep("click");
                        setActiveGalleryIndex(idx);
                      }}
                      className={`rounded-xl px-3.5 py-2 text-xs font-mono font-medium transition-colors ${
                        activeGalleryIndex === idx
                          ? "bg-white text-black"
                          : "bg-[#18181A] text-white/60 hover:text-white"
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Remote Controls Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <button
                  onClick={toggleLock}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border border-white/10 bg-[#161616] hover:bg-[#1f1f1f] transition-all"
                >
                  {currentCar.isLocked ? (
                    <Lock className="h-5 w-5 text-white mb-2" />
                  ) : (
                    <Unlock className="h-5 w-5 text-emerald-400 mb-2" />
                  )}
                  <span className="text-xs font-mono font-bold text-white">
                    {currentCar.isLocked ? "Unlock Doors" : "Lock Doors"}
                  </span>
                  <span className="text-[10px] text-white/40 mt-0.5">
                    {currentCar.isLocked ? "Locked" : "Unlocked"}
                  </span>
                </button>

                <button
                  onClick={toggleClimate}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border border-white/10 bg-[#161616] hover:bg-[#1f1f1f] transition-all"
                >
                  <Fan className={`h-5 w-5 mb-2 ${currentCar.climateOn ? "text-blue-400 animate-spin" : "text-white"}`} />
                  <span className="text-xs font-mono font-bold text-white">Climate</span>
                  <span className="text-[10px] text-white/40 mt-0.5">
                    {currentCar.climateOn ? `${currentCar.climateTemp}°F On` : "Off"}
                  </span>
                </button>

                <button
                  onClick={purgeThrusters}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                    thrusterPurging
                      ? "border-[#E82127] bg-[#E82127]/20 shadow-[0_0_20px_rgba(232,33,39,0.5)]"
                      : "border-white/10 bg-[#161616] hover:bg-[#1f1f1f]"
                  }`}
                >
                  <Flame className="h-5 w-5 text-[#E82127] mb-2" />
                  <span className="text-xs font-mono font-bold text-white">Cold-Gas Thrusters</span>
                  <span className="text-[10px] text-white/40 mt-0.5">
                    {thrusterPurging ? "Purging 50 PSI..." : "Test Purge"}
                  </span>
                </button>

                <button
                  onClick={flashLights}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                    headlightsOn
                      ? "border-yellow-400 bg-yellow-400/20"
                      : "border-white/10 bg-[#161616] hover:bg-[#1f1f1f]"
                  }`}
                >
                  <Sparkles className="h-5 w-5 text-yellow-400 mb-2" />
                  <span className="text-xs font-mono font-bold text-white">Flash Lights</span>
                  <span className="text-[10px] text-white/40 mt-0.5">Matrix Beams</span>
                </button>
              </div>
            </div>

            {/* Right Column: Vehicle Diagnostics & TPMS */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Sentry & Security */}
              <div className="rounded-3xl border border-white/10 bg-[#0E0E10] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-white/60">Sentry Mode</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    Armed
                  </span>
                </div>
                <div className="text-sm font-bold text-white">
                  360° Vision Cameras Guarding Perimeter
                </div>
                <p className="text-xs text-white/50 font-mono">
                  Autonomous threat detection active. Starlink live feed ready.
                </p>
              </div>

              {/* 4-Wheel Tire Pressure (TPMS) */}
              <div className="rounded-3xl border border-white/10 bg-[#0E0E10] p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono uppercase text-white/60">Tire Pressure (TPMS)</span>
                  <span className="text-[10px] font-mono text-emerald-400">Cold PSI Nominal</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center font-mono">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-[10px] text-white/40">FRONT LEFT</div>
                    <div className="text-xl font-bold text-emerald-400 mt-0.5">42 PSI</div>
                    <div className="text-[9px] text-white/30">102°F</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-[10px] text-white/40">FRONT RIGHT</div>
                    <div className="text-xl font-bold text-emerald-400 mt-0.5">42 PSI</div>
                    <div className="text-[9px] text-white/30">102°F</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-[10px] text-white/40">REAR LEFT</div>
                    <div className="text-xl font-bold text-emerald-400 mt-0.5">44 PSI</div>
                    <div className="text-[9px] text-white/30">104°F</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-[10px] text-white/40">REAR RIGHT</div>
                    <div className="text-xl font-bold text-emerald-400 mt-0.5">44 PSI</div>
                    <div className="text-[9px] text-white/30">104°F</div>
                  </div>
                </div>
              </div>

              {/* Suspension Height Setting */}
              <div className="rounded-3xl border border-white/10 bg-[#0E0E10] p-6 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs uppercase text-white/60 font-bold">Smart Air Suspension</span>
                  <span className="text-emerald-400 font-bold uppercase">{suspensionSetting}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {(["low", "standard", "high"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSuspensionSetting(lvl)}
                      className={`py-2 rounded-xl border text-center uppercase font-bold text-[10px] transition-colors ${
                        suspensionSetting === lvl
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/5 text-white/60 hover:text-white"
                      }`}
                    >
                      {lvl === "low" ? "Low (Track)" : lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: DELIVERY CHECKLIST                                         */}
        {/* ================================================================= */}
        {activeTab === "checklist" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="rounded-3xl border border-white/10 bg-[#0E0E10] p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-sans">Vehicle Delivery Schedule</h3>
                  <p className="text-xs font-mono text-white/60 mt-1">
                    Estimated Delivery Window: <span className="text-white font-bold">{currentCar.deliveryEstimate}</span>
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-mono text-emerald-400">
                  Ready for QA Verification
                </span>
              </div>

              <div className="space-y-4 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-white/60">
                  Required Action Tasks Before Delivery:
                </div>

                {currentCar.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-white/10 bg-[#141416]"
                  >
                    <div className="mt-0.5">
                      {task.completed ? (
                        <div className="h-6 w-6 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 grid place-items-center">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                      ) : (
                        <div className="h-6 w-6 rounded-full border border-white/30 grid place-items-center text-xs font-mono text-white/50">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white font-sans">{task.title}</span>
                        <span className={`text-[10px] font-mono font-bold ${task.completed ? "text-emerald-400" : "text-[#E82127]"}`}>
                          {task.completed ? "COMPLETED" : "PENDING"}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 font-mono mt-1">{task.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: UPGRADES & SOFTWARE STORE                                  */}
        {/* ================================================================= */}
        {activeTab === "upgrades" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold font-sans">Tesla Software & Hardware Upgrades</h3>
                <p className="text-xs font-mono text-white/60 mt-0.5">
                  Enhance your {currentCar.model} with instant over-the-air performance calibrations and official hardware packages.
                </p>
              </div>
              <div className="text-xs font-mono text-white/60">
                Connected Vehicle: <span className="text-white font-bold">{currentCar.vin}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCar.upgrades.map((upg) => (
                <div
                  key={upg.id}
                  className="rounded-3xl border border-white/10 bg-[#0E0E10] p-6 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase bg-white/10 px-2.5 py-1 rounded-full text-white/80">
                        {upg.category}
                      </span>
                      <span className="text-[10px] font-mono text-[#E82127] font-bold">
                        {upg.badge}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold font-sans text-white">{upg.title}</h4>
                    <p className="text-xs text-white/60 font-mono leading-relaxed">
                      {upg.description}
                    </p>

                    <div className="rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-xs">
                      <div className="text-[10px] text-white/40">{upg.specsBoost.label}</div>
                      <div className="text-emerald-400 font-bold mt-0.5">{upg.specsBoost.value}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-white/40">PRICE</div>
                      <div className="text-xl font-mono font-bold text-white">
                        ${upg.price.toLocaleString()}
                      </div>
                    </div>

                    {upg.installed ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                        <Check className="h-3.5 w-3.5" />
                        <span>Installed</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handlePurchaseUpgrade(upg)}
                        disabled={flashingUpgradeId !== null}
                        className="rounded-lg bg-[#3E6AE1] hover:bg-[#3457B2] px-4 py-2 text-xs font-semibold text-white transition-colors"
                      >
                        Buy Upgrade
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: PURCHASES & INVOICES                                       */}
        {/* ================================================================= */}
        {activeTab === "purchases" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#0E0E10] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-sans">Purchases & Invoices</h3>
                  <p className="text-xs font-mono text-white/60 mt-0.5">
                    Official billing records, order agreements, and receipt downloads for account #X3-ACC-782
                  </p>
                </div>
                <button
                  onClick={() => alert("Consolidated invoice PDF downloaded.")}
                  className="rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-mono font-bold text-white flex items-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5 text-white" />
                  <span>Download Ledger</span>
                </button>
              </div>

              <div className="space-y-3">
                {currentCar.purchases.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-white/10 bg-[#141416] font-mono text-xs"
                  >
                    <div>
                      <div className="font-bold text-white text-sm font-sans">{p.title}</div>
                      <div className="text-white/40 text-[10px] mt-0.5">
                        Order #{p.id} · Date: {p.date} · Ref: {p.txId}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-white">${p.amount.toLocaleString()}</div>
                      <div className="text-[10px] text-emerald-400 font-bold">{p.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 5: CHARGING & SUPERCHARGING STATS                             */}
        {/* ================================================================= */}
        {activeTab === "charging" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="rounded-3xl border border-white/10 bg-[#0E0E10] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-sans">Battery & Supercharger Telemetry</h3>
                  <p className="text-xs font-mono text-white/60 mt-0.5">
                    High-Density 200 kWh Silicon-Nanowire Pack
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-mono font-bold text-emerald-400">{currentCar.batteryPercent}%</div>
                  <div className="text-xs font-mono text-white/50">{currentCar.rangeMiles} mi Estimated Range</div>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">Charge Limit</span>
                  <span className="text-white font-bold">{currentCar.chargeLimit}% (Daily Limit)</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={currentCar.chargeLimit}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setVehicles((prev) =>
                      prev.map((v, i) =>
                        i === activeVehicleIndex ? { ...v, chargeLimit: val } : v
                      )
                    );
                  }}
                  className="w-full accent-white"
                />
                <div className="flex justify-between text-[10px] text-white/40">
                  <span>50% (Storage)</span>
                  <span>80% (Daily Trip)</span>
                  <span>100% (Full Cross-Country)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-mono text-white/50">MAX CHARGING RATE</div>
                  <div className="text-2xl font-mono font-bold text-white mt-1">350 kW</div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">V4 Supercharger Compatible</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-mono text-white/50">CHARGE ADDED / 15 MIN</div>
                  <div className="text-2xl font-mono font-bold text-white mt-1">+240 mi</div>
                  <div className="text-[10px] text-white/40 font-mono mt-0.5">Ultra-fast cell absorption</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-mono text-white/50">LIFETIME ENERGY SAVINGS</div>
                  <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">$4,820</div>
                  <div className="text-[10px] text-white/40 font-mono mt-0.5">Versus premium gasoline</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 6: DOCUMENTS, INVOICES & MONRONEY STICKER                     */}
        {/* ================================================================= */}
        {activeTab === "documents" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#0E0E10] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-sans">Official Vehicle Documents</h3>
                  <p className="text-xs font-mono text-white/60 mt-0.5">
                    Order agreements, warranty booklets, and window stickers for {currentCar.vin}
                  </p>
                </div>
                <button
                  onClick={() => setShowMonroneyModal(true)}
                  className="rounded-lg bg-white text-black font-semibold px-4 py-2 text-xs font-mono"
                >
                  View Monroney Sticker
                </button>
              </div>

              <div className="space-y-3">
                {currentCar.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-[#161616] font-mono text-xs"
                  >
                    <div>
                      <div className="font-bold text-white font-sans text-sm">{doc.title}</div>
                      <div className="text-white/40 text-[10px] mt-0.5">
                        Generated {doc.date} · File Size: {doc.size}
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Downloading ${doc.title}...`)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-white/70 hover:text-white transition-colors"
                    >
                      <Download className="h-3.5 w-3.5 text-white" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MONRONEY WINDOW STICKER MODAL */}
      {showMonroneyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border border-white/20 bg-[#111113] p-6 sm:p-8 text-white space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <X3Logo3D size="sm" />
                <h3 className="text-lg font-bold font-sans">Official Monroney Vehicle Window Sticker</h3>
              </div>
              <button
                onClick={() => setShowMonroneyModal(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl border border-white/15 bg-black p-5 font-mono text-xs space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-base font-bold text-white">{currentCar.model}</div>
                  <div className="text-white/50 text-[10px]">{currentCar.trim}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/50 text-[10px]">VIN</div>
                  <div className="font-bold text-white">{currentCar.vin}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[11px]">
                <div>
                  <span className="text-white/40">PAINT:</span>
                  <div className="font-bold text-white">{currentCar.color}</div>
                </div>
                <div>
                  <span className="text-white/40">INTERIOR:</span>
                  <div className="font-bold text-white">{currentCar.interior}</div>
                </div>
                <div>
                  <span className="text-white/40">WHEELS:</span>
                  <div className="font-bold text-white">{currentCar.wheels}</div>
                </div>
                <div>
                  <span className="text-white/40">ASSEMBLY POINT:</span>
                  <div className="font-bold text-white">Tesla Gigafactory Texas, USA</div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between items-center text-sm font-bold">
                <span>TOTAL SUGGESTED RETAIL (MSRP):</span>
                <span className="text-xl font-mono text-white">
                  ${currentCar.model.includes("Roadster") ? "250,000" : "99,990"}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => setShowMonroneyModal(false)}
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-white/70 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert("Official PDF downloaded.");
                  setShowMonroneyModal(false);
                }}
                className="rounded-lg bg-white text-black px-4 py-2 font-bold"
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
