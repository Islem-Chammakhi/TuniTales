import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/ui/feature-card";
import PhotoUpload from "@/components/ui/photo-upload";
import RecognitionResult from "@/components/ui/recognition-result";
import { useState } from "react";
import { recognizeMonument } from "@/lib/monuments";
import { useToast } from "@/hooks/use-toast";
import { Landmark, Map, CalendarCheck } from "lucide-react";

export default function FeatureSection() {
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
        description: `Identified as ${result.monument.name} with ${result.recognition.confidence} confidence.`,
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
    <section id="discover" className="relative lg:px-14 py-20 lg:py-24 bg-white">
      <div
        className="absolute top-0 left-0 w-full h-16 bg-sand"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
      ></div>

      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold font-el-messiri text-terracotta mb-4 mt-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Discover Tunisia's Heritage
          </motion.h2>
          <motion.p
            className="text-lg text-dark-brown/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Experience Tunisia's rich history through our comprehensive heritage platform
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Landmark className="h-9 w-8 " />}
            title="Identify Tunisian Monuments"
            description="Upload a photo of any Tunisian landmark and our AI will identify it instantly, providing detailed historical and cultural information."
            color="terracotta"
            delay={0.2}
          />

          <FeatureCard
            icon={<CalendarCheck className="h-8 w-8" />}
            title="Plan Your Journey"
            description="Get a personalized travel itinerary crafted to your preferences, covering must-see monuments and hidden gems across Tunisia."
            color="azure-blue"
            delay={0.4}
          />

          <FeatureCard
            icon={<Map className="h-8 w-8" />}
            title="Explore Tunisian Landmarks"
            description="Discover the geographical distribution of historical sites from ancient ruins to architectural wonders across the country."
            color="olive-green"
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
}