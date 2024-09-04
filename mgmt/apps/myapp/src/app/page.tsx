import Image from "next/image";
import Appbar from "./components/Appbar";

export default function Home() {
  const img = "https://www.shutterstock.com/image-photo/food-background-spices-herbs-utensil-260nw-2254302831.jpg";

  return (
    <>
      <div
        style={{
          margin: 0,
          padding: 0,
          height: '100vh',
          width: '100vw',
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden' // Prevents any overflow
        }}
      >
        {/* Your content here */}
        home screen
        <Appbar/>
      </div>
    </>
  );
}
