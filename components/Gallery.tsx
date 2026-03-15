"use client";

import Image from "next/image";
import { useState } from "react";
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
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-xs">
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
          {seriesList.map((s) => (
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
        </div>
      )}

      <div className="columns-2 sm:columns-3 gap-4 px-4 sm:px-6">
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
              <div className="absolute inset-0 flex items-end justify-start opacity-0 group-hover:opacity-100 transition-opacity p-3">
                <span className="text-white text-[10px] tracking-widest uppercase drop-shadow-md">
                  {painting.title}
                </span>
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
