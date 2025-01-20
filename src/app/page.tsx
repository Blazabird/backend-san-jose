import Image from "next/image";
import ResponsiveAppBar from "../../components/navbar";
import Banner from "../../components/banner";
import CustomTabPanel from "../../components/selector";


export default function Home() {
  return (
    <div>
        <ResponsiveAppBar />
        <Banner />
        <CustomTabPanel/>
    </div>
  );
}
