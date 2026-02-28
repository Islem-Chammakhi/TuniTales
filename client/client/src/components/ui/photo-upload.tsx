import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, Camera } from "lucide-react";

interface PhotoUploadProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

export default function PhotoUpload({ onImageUpload, isLoading }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const processFile = (file: File) => {
    // Create preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Pass file to parent
    onImageUpload(file);
  };


  return (
    <div className="bg-[#fff8eb] rounded-2xl p-8 lg:py-14 lg:px-10 shadow-lg h-full">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold font-el-messiri text-dark-brown mb-4">
          Try Monument Recognition
        </h2>
        <p className="text-dark-brown/80 mb-6">
          Upload a photo of a Tunisian monument or landmark to see our AI in
          action. We'll identify it and provide detailed information.
        </p>
      </div>

      <div
        className={`border-2 border-dashed ${
          dragActive
            ? "border-terracotta bg-terracotta/5"
            : "border-terracotta/50"
        } rounded-xl p-8 text-center bg-sand relative`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="relative max-w-xl mx-auto">
            {" "}
            <img
              src={previewUrl}
              alt="Uploaded monument"
              className={`max-h-[350px] max-w-full w-auto h-auto mx-auto rounded-lg object-contain transition-opacity duration-300 ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
            />
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 text-terracotta mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Drag & Drop Your Photo</h3>
            <p className="text-sm text-dark-brown/60 mb-4">
              or click to browse files
            </p>
          </>
        )}

        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        <Button
          onClick={handleButtonClick}
          className="w-full sm:w-auto py-6 px-6 bg-terracotta text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors mt-5 text-center break-words whitespace-normal"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : previewUrl ? (
            "Upload Another Image"
          ) : (
            "Upload Image"
          )}
        </Button>

        <p className="text-xs text-dark-brown/50 mt-5">
          Supports JPG, PNG • Max size 10MB
        </p>
      </div>
    </div>
  );
}