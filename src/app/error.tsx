"use client";

import { useEffect } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="text-2xl">
          <h1 className="mb-3 font-bold">Ops! Algo deu errado</h1>
          <p className="text-lg">Nosso servidor parece estar fora do ar.</p>

          <button
            className="bg-blue-500 hover:bg-blue-600 
             cursor-pointer p-2 rounded-2xl font-bold text-white mt-2 
             transition duration-300 flex justify-center items-center gap-2"
            onClick={() => {
              reset();
              router.refresh();
            }}
          >
            <MdOutlineRefresh /> Tentar novamente
          </button>
        </div>
      </div>
    </div>
  );
}
