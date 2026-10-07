import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout, SEO } from "@/components/layout";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Reviews from "@/sections/Reviews/Reviews";
import ContactUS from "@/sections/ContactUS";
import ServiceSection from "@/sections/Service";

export default function Home() {

  return (
    <>
      <SEO />
      <Layout>
        <Hero />
        <About />
        <ServiceSection />
        <ContactUS />
        <Reviews />
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "seo"])),
    },
  };
}
