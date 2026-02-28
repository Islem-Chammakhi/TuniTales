import { useState } from "react";
import { motion } from "framer-motion";
import PhotoUpload from "@/components/ui/photo-upload";
import RecognitionResult from "@/components/ui/recognition-result";
import { recognizeMonument } from "@/lib/monumentsService";
import { useToast } from "@/hooks/use-toast";
import PatternBackground from "@/components/ui/pattern-background";
import { Helmet } from "react-helmet";
import UserPreferencesModal from "@/components/ui/user-preferences-modal";

export default function Discover() {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<any>(null);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    try {
      setIsRecognizing(true);
      setRecognitionResult(null);

      const result = await recognizeMonument(file);

      setRecognitionResult(result);

      toast({
        title: "Recognition Complete",
        description: `Identified as ${result.recognition.name} with ${result.recognition.confidence} confidence.`,
        variant: "default",
      });
    } catch (error) {
      let message = "Failed to process image";
      if (error instanceof Error) {
        message = error.message;
      }

      toast({
        title: "Recognition Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsRecognizing(false);
    }
  };

  return (
    <>
      <UserPreferencesModal />
      <Helmet>
        <title>TuniTales</title>
        <meta
          name="description"
          content="Upload photos of Tunisian monuments and let our AI identify them. Learn about history, architecture, and cultural significance of each monument."
        />
        <meta property="og:title" content="Discover Monuments - TuniTales" />
        <meta
          property="og:description"
          content="Upload photos of Tunisian monuments and let our AI identify them."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="relative">
        <PatternBackground />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="container mx-auto px-8 lg:px-24 py-16 lg:py-24">
            {/* Writing */}
            <div className="text-center mb-12">
              <motion.h1
                className="text-3xl lg:text-4xl font-bold font-el-messiri text-terracotta mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Identify Tunisian Monuments
              </motion.h1>

              <motion.p
                className="text-lg text-dark-brown/70 max-w-2xl mx-auto"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Upload a photo of a Tunisian monument or landmark to see our AI
                in action. We'll identify it and provide detailed information
                about its history and significance.
              </motion.p>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              {/* UPLOAD PICTURE */}
              <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-col h-full">
                <PhotoUpload onImageUpload={handleImageUpload} isLoading={isRecognizing} />
              </motion.div>

              {/* RESULT */}
              <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col h-full">
                <RecognitionResult result={recognitionResult} isLoading={isRecognizing} />
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </>
  );
}