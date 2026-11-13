import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { TeslaConfiguratorModal } from "@/components/tesla-configurator-modal";
import { AmbientVideoBackground } from "@/components/ambient-video-background";
import { VideoPlayerModal } from "@/components/video-player-modal";
import { HeroMovingShowcase } from "@/components/hero-moving-showcase";
import { CinemaShowcaseVideo } from "@/components/cinema-showcase-video";
import { TeslaInteractiveMap } from "@/components/tesla-interactive-map";
import { useState } from "react";

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
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "X3",
            url: "https://www.gf3x.space/",
            description:
              "X3 builds next-generation platforms: high-performance electric powertrains, robotics, energy storage, and AI infrastructure.",
          }),
        },
      ],
    };
  },
});

function LandingPage() {
  const [configuratorOpen, setConfiguratorOpen] = useState(false);
  const [configuratorProduct, setConfiguratorProduct] = useState("cyberbot");
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
    <div className="min-h-screen">
      <SiteHeader />

      {/* ================= HERO WITH MOVING TESLA SHOWCASE ================= */}
      <HeroMovingShowcase onOpenConfigurator={openConfigurator} />

      {/* ================= X3 CINEMATIC FULL-BLEED FLUID SHOWCASE ================= */}
      <section className="relative z-20 w-full overflow-hidden bg-black">
        <CinemaShowcaseVideo
          src="/showcase-video.mp4"
          stats={[
            { k: "12", l: "Global Facilities" },
            { k: "$4.2B", l: "R&D Committed" },
            { k: "38", l: "Countries Served" },
            { k: "1,900+", l: "Engineers & Scientists" },
          ]}
        />
      </section>

      {/* ================= X3 FLAGSHIP SYSTEMS & ARCHITECTURE ================= */}
      <section className="border-t border-white/10 bg-black/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-12">
            {[
              {
                id: "roadster",
                title: "Roadster",
                tagline: "Pure Electric Velocity",
                desc: "The quickest electric supercar in existence. Engineered with carbon-composite architecture, tri-motor all-wheel drive, and active aerodynamic downforce.",
                image: "/assets/roadster/roadster-studio-white.jpg",
                specs: [
                  { k: "1.9 sec", l: "0-60 mph" },
                  { k: "+250 mph", l: "Top Speed" },
                  { k: "620 mi", l: "Range" },
                ],
                price: "From $200,000",
              },
              {
                id: "cybertruck",
                title: "Cybertruck",
                tagline: "Built for Any Planet",
                desc: "Ultra-Hard 30X Cold-Rolled stainless-steel exoskeleton with Armor Glass. Extreme structural durability, adaptive air suspension, and up to 11,000 lbs towing capacity.",
                image: "/assets/cybertruck/cybertruck-hero.avif",
                specs: [
                  { k: "11,000 lbs", l: "Towing Capacity" },
                  { k: "2.6 sec", l: "0-60 mph" },
                  { k: "340 mi", l: "Est. Range" },
                ],
                price: "From $79,990",
              },
              {
                id: "model-y",
                title: "Model Y",
                tagline: "High-Efficiency All-Wheel Drive",
                desc: "Maximum utility and performance with versatile seating, dual motor AWD, superior safety ratings, and all-weather capability.",
                image: "/assets/vehicles/model-y.avif",
                specs: [
                  { k: "3.5 sec", l: "0-60 mph" },
                  { k: "303 mi", l: "Range (EPA)" },
                  { k: "AWD", l: "Dual Motor" },
                ],
                price: "From $44,990",
              },
              {
                id: "model-3",
                title: "Model 3",
                tagline: "Sports Electric Sedan",
                desc: "Aerodynamically tuned precision handling, whisper-quiet cabin, customized ambient lighting, and instant acceleration from zero rpm.",
                image: "/assets/vehicles/model-3.avif",
                specs: [
                  { k: "2.9 sec", l: "0-60 mph" },
                  { k: "341 mi", l: "Range (EPA)" },
                  { k: "163 mph", l: "Top Speed" },
                ],
                price: "From $38,990",
              },
            ].map((prod, index) => (
              <Reveal key={prod.id} direction="up" delay={index * 100}>
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface-elevated)]/70 backdrop-blur-xl p-8 lg:p-12 transition-all hover:border-[var(--primary)]/60 group">
                  {/* Either Image Background or Ambient Video Background */}
                  {prod.image ? (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="h-full w-full object-cover object-center filter contrast-115 brightness-95 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/35" />
                    </div>
                  ) : (
                    <AmbientVideoBackground
                      videoId={prod.videoId!}
                      title={prod.title}
                      overlayOpacity="opacity-80"
                    />
                  )}

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] font-semibold">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                        {prod.tagline}
                      </div>
                      <h3 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white group-hover:text-[var(--primary)] transition-colors">
                        {prod.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
                        {prod.desc}
                      </p>

                      {/* Tesla-Style Specs Strip */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-lg">
                        {prod.specs.map((s, si) => (
                          <div key={si}>
                            <div className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-white">{s.k}</div>
                            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">{s.l}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center space-y-4 lg:border-l lg:border-white/10 lg:pl-8">
                      <div className="text-left lg:text-right">
                        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-medium">Enterprise Pricing</div>
                        <div className="font-mono text-2xl font-bold text-white mt-0.5">{prod.price}</div>
                      </div>

                      <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => openConfigurator(prod.id)}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
                          style={{ background: "var(--gradient-gold)" }}
                        >
                          Order
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                        {prod.id === "roadster" ? (
                          <button
                            onClick={() => openConfigurator("roadster")}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold text-white hover:bg-white/20 backdrop-blur-md transition-colors"
                          >
                            Review
                          </button>
                        ) : (
                          <>
                            {prod.videoId && (
                              <button
                                onClick={() => openVideo(prod.videoId!, prod.title)}
                                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold text-white hover:bg-white/15 transition-colors"
                              >
                                <Play className="h-3 w-3 text-[var(--primary)] fill-[var(--primary)]" />
                                Watch Film
                              </button>
                            )}
                            <Link
                              to="/technologies"
                              className="flex-1 sm:flex-initial inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/40 px-5 py-3 text-xs font-semibold text-muted-foreground hover:text-white transition-colors"
                            >
                              Specs
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      {/* ================= X3 ROBOTICS & AUTONOMOUS AUTOMATION ================= */}
      <section className="relative overflow-hidden border-t border-white/10 bg-black/70 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[var(--surface-elevated)]/80 backdrop-blur-2xl p-8 lg:p-14 shadow-2xl group">
            {/* Ambient Robot Video Background */}
            <AmbientVideoBackground
              videoId="cpraXaw7dyc"
              title="X3 Robotic Precision System"
              overlayOpacity="opacity-75"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                  Robotics Ecosystem
                </div>
                <h3 className="font-sans text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  X3 Autonomous Robotic Fleet
                </h3>
                <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
                  High-speed dynamic manufacturing manipulators powered by custom neural coprocessors, real-time closed-loop vision, and wireless mesh synchronization.
                </p>

                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/15 max-w-md">
                  <div>
                    <div className="font-mono text-2xl font-bold tracking-tight text-white">2,500 kg</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">Payload</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold tracking-tight text-white">0.28 s</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">Cycle Speed</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold tracking-tight text-white">Sub-mm</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">Precision</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center space-y-4 lg:border-l lg:border-white/10 lg:pl-8">
                <div className="text-left lg:text-right">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-medium">Enterprise Deployment</div>
                  <div className="font-mono text-2xl font-bold text-white mt-0.5">From $150,000</div>
                </div>

                <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => openVideo("cpraXaw7dyc", "X3 Autonomous Robotic Fleet")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-xs font-bold text-white border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all hover:scale-105"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    Watch Robot Film
                  </button>
                  <button
                    onClick={() => openConfigurator("cyberbot")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    Configure Fleet
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tesla Configurator Modal */}
      <TeslaConfiguratorModal
        isOpen={configuratorOpen}
        onClose={() => setConfiguratorOpen(false)}
        defaultProductId={configuratorProduct}
      />

      {/* 4K Video Player Modal */}
      <VideoPlayerModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal((v) => ({ ...v, isOpen: false }))}
        videoId={videoModal.videoId}
        title={videoModal.title}
      />

      {/* ================= TESLA-GRADE GLOBAL FLEET & SUPERCHARGER MAP ================= */}
      <TeslaInteractiveMap />

      <SiteFooter />
    </div>
  );
}
