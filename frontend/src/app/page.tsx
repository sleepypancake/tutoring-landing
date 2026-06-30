import Hero from "@/components/sections/Hero";
import Problems from "@/components/sections/Problems";
import Programs from "@/components/sections/Programs";
import Results from "@/components/sections/Results";
import HowItWorks from "@/components/sections/HowItWorks";
import Reviews from "@/components/sections/Reviews";
import Videos from "@/components/sections/Videos";
import SignupForm from "@/components/sections/SignupForm";
import { fetchAPI } from "@/lib/strapi";
import type { ContactLink } from "@/lib/contacts";

async function getStrapiData() {
  const results = await Promise.allSettled([
    fetchAPI<{ data: { pairs: unknown[] } }>("/before-after?populate[pairs][populate]=*"),
    fetchAPI<{ data: unknown[] }>("/reviews?populate=*&sort=createdAt:desc"),
    fetchAPI<{ data: unknown[] }>("/video-lessons?populate=*"),
    fetchAPI<{ data: { contacts: ContactLink[]; mapUrl?: string } }>("/contact-info?populate[contacts]=*"),
  ]);

  const beforeAfter = results[0].status === "fulfilled" ? results[0].value : null;
  const reviews = results[1].status === "fulfilled" ? results[1].value.data : [];
  const videos = results[2].status === "fulfilled" ? results[2].value.data : [];
  const contactInfo = results[3].status === "fulfilled" ? results[3].value : null;

  const pairs = (beforeAfter?.data?.pairs ?? []) as {
    id: number;
    beforeImage?: { url: string; alternativeText?: string };
    afterImage?: { url: string; alternativeText?: string };
    label?: string;
  }[];

  const contacts = (contactInfo?.data?.contacts ?? []) as ContactLink[];
  const mapEmbed = contactInfo?.data?.mapUrl ?? null;

  return { pairs, reviews, videos, contacts, mapEmbed };
}

export default async function Home() {
  const { pairs, reviews, videos, contacts, mapEmbed } = await getStrapiData();

  return (
    <>
      <Hero beforeAfterPairs={pairs.length ? pairs : undefined} contacts={contacts} />
      <Problems />
      <Programs />
      <Results pairs={pairs.length ? pairs : undefined} />
      <HowItWorks mapEmbed={mapEmbed} />
      <Reviews reviews={reviews.length ? (reviews as Parameters<typeof Reviews>[0]["reviews"]) : undefined} />
      <Videos videos={videos.length ? (videos as Parameters<typeof Videos>[0]["videos"]) : undefined} />
      <SignupForm contacts={contacts} />
    </>
  );
}
