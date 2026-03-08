import Gallery from "@/components/Gallery";
import paintings from "@/data/paintings";

export default function Home() {
  return <Gallery paintings={paintings} />;
}
