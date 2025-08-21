import type { Metadata } from "next";
import TextilCategoryPage, { buildCategoryMetadata } from "@/components/TextilCategoryPage";

const props = {
  slug: "hoodies",
  title: "Hoodies & Sweats",
  hero: { src: "/images/textilverkauf/arbeitskleider6.webp", alt: "Hoodies & Sweats – gemütlich und robust" },
  intro: "Kuschelig & robust – ideal für Teams, Vereine & Merch.",
  features: ["Unisex & Damenmodelle", "Heavy & Oversize", "Stick & Druck möglich"],
};

export const metadata: Metadata = buildCategoryMetadata(props);

export default function Page() {
  return <TextilCategoryPage {...props} />;
}
