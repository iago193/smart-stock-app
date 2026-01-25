import images from "@/assets";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-screen h-screen bg-whiteTheme flex justify-center items-center">
      <div className="flex flex-col items-center">
        {/* LOGO */}
        <Image
          src={images.logo}
          alt="Logo"
          width={500}
          height={500}
          className="object-contain"
        />

        {/* BARRA */}
        <div className="loading-bar">
          <span className="loading-bar__indicator" />
        </div>
      </div>
    </div>
  );
}
