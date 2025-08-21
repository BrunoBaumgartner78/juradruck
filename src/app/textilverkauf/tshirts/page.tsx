import type { Metadata } from "next";
import TextilCategoryPage, { buildCategoryMetadata } from "@/components/TextilCategoryPage";

const props = {
  slug: "tshirts",
  title: "T‑Shirts & Longsleeves",
  hero: { src: "/images/shop/textilverkauf.webp", alt: "T‑Shirts & Longsleeves Auswahl" },
  intro: "Vom günstigen Basic bis zur Premium-Qualität – grosse Farbvielfalt, Damen/Herren/Kids.",
  features: ["Viele Farben & Schnitte", "Baumwolle & Performance", "XS–5XL (modellabhängig)"],
};

export const metadata: Metadata = buildCategoryMetadata(props);

export default function Page() {
  return <TextilCategoryPage {...props} />;
}
