"use client";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ImageUploadProps {
  onChange?: (value: any[]) => void; // onChange method passed from InventoryForm
  onRemove: (value: any[]) => void;  // method to remove image
  value: any[];                      // value to hold the image array
}

export const ImageUpload = ({
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
    console.log()
  const [preview, setPreview] = useState<string>(""); // preview for local image
  
  const deleteImg = (link: string) => {
    const updatedImages = value.filter((img) => img.fileUrl !== link);
    onRemove(updatedImages);  // update the images on delete
  };

  const uploadImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      const newImage = {
        fileName: file.name,
        fileSize: file.size,
        fileKey: file.lastModified.toString(),
        fileUrl: newImageUrl,
      };
      
      // update the form with the new image
      onChange?.([...value, newImage]);
      setPreview(newImageUrl);
    }
  };

  return (
    <div className="space-y-1">
      <label htmlFor="name" className="font-medium">
        Product Images *
      </label>
      <Avatar className="w-24 h-24">
        <AvatarImage src={preview} />
        <AvatarFallback>BU</AvatarFallback>
      </Avatar>
      <div className="mb-2 flex flex-wrap gap-1">
        {value.length > 0 && value.map((img) => (
          <div
            key={img.fileUrl}
            className="h-24 w-24 bg-white p-3 shadow-sm rounded-sm border border-gray-200 relative"
          >
            <Image
              src={img.fileUrl}
              alt=""
              className="rounded-lg"
              width={100}
              height={100}
            />
            <div
              className="top-0 absolute right-0 cursor-pointer"
              onClick={() => deleteImg(img.fileUrl)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        ))}
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" onChange={uploadImage} className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
