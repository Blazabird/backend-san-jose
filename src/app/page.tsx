import Image from "next/image";
import ResponsiveAppBar from "../../components/navbar";
import Banner from "../../components/banner";
import CustomTabPanel from "../../components/selector";
import Levels from "../../components/levels";
import AcademicOffer  from "../../components/academicOffer";



export default function Home() {
  return (
    <div className="bg-gray-100">
        <ResponsiveAppBar />
        <Banner />
        <AcademicOffer/>
        <CustomTabPanel/>
        <Levels/>
    </div>
  );
}
