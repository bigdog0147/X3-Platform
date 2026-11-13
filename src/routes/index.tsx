import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Play, Globe } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TeslaConfiguratorModal } from "@/components/tesla-configurator-modal";
import { VideoPlayerModal } from "@/components/video-player-modal";
import { AmbientVideoBackground } from "@/components/ambient-video-background";
import { TeslaInteractiveMap } from "@/components/tesla-interactive-map";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => {
    const OG_IMAGE = "https://gf3x.space/og-image.jpg";
    return {
      meta: [
        { title: "X3 — High-Performance Engineering" },
        {
          name: "description",
          content:
            "X3 builds next-generation platforms: high-performance electric powertrains, robotics, energy storage, and AI infrastructure.",
        },
        { property: "og:title", content: "X3 — High-Performance Engineering" },
        {
          property: "og:description",
          content:
            "High-performance engineering integrating advanced robotics, clean energy arrays, and autonomous intelligence.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://www.gf3x.space/" },
        { property: "og:image", content: OG_IMAGE },
        { property: "og:image:width", content: "1920" },
        { property: "og:image:height", content: "1088" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: "https://www.gf3x.space/" }],
    };
  },
});

interface VehicleSection {
  id: string;
  title: string;
  tagline: string;
  pricing: string;
  specs: string;
  mediaType: "video" | "image";
  mediaSrc: string;
  orderUrl?: string;
  learnMoreUrl: string;
}

const VEHICLES: VehicleSection[] = [
  {
    id: "roadster",
    title: "Roadster",
    tagline: "Pure Electric Velocity",
    pricing: "From $200,000",
    specs: "1.9s 0-60 mph · +250 mph · 620 mi Range",
    mediaType: "video",
    mediaSrc: "/assets/roadster/roadster-hero-video.mp4",
    learnMoreUrl: "/roadster",
  },
  {
    id: "cybertruck",
    title: "Cybertruck",
    tagline: "Built for Any Planet",
    pricing: "From $79,990",
    specs: "11,000 lbs Towing · 2.6s 0-60 mph · 340 mi Range",
    mediaType: "image",
    mediaSrc: "/assets/cybertruck/cybertruck-hero.avif",
    learnMoreUrl: "/cybertruck",
  },
  {
    id: "model-y",
    title: "Model Y",
    tagline: "Versatile All-Wheel Drive",
    pricing: "From $44,990",
    specs: "3.5s 0-60 mph · 303 mi Range · AWD",
    mediaType: "image",
    mediaSrc: "/assets/vehicles/model-y.avif",
    learnMoreUrl: "/technologies",
  },
  {
    id: "model-3",
    title: "Model 3",
    tagline: "Sports Electric Sedan",
    pricing: "From $38,990",
    specs: "2.9s 0-60 mph · 341 mi Range · 163 mph",
    mediaType: "image",
    mediaSrc: "/assets/vehicles/model-3.avif",
    learnMoreUrl: "/technologies",
  },
];

function LandingPage() {
  const [configuratorOpen, setConfiguratorOpen] = useState(false);
  const [configuratorProduct, setConfiguratorProduct] = useState("roadster");
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; videoId: string; title: string }>({
    isOpen: false,
    videoId: "",
    title: "",
  });

  const openConfigurator = (productId?: string) => {
    if (productId) setConfiguratorProduct(productId);
    setConfiguratorOpen(true);
  };

  const openVideo = (videoId: string, title: string) => {
    setVideoModal({ isOpen: true, videoId, title });
  };

  return (
    <div className="bg-black text-white font-sans antialiased selection:bg-[#E82127] selection:text-white">
      <SiteHeader />

      {/* ===================================================================== */}
      {/* FULL-SCREEN VERTICAL SECTIONS (EXACT TESLA.COM HOMEPAGE ARCHITECTURE)  */}
      {/* ===================================================================== */}
      <main className="w-full">
        {VEHICLES.map((vehicle) => (
          <section
            key={vehicle.id}
            id={vehicle.id}
            className="relative h-screen min-h-[680px] w-full flex flex-col justify-between items-center text-center px-6 pt-28 pb-16 overflow-hidden border-b border-white/10"
          >
            {/* Background Media: Full-Bleed Video or Image */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              {vehicle.mediaType === "video" ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/assets/roadster/roadster-card-official.avif"
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-90"
                >
                  <source src={vehicle.mediaSrc} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={vehicle.mediaSrc}
                  alt={vehicle.title}
                  className="w-full h-full object-cover object-center filter contrast-115 brightness-95"
                />
              )}
              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60" />
            </div>

            {/* Top Text Details (Tesla Style Header & Subhead) */}
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
                {vehicle.title}
              </h2>
              <div className="mt-2 text-sm sm:text-base text-white/90 font-medium drop-shadow-md">
                {vehicle.specs}
              </div>
              <div className="mt-1 text-xs font-mono uppercase tracking-wider text-white/70">
                {vehicle.pricing} &middot; {vehicle.tagline}
              </div>
            </div>

            {/* Bottom Actions: Dual Buttons (Order Now & Learn More) */}
            <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openConfigurator(vehicle.id)}
                className="w-full sm:w-56 py-3.5 px-6 rounded-md bg-[#252830]/90 hover:bg-[#343844] text-white font-mono text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md transition-all shadow-xl border border-white/10"
              >
                Order Now
              </button>

              <Link
                to={vehicle.learnMoreUrl}
                className="w-full sm:w-56 py-3.5 px-6 rounded-md bg-white/80 hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md transition-all shadow-xl text-center"
              >
                Learn More
              </Link>
            </div>
          </section>
        ))}

        {/* ================= SECTION 5: X3 AUTONOMOUS ROBOTICS ================= */}
        <section className="relative h-screen min-h-[680px] w-full flex flex-col justify-between items-center text-center px-6 pt-28 pb-16 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <AmbientVideoBackground
              videoId="cpraXaw7dyc"
              title="X3 Robotic Precision System"
              overlayOpacity="opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
              Autonomous Robotics
            </h2>
            <div className="mt-2 text-sm sm:text-base text-white/90 font-medium">
              Sub-millimeter Precision &middot; Neural Coprocessors
            </div>
            <div className="mt-1 text-xs font-mono uppercase tracking-wider text-white/70">
              Enterprise Fleet Solutions
            </div>
          </div>

          <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openConfigurator("cyberbot")}
              className="w-full sm:w-56 py-3.5 px-6 rounded-md bg-[#252830]/90 hover:bg-[#343844] text-white font-mono text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md transition-all shadow-xl border border-white/10"
            >
              Order Fleet
            </button>
            <button
              onClick={() => openVideo("cpraXaw7dyc", "X3 Autonomous Robotic Fleet")}
              className="w-full sm:w-56 py-3.5 px-6 rounded-md bg-white/80 hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md transition-all shadow-xl text-center flex items-center justify-center gap-2"
            >
              <Play className="h-3.5 w-3.5 fill-black" />
              Watch Film
            </button>
          </div>
        </section>

        {/* Global Charging & Fleet Network Map */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <TeslaInteractiveMap />
        </section>
      </main>

      {/* Configurator Modal */}
      <TeslaConfiguratorModal
        isOpen={configuratorOpen}
        onClose={() => setConfiguratorOpen(false)}
        defaultProductId={configuratorProduct}
      />

      {/* Video Modal */}
      <VideoPlayerModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal((v) => ({ ...v, isOpen: false }))}
        videoId={videoModal.videoId}
        title={videoModal.title}
      />

      <SiteFooter />
    </div>
  );
}
