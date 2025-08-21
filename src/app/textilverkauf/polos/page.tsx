import type { Metadata } from "next";
import TextilCategoryPage, { buildCategoryMetadata } from "@/components/TextilCategoryPage";

const props = {
  slug: "polos",
  title: "Polos & Hemden",
  hero: { src: "/images/shop/textildruck.webp", alt: "Polos & Hemden im Showroom" },
  intro: "Für Empfang und Team – gepflegter Auftritt im Alltag.",
  features: ["Business-Linien", "Stretch & Easy‑Care", "Vielseitig veredelbar"],
};

export const metadata: Metadata = buildCategoryMetadata(props);

export default function Page() {
  return <TextilCategoryPage {...props} />;
}
