import Image from "next/image";
import ResponsiveAppBar from "../../components/navbar";
import Banner from "../../components/banner";
import CustomTabPanel from "../../components/selector";
import Levels from "../../components/levels";
import AcademicOffer  from "../../components/academicOffer";
import DateCalendarServerRequest from "../../components/calendar";
import NewsSection from "../../components/news";
import Information from "../../components/information"
import StayConnected from "../../components/socialMedia"
import Footer from "../../components/footer";



export default function Home() {
  return (
    <div className="bg-gray-100">
        <ResponsiveAppBar />
        <Banner />
        <AcademicOffer/>
        <Information/>
        <Levels/>
        <NewsSection/>
        <DateCalendarServerRequest/>
        <StayConnected/>
        <Footer/>
    </div>
  );
}
