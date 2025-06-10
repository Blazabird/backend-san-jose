import Image from "next/image";
import ResponsiveAppBar from "../../components/Layout/navbar";
import Banner from "../../components/MainPage/banner/banner";
import Levels from "../../components/MainPage/levels/levels";
import AcademicOffer  from "../../components/MainPage/welcomeMessage/academicOffer";
import DateCalendarServerRequest from "../../components/MainPage/newsSection/events/calendar";
import NewsSection from "../../components/MainPage/newsSection/news/news";
import Information from "../../components/MainPage/aboutUs/headSection/information"
import StayConnected from "../../components/MainPage/socialMediaSection/socialMedia"
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
