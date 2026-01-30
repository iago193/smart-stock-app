import images from "@/assets";
import Image from "next/image";

export default function Unauthorized() {
  return (
    <div className="w-full h-screen">
      <div className="h-full flex-col flex justify-center items-center">
        <Image
          src={images.unauthorized}
          alt="Acesso não autorizado"
          width={400}
          height={400}
        />
        <p className="text-4xl mx-2 font-bold">
          Você não tem acesso a essa página!
        </p>
      </div>
    </div>
  );
}
