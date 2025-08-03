"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { FileText, UploadCloud } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import UploadToCloudinary from "@/actions/uploadFile";
import { Label } from "./ui/label";

export const PPTUpload = ({
  fileUrl,
  setValue
}: {
  fileUrl?: string | null;
  setValue: (url: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: uploadFile } = useMutation({
    mutationFn: UploadToCloudinary,
    onSuccess: (data) => {
      if (data.public_id) {
        setValue(data.public_id);
      }
    }
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    try {
      await uploadFile(file);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Label className="self-start mb-2">Project Presentation</Label>

      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="gap-2 w-full border-dashed"
      >
        {fileName ? (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <FileText className="w-4 h-4" />
            {fileName}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <UploadCloud />
            Upload PPT
          </div>
        )}
      </Button>

      <Input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
        accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
      />
    </div>
  );
};
