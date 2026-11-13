import { Link } from "@tanstack/react-router";
import { Menu, X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { SiteSearchButton } from "@/components/site-search-button";
import { LanguageSelector } from "@/components/language-selector";
import { TeslaMegamenu } from "@/components/tesla-megamenu";
import { TeslaConfiguratorModal } from "@/components/tesla-configurator-modal";
import { X3Logo3D } from "@/components/x3-logo-3d";

const TESLA_NAV = [
  { label: "Robotics", category: "Robotics" },
  { label: "Energy", category: "Energy" },
  { label: "Silicon & AI", category: "Silicon & AI" },
  { label: "Invest", category: "Invest" },
] as const;

const STANDARD_NAV = [
  { to: "/technologies", label: "Technologies" },
  { to: "/infrastructure", label: "Infrastructure" },
  { to: "/innovation", label: "Innovation" },
  { to: "/investors", label: "Investors" },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMegamenu, setActiveMegamenu] = useState<string | null>(null);
  const [configuratorOpen, setConfiguratorOpen] = useState(false);
  const [configuratorProduct, setConfiguratorProduct] = useState<string>("cyberbot");

  const openConfigurator = (productId?: string) => {
    if (productId) setConfiguratorProduct(productId);
    setConfiguratorOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--background)]/80 backdrop-blur-2xl transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Refined Compact X3 Luxury Emblem (No Sub-Labels) */}
        <Link to="/" className="flex items-center group py-1" aria-label="X3 Home">
          <X3Logo3D size="sm" />
        </Link>

        {/* Center: Tesla-Style Category Links with Megamenu Hover */}
        <nav className="hidden items-center gap-1 lg:flex">
          {TESLA_NAV.map((n) => (
            <button
              key={n.category}
              onMouseEnter={() => setActiveMegamenu(n.category)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                activeMegamenu === n.category
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              }`}
            >
              {n.label}
            </button>
          ))}
          <Link
            to="/about"
            className="rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground transition-all hover:bg-white/5 hover:text-white"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground transition-all hover:bg-white/5 hover:text-white"
          >
            Contact
          </Link>
        </nav>

        {/* Right Action Icons & Tesla Order Button */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <SiteSearchButton />
          <LanguageSelector />
          <Link
            to="/portal"
            className="text-xs font-mono font-semibold text-muted-foreground hover:text-white transition-colors px-2 py-1.5"
          >
            Portal
          </Link>
          <Link
            to="/portal"
            className="text-xs font-semibold text-muted-foreground hover:text-white transition-colors px-2 py-1.5"
          >
            Sign in
          </Link>

          {/* Tesla-Style Order Button */}
          <button
            onClick={() => openConfigurator("cyberbot")}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:scale-105"
            style={{ background: "var(--gradient-gold)" }}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Order
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Tesla Dropdown Megamenu */}
      <TeslaMegamenu
        activeCategory={activeMegamenu}
        onClose={() => setActiveMegamenu(null)}
        onOpenConfigurator={openConfigurator}
      />

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[var(--surface-elevated)] px-6 py-6 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                openConfigurator("cyberbot");
              }}
              className="w-full text-center rounded-xl py-3 text-xs font-bold text-white mb-2"
              style={{ background: "var(--gradient-gold)" }}
            >
              Order
            </button>
            {STANDARD_NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white transition-colors"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}

      {/* Interactive Tesla Configurator Modal */}
      <TeslaConfiguratorModal
        isOpen={configuratorOpen}
        onClose={() => setConfiguratorOpen(false)}
        defaultProductId={configuratorProduct}
      />
    </header>
  );
}
