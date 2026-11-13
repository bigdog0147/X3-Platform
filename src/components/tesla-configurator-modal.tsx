import { useState } from "react";
import { X, Check, ShieldCheck, Zap, BatteryCharging, Cpu, ArrowRight } from "lucide-react";

export interface ConfiguratorProduct {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  specs: { label: string; value: string }[];
  description: string;
}

export const PRODUCTS: ConfiguratorProduct[] = [
  {
    id: "roadster",
    name: "X3 Roadster Founders Series",
    category: "Electric Hypercar & Aero Flight Platform",
    basePrice: 200000,
    specs: [
      { label: "0-60 MPH", value: "1.9 sec" },
      { label: "Top Speed", value: "+250 mph" },
      { label: "Range", value: "620 mi" },
    ],
    description: "Tri-motor all-wheel drive, active aerodynamic downforce, and optional Space-X cold-gas thruster package.",
  },
  {
    id: "cybertruck",
    name: "X3 Cybertruck Cyberbeast",
    category: "Ultra-Hard Stainless Steel Utility",
    basePrice: 79990,
    specs: [
      { label: "Towing", value: "11,000 lbs" },
      { label: "0-60 MPH", value: "2.6 sec" },
      { label: "Range", value: "340 mi" },
    ],
    description: "Ultra-Hard 30X cold-rolled stainless-steel exoskeleton, armor glass, and adaptive all-terrain air suspension.",
  },
  {
    id: "model-y",
    name: "X3 Model Y Performance",
    category: "All-Wheel Drive Dual Motor Utility",
    basePrice: 44990,
    specs: [
      { label: "0-60 MPH", value: "3.5 sec" },
      { label: "Range", value: "303 mi" },
      { label: "Drive", value: "Dual Motor AWD" },
    ],
    description: "Maximum versatility, spacious 5-passenger cargo, superior NHTSA 5-star safety ratings, and instant response.",
  },
  {
    id: "model-3",
    name: "X3 Model 3 Sports Sedan",
    category: "Aerodynamic Electric Sedan",
    basePrice: 38990,
    specs: [
      { label: "0-60 MPH", value: "2.9 sec" },
      { label: "Range", value: "341 mi" },
      { label: "Top Speed", value: "163 mph" },
    ],
    description: "Sports tuned adaptive suspension, acoustic surround glass, low drag coefficient, and precision handling.",
  },
  {
    id: "cyberbot",
    name: "X3 Autonomous Robotic Fleet",
    category: "Robotics & Dynamic Automation",
    basePrice: 150000,
    specs: [
      { label: "Payload Capacity", value: "2,500 kg" },
      { label: "Cycle Speed", value: "0.28 sec" },
      { label: "Autonomy Level", value: "Level 5 Full Mesh" },
    ],
    description: "Multi-axis autonomous assembly robot with integrated neural computer and real-time lidar telemetry.",
  },
  {
    id: "megapack",
    name: "Megapack G3 Industrial Storage",
    category: "Clean Energy & Grid",
    basePrice: 420000,
    specs: [
      { label: "Usable Capacity", value: "3.9 MWh" },
      { label: "Round-Trip Efficiency", value: "93.5%" },
      { label: "Inverter Output", value: "1.9 MW AC" },
    ],
    description: "Utility-scale stationary energy storage system engineered for zero-downtime gigawatt microgrids.",
  },
  {
    id: "neural-silicon",
    name: "G3 Neural Silicon Rack",
    category: "Industrial AI & Semiconductor",
    basePrice: 280000,
    specs: [
      { label: "FP8 Compute", value: "2.4 PFLOPS" },
      { label: "Interconnect Bandwidth", value: "1.6 TB/s" },
      { label: "Node Architecture", value: "3nm Custom Die" },
    ],
    description: "Low-latency inferencing rack tailored for plant-wide vision models, digital twins and predictive maintenance.",
  },
  {
    id: "gigasite-allocation",
    name: "Giga Three Asia Project Allocation",
    category: "Private Market Equity",
    basePrice: 500000,
    specs: [
      { label: "Target IRR", value: "15.4%" },
      { label: "Term", value: "5 Years" },
      { label: "Min Allocation", value: "$250,000" },
    ],
    description: "Co-investment equity tranche in the next-generation autonomous gigasite expansion.",
  },
];

interface TeslaConfiguratorProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProductId?: string;
}

