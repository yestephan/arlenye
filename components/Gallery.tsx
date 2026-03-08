"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { Painting } from "@/data/paintings";

interface GalleryProps {
  paintings: Painting[];
}

export default function Gallery({ paintings }: GalleryProps) {
  const [index, setIndex] = useState(-1);

  if (paintings.length === 0) {
    return (
      <div className="text-center text-gray-400 py-24 text-sm">
        Add images to <code>/public/paintings/</code> and register them in <code>data/paintings.ts</code>
      </div>
    );
  }

  const slides = paintings.map((p) => ({
    src: `/paintings/${p.filename}`,
    alt: p.title,
  }));

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 px-4 sm:px-6">
        {paintings.map((painting, i) => (
          <div
            key={painting.id}
            className="relative mb-2 break-inside-avoid group cursor-pointer overflow-hidden"
            onClick={() => setIndex(i)}
          >
            <Image
              src={`/paintings/${painting.filename}`}
              alt={painting.title}
              width={600}
              height={600}
              className="w-full h-auto object-cover transition-opacity group-hover:opacity-90"
            />
            {painting.title && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                <span className="text-white text-xs tracking-widest uppercase font-medium drop-shadow">
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
        styles={{ container: { backgroundColor: "rgba(255,255,255,0.97)" } }}
      />
    </>
  );
}
