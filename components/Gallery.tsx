"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import type { Painting } from "@/data/paintings";

interface GalleryProps {
  paintings: Painting[];
}

export default function Gallery({ paintings }: GalleryProps) {
  const [index, setIndex] = useState(-1);
  const [activeSeries, setActiveSeries] = useState<string | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (paintings.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-24 text-sm">
        Add images to <code>/public/paintings/</code> and register them in <code>data/paintings.ts</code>
      </div>
    );
  }

  const seriesList = Array.from(
    new Set(paintings.map((p) => p.series).filter(Boolean) as string[])
  );
  const showFilter = seriesList.length > 1;
  const visibleSeries = seriesList.slice(0, 3);
  const overflowSeries = seriesList.slice(3);

  const visible = activeSeries
    ? paintings.filter((p) => p.series === activeSeries)
    : paintings;

  const slides = visible.map((p) => ({
    src: `/paintings/${p.filename}`,
    alt: p.title,
    title: p.title,
    description: [p.year, p.dimensions].filter(Boolean).join(" · "),
  }));

  return (
    <>
      {showFilter && (
        <div className="overflow-x-auto sm:overflow-x-visible mb-10">
          <div className="flex sm:justify-center gap-6 text-xs px-4 sm:px-0 min-w-max sm:min-w-0 sm:flex-wrap">
          <button
            onClick={() => setActiveSeries(null)}
            className={`uppercase tracking-widest transition-colors ${
              activeSeries === null
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {visibleSeries.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSeries(s)}
              className={`uppercase tracking-widest transition-colors ${
                activeSeries === s
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
          {/* Mobile: show all overflow series inline (row is scrollable) */}
          {overflowSeries.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSeries(s)}
              className={`sm:hidden uppercase tracking-widest transition-colors ${
                activeSeries === s
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
          {/* Desktop: collapse overflow into More dropdown */}
          {overflowSeries.length > 0 && (
            <div ref={moreRef} className="relative hidden sm:block">
              <button
                onClick={() => setMoreOpen((o) => !o)}
                className={`uppercase tracking-widest transition-colors ${
                  overflowSeries.includes(activeSeries ?? "")
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                More
              </button>
              {moreOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 flex flex-col gap-3 bg-background border border-border/60 py-3 px-5 z-10 min-w-max">
                  {overflowSeries.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setActiveSeries(s); setMoreOpen(false); }}
                      className={`uppercase tracking-widest transition-colors text-left ${
                        activeSeries === s
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      )}

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 px-4 sm:px-6">
        {visible.map((painting, i) => (
          <div
            key={painting.id}
            className="relative mb-4 break-inside-avoid group cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <Image
              src={`/paintings/${painting.filename}`}
              alt={painting.title}
              width={600}
              height={600}
              sizes="(max-width: 640px) 50vw, 33vw"
              priority={i < 6}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01] group-hover:shadow-md"
            />
            {painting.title && (
              <div className="absolute inset-0 flex items-end justify-start opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-full bg-gradient-to-t from-black/60 to-transparent px-3 py-4">
                  <span className="text-white text-[10px] tracking-widest uppercase">
                    {painting.title}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Captions]}
        styles={{ container: { backgroundColor: "oklch(0.08 0 0 / 0.92)" } }}
      />
    </>
  );
}
