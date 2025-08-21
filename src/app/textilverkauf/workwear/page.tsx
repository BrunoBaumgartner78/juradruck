import type { Metadata } from "next";
import TextilCategoryPage, { buildCategoryMetadata } from "@/components/TextilCategoryPage";

const props = {
  slug: "workwear",
  title: "Workwear",
  hero: { src: "/images/textilverkauf/arbeitskleider3.webp", alt: "Arbeitskleidung – robuste Workwear" },
  intro: "Jacken, Hosen, Westen – funktional und langlebig.",
  features: ["CORDURA®-Verstärkungen", "Reflex & Wetterfest", "Industriewäsche-fähige Linien"],
};

export const metadata: Metadata = buildCategoryMetadata(props);

export default function Page() {
  return <TextilCategoryPage {...props} />;
}
