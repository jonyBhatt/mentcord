"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageField" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {

    const fileType = value?.split('.').pop();

    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image fill src={value} alt="image" className="rounded-full" />
                <button className="bg-rose-500 text-white rounded-full p-0.5 absolute top-0 right-0"  onClick={()=>onChange("")}>
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

  return (
    <UploadDropzone
      endpoint="serverImage"
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error.message);
      }}
    />
  );
};
