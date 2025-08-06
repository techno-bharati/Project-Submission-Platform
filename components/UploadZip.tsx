"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { UploadCloud } from "lucide-react";
import { uploadFile } from "@/utils/uploadFile";

export const ZipUpload = ({
  fileUrl,
  setValue
}: {
  fileUrl?: string | null;
  setValue: (url: string) => void;
}) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".zip")) {
      alert("Please upload a .zip file");
      return;
    }

    setSelectedFileName(file.name);
    setLoading(true);

    try {
      const secure_url = await uploadFile(file);

      if (secure_url) {
        setValue(secure_url); // Save URL to form
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Label className="self-start mb-2">
        Project Zip File{" "}
        <span className="text-xs text-muted-foreground">(Required)</span>
      </Label>

      {fileUrl || selectedFileName ? (
        <div className="flex flex-col items-start gap-2">
          <p className="text-sm font-medium">
            {selectedFileName || fileUrl?.split("/").pop()}
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => inputRef.current?.click()}
            disabled={loading}
          >
            Change File
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
          {loading ? "Uploading..." : "Upload Zip File"}
        </Button>
      )}

      <Input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
        accept=".zip"
      />
    </div>
  );
};
