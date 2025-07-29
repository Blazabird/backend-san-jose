// src/app/page.tsx

import React from "react";
import NewsEventsSection from "../../../components/mainPage/newsSection/newsEvents";
import NewsBanner from "../../../components/newsPage/newsBanner/banner";
import StayConnected from "../../../components/mainPage/socialMediaSection/socialMedia";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* You can have other sections here too */}
      {/* <HeroSection /> */}
      {/* <AboutSection /> */}
       <NewsBanner/>
      <NewsEventsSection />
      <StayConnected/>

      {/* <Footer /> */}
    </main>
  );
}
