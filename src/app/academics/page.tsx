import React from "react";
import AcademicsBanner from "../../../components/academics/banner/banner";
import Levels from "../../../components/mainPage/levels/levels";
import StayConnected from "../../../components/mainPage/socialMediaSection/socialMedia";
import AchievementsSection from "../../../components/academics/achievements/achievements";
import PhilosophySection from "../../../components/academics/mission/mission";
import ImageCarousel from "../../../components/mainPage/slider_UNUSED/slider";

export default function AcademicsPage() {
  return (
    <div className="bg-white w-full overflow-x-hidden">
      <AcademicsBanner />
      <ImageCarousel/>
      <PhilosophySection/>
      <AchievementsSection/>
      <Levels/>
      <StayConnected/>
    </div>
  );
}
