import Image from "next/image";
import LandingPage from "./components/landingPage";
// import { RecoilRoot } from "recoil"

export default function Home() {
  // const img = "https://img.freepik.com/free-photo/ingredients-cabbage-carrot-pie-cabbage-carrots-eggs-flour-milk-butter-spices-white-background_127032-2819.jpg"
  return (
    <>
      <div className="">
        {/* <img src = {`${img}`} */}

        <LandingPage />
        {/* Your content here */}
        {/* home screen */}
        {/* <RecoilRoot> */}

        {/* </RecoilRoot> */}
      </div>

    </>
  );
}
