import { AboutSection } from "@/components/home/AboutSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedDishes } from "@/components/home/FeaturedDishes";
import { Hero } from "@/components/home/Hero";
import { HomeContact } from "@/components/home/HomeContact";
import { HomeGallery } from "@/components/home/HomeGallery";
import { Specialties } from "@/components/home/Specialties";
import { Testimonials } from "@/components/home/Testimonials";
import { getCategories, getMenuItems } from "@/lib/menu";

export default async function HomePage() {
  const [categories, items] = await Promise.all([
    getCategories(),
    getMenuItems(),
  ]);

  return (
    <>
      <Hero />
      <FeaturedDishes items={items} />
      <CategoryShowcase categories={categories} />
      <AboutSection />
      <Specialties />
      <Testimonials />
      <HomeGallery />
      <HomeContact />
    </>
  );
}
