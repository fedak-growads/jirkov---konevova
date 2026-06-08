import { property } from "@/data/property";
import Reveal from "./Reveal";

export default function VideoTour() {
  const video = property.video as {
    enabled: boolean;
    youtubeId?: string;
    src?: string;
    poster?: string;
    title: string;
  };

  if (!video.enabled) return null;
  if (!video.youtubeId && !video.src) return null;

  return (
    <section className="py-14 md:py-20 px-6 md:px-12 bg-bg-soft border-y border-border">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal text-center mb-3">
            Videoprohlídka
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-text text-center mb-3">
            Projděte si byt na videu
          </h2>
          <p className="text-sm text-text-muted text-center mb-10 max-w-xl mx-auto">
            Krátká procházka bytem — atmosféra, výhled, dispozice.
          </p>
        </Reveal>

        <Reveal delay={120}>
          {/* Phone-shaped frame for vertical video (9:16) */}
          <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] aspect-[9/16] rounded-[36px] bg-[#1a1a1a] p-3 shadow-2xl">
            {video.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0&playsinline=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="w-full h-full rounded-[24px] bg-black"
              />
            ) : (
              <video
                src={video.src}
                poster={video.poster}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full rounded-[24px] bg-black object-cover"
                title={video.title}
              >
                Váš prohlížeč nepodporuje přehrávání videa.
              </video>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
