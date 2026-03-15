import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://arlenye.com", lastModified: new Date() },
    { url: "https://arlenye.com/about", lastModified: new Date() },
    { url: "https://arlenye.com/contact", lastModified: new Date() },
  ];
}
