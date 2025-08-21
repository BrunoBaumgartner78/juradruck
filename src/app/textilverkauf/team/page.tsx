import type { Metadata } from "next";
import TextilCategoryPage, { buildCategoryMetadata } from "@/components/TextilCategoryPage";

const props = {
  slug: "team",
  title: "Teamsport",
  hero: { src: "/images/textilverkauf/teamsport1.webp", alt: "Teamsport Textilien – Trikots & Trainingsanzüge" },
  intro: "Trikots, Trainingsanzüge & Accessoires in Vereinsfarben.",
  features: ["Schnelltrocknende Stoffe", "Nummern & Namen", "Vereinsfarben & Sponsorenlogos"],
};

export const metadata: Metadata = buildCategoryMetadata(props);

export default function Page() {
  return <TextilCategoryPage {...props} />;
}
