import Image from "next/image";
import ResponsiveAppBar from "../../components/Layout/navbar";
import Banner from "../../components/mainPage/banner/banner";
import Levels from "../../components/mainPage/levels/levels";
import AcademicOffer  from "../../components/mainPage/welcomeMessage/academicOffer";
import DateCalendarServerRequest from "../../components/mainPage/newsSection/events/calendar";
import NewsSection from "../../components/mainPage/newsSection/news/news";
import Information from "../../components/mainPage/aboutUs/headSection/information"
import StayConnected from "../../components/mainPage/socialMediaSection/socialMedia"
import Footer from "../../components/Layout/footer";



export default function Home() {
  return (
    <div className="bg-gray-100">
      
        <Banner />
        <AcademicOffer/>
        <Information/>
        <Levels/>
        <NewsSection/>
        <DateCalendarServerRequest/>
        <StayConnected/>
     
    </div>
  );
}
