"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { UploadCloud } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import UploadToCloudinary from "@/actions/uploadFile";
import { Label } from "./ui/label";

export const ImageUpload = ({
  imageUrl,
  setValue
}: {
  imageUrl?: string | null;
  setValue: (url: string) => void;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
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
      <Label className="self-start mb-2">
        Image <span className="text-xs text-muted-foreground">(Optional)</span>
      </Label>

      {imageUrl || previewUrl ? (
        <div className="flex flex-col items-start gap-2">
          <Image
            src={previewUrl || imageUrl!}
            alt="Uploaded image"
            width={200}
            height={200}
            className="rounded-xl border shadow object-cover"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => inputRef.current?.click()}
            disabled={loading}
          >
            Change Image
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="gap-2 w-full border-dashed"
        >
          <UploadCloud />
          Upload Thumbnail
        </Button>
      )}

      <Input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
};
