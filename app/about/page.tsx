import Image from "next/image";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Artist photo — replace with actual image */}
      <div className="w-full aspect-[4/3] relative mb-10 bg-muted">
        {/* Uncomment once you have a photo:
        <Image
          src="/artist.jpg"
          alt="Arlen Ye"
          fill
          className="object-cover"
        />
        */}
      </div>

      <p className="text-muted-foreground leading-relaxed">
        Arlen Ye was born in Shanghai and studied architecture in both China and
        Sweden. After retiring from his teaching post at the Faculty of
        Architecture at the University of Hong Kong, he turned his focus to his
        lifelong passion: watercolour painting. His work explores a range of
        subjects, from dynamic urban scenes to serene natural landscapes, with
        particular inspiration drawn from Sweden&apos;s west coast archipelago.
      </p>
    </div>
  );
}
