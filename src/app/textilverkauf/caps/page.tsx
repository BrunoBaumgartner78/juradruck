import type { Metadata } from "next";
import TextilCategoryPage, { buildCategoryMetadata } from "@/components/TextilCategoryPage";

const props = {
  slug: "caps",
  title: "Caps & Beanies",
  hero: { src: "/images/shop/textilverkauf.webp", alt: "Caps & Beanies – ideal zum Besticken" },
  intro: "Snapbacks, Trucker, Fisherman – perfekt zum Besticken.",
  features: ["Bestickbar & langlebig", "One‑Size & verstellbar", "Trendmodelle & Klassiker"],
};

export const metadata: Metadata = buildCategoryMetadata(props);

export default function Page() {
  return <TextilCategoryPage {...props} />;
}