export function TeslaConfiguratorModal({ isOpen, onClose, defaultProductId = "cyberbot" }: TeslaConfiguratorProps) {
  const [selectedProduct, setSelectedProduct] = useState<ConfiguratorProduct>(
    () => PRODUCTS.find((p) => p.id === defaultProductId) || PRODUCTS[0]
  );
  const [selectedColor, setSelectedColor] = useState<"ultra-red" | "pearl-white" | "stealth-grey">("ultra-red");
  const [hasNeuralFirmware, setHasNeuralFirmware] = useState(true);
  const [hasExtendedWarranty, setHasExtendedWarranty] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const colorPrice = selectedColor === "ultra-red" ? 2500 : selectedColor === "pearl-white" ? 1500 : 0;
  const firmwarePrice = hasNeuralFirmware ? 12000 : 0;
  const warrantyPrice = hasExtendedWarranty ? 8500 : 0;
  const totalPrice = selectedProduct.basePrice + colorPrice + firmwarePrice + warrantyPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[var(--surface-elevated)] p-6 sm:p-8 text-foreground shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-lg">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="font-sans text-3xl font-extrabold text-white">Order Reservation Received</h2>
            <p className="mx-auto max-w-md text-sm text-muted-foreground font-mono">
              Your customized reservation for <strong>{selectedProduct.name}</strong> has been logged into the X3 Production Ledger. Track live telemetry, assembly status, and delivery in your Pilot Portal.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <a
                href="/portal"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold text-white shadow-lg transition-transform hover:scale-105"
                style={{ background: "var(--gradient-gold)" }}
              >
                Track in Customer Portal →
              </a>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-xs font-mono uppercase tracking-wider font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
              <span className="text-xs uppercase tracking-widest text-[var(--primary)] font-semibold font-mono">X3 Digital Vehicle Configurator</span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white">{selectedProduct.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
            </div>

            {/* Product Selector Tabs */}
            <div className="mt-6 flex flex-wrap gap-2">
              {PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    selectedProduct.id === prod.id
                      ? "bg-white text-black font-semibold shadow-md"
                      : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground border border-white/10"
                  }`}
                >
                  {prod.name}
                </button>
              ))}
            </div>

            {/* Main Interactive Config Area */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Visual & Specs */}
              <div className="space-y-6">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/60 flex items-center justify-center p-6 text-center">
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      background:
                        selectedColor === "ultra-red"
                          ? "radial-gradient(circle at center, var(--primary), transparent 70%)"
                          : selectedColor === "pearl-white"
                          ? "radial-gradient(circle at center, #ffffff, transparent 70%)"
                          : "radial-gradient(circle at center, #555555, transparent 70%)",
                    }}
                  />
                  <div className="relative space-y-2">
                    <span className="text-4xl sm:text-5xl">⚡</span>
                    <h3 className="font-sans text-xl font-bold text-white">{selectedProduct.name}</h3>
                    <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs border border-white/10 bg-white/5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor:
                            selectedColor === "ultra-red" ? "var(--primary)" : selectedColor === "pearl-white" ? "#fff" : "#777",
                        }}
                      />
                      <span className="capitalize">{selectedColor.replace("-", " ")} Finish</span>
                    </div>
                  </div>
                </div>

                {/* Key Specs */}
                <div className="grid grid-cols-3 gap-3">
                  {selectedProduct.specs.map((s, idx) => (
                    <div key={idx} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
                      <div className="text-lg font-bold text-foreground">{s.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Customization & Financial Summary */}
              <div className="space-y-6">
                {/* Exterior / Chassis Color */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Chassis & Enclosure Color</label>
                  <div className="mt-3 flex gap-4">
                    {[
                      { id: "ultra-red", name: "Tesla Ultra Red", color: "oklch(0.62 0.25 25)", extra: "+$2,500" },
                      { id: "pearl-white", name: "Pearl White Multi-Coat", color: "#f8f9fa", extra: "+$1,500" },
                      { id: "stealth-grey", name: "Stealth Grey", color: "#3a3f47", extra: "Included" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColor(c.id as any)}
                        className={`group relative flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                          selectedColor === c.id ? "border-[var(--primary)] bg-white/5" : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div
                          className="h-8 w-8 rounded-full border border-white/30 shadow-sm"
                          style={{ backgroundColor: c.color }}
                        />
                        <span className="text-[10px] text-muted-foreground group-hover:text-foreground">{c.extra}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upgrade Options */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Autonomous Firmware & Warranty</label>
                  <div
                    onClick={() => setHasNeuralFirmware(!hasNeuralFirmware)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      hasNeuralFirmware ? "border-[var(--primary)] bg-[var(--primary)]/10" : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${hasNeuralFirmware ? "bg-[var(--primary)] text-white" : "bg-white/10"}`}>
                        <Zap className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Autonomous Neural Autopilot</div>
                        <div className="text-xs text-muted-foreground">Closed-loop AI optimization & mesh orchestration</div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold">+$12,000</div>
                  </div>

                  <div
                    onClick={() => setHasExtendedWarranty(!hasExtendedWarranty)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      hasExtendedWarranty ? "border-[var(--primary)] bg-[var(--primary)]/10" : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${hasExtendedWarranty ? "bg-[var(--primary)] text-white" : "bg-white/10"}`}>
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">10-Year Comprehensive SLA</div>
                        <div className="text-xs text-muted-foreground">24/7 on-site robotics engineer & component swap</div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold">+$8,500</div>
                  </div>
                </div>

                {/* Price Calculation & Action */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Estimated Total Value</span>
                    <span className="font-mono text-2xl font-bold text-white">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(true)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-xl transition-all duration-200 hover:scale-[1.02]"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    Confirm Configuration & Reserve
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-[11px] text-center text-muted-foreground">
                    Fully refundable $2,500 deposit. Allocation prioritised by submission timestamp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
