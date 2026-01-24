"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";
import { MdOutlinePhotoCamera, MdClose } from "react-icons/md";
import { HiSave } from "react-icons/hi";
import actionPreviewImage from "./action-preview-image";
import { useAuth } from "@/contexts/AuthContext";

type PreviewImageProps = {
  file?: File | null;
  imageUrl?: string | StaticImageData | null;
  previewIsOpen: boolean;
  setPreviewIsOpen: (isOpen: boolean) => void;
};

export default function PreviewImage({
  file,
  imageUrl,
  previewIsOpen,
  setPreviewIsOpen,
}: PreviewImageProps) {
  const styleSecondaryButton =
    "cursor-pointer flex flex-col rounded-2xl p-2 hover:text-gray-800 items-center text-lg text-white mt-5 hover:bg-gray-400 transition duration-300";

  const previewUrl = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    if (imageUrl) return imageUrl;
    return null;
  }, [file, imageUrl]);

  useEffect(() => {
    return () => {
      if (file && typeof previewUrl === "string") {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [file, previewUrl]);

  const { user } = useAuth();

  const handleSubmit = () => {
    if (!user || !file) return;
    console.log(file);
    const res = actionPreviewImage(file, user.id);
    console.log(res);
  };

  if (!previewIsOpen || !previewUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-800 w-[600px] rounded-lg p-4 flex flex-col items-center gap-4 relative">
        <h2 className="w-full text-start font-bold text-2xl mb-5 text-white">
          Foto do perfil
        </h2>
        <Image
          src={previewUrl}
          alt="Preview da imagem"
          width={200}
          height={200}
          className="w-[200px] h-[200px] rounded-full object-cover"
        />

        <div className="w-full flex gap-3 border-t-2 border-t-gray-600">
          <button
            onClick={() => setPreviewIsOpen(false)}
            className="px-4 py-2 mt-5 text-white hover:text-gray-800 rounded hover:bg-gray-400 transition duration-300 absolute -top-4 right-2"
          >
            <MdClose size={30} />
          </button>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex justify-center items-center gap-4"
          >
            <label htmlFor="file" className={`${styleSecondaryButton}`}>
              <MdOutlinePhotoCamera size={40} /> Atualizar foto
            </label>
            <button
              type="submit"
              className={`${styleSecondaryButton} ${!file ? "hidden" : ""}`}
            >
              {<HiSave size={40} />}Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
