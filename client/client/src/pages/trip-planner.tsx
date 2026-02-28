import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Wallet, Car, Clock, User, Loader2, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import InterestsStep from "@/components/questionnaire/InterestsStep";
import SeasonStep from "@/components/questionnaire/SeasonStep";
import BudgetStep from "@/components/questionnaire/BudgetStep";
import TransportStep from "@/components/questionnaire/TransportStep";
import DurationStep from "@/components/questionnaire/DurationStep";
import DepartureCityStep from "@/components/questionnaire/DepartureCityStep";
import TravelResult from "@/components/questionnaire/TravelResult";
import axios from "@/lib/axios";
import PatternBackground from "@/components/ui/pattern-background";

export interface FormData {
  interests: string[];
  season: string;
  budget: string;
  transport: string;
  duration: string;
  departureCity: string;
}

const TravelQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    interests: [],
    season: "",
    budget: "",
    transport: "",
    duration: "",
    departureCity: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      id: "interests",
      title: "What interests you?",
      subtitle: "Choose the types of places you love to explore",
      icon: MapPin,
      component: InterestsStep,
    },
    {
      id: "season",
      title: "When do you prefer to visit?",
      subtitle: "Select your ideal travel season",
      icon: Calendar,
      component: SeasonStep,
    },
    {
      id: "budget",
      title: "What's your budget?",
      subtitle: "Choose your comfortable spending range",
      icon: Wallet,
      component: BudgetStep,
    },
    {
      id: "transport",
      title: "How do you like to travel?",
      subtitle: "Select your preferred mode of transportation",
      icon: Car,
      component: TransportStep,
    },
    {
      id: "duration",
      title: "How long is your trip?",
      subtitle: "Tell us about your travel duration",
      icon: Clock,
      component: DurationStep,
    },
    {
      id: "departure",
      title: "Where are you starting from?",
      subtitle: "Choose your departure city (optional)",
      icon: User,
      component: DepartureCityStep,
    },
  ];

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log("Form submitted:", formData);
    try {
      const response = await axios.post("planner_trip", formData);
      console.log(response.data);
      setResult(response.data);
      setShowResult(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startOver = () => {
    setShowResult(false);
    setCurrentStep(0);
    setFormData({
      interests: [],
      season: "",
      budget: "",
      transport: "",
      duration: "",
      departureCity: "",
    });
  };

  const currentStepData = steps[currentStep];
  const StepComponent = currentStepData.component;
  const Icon = currentStepData.icon;

  const isStepValid = () => {
    switch (currentStepData.id) {
      case "interests":
        return formData.interests.length > 0;
      case "season":
        return formData.season !== "";
      case "budget":
        return formData.budget !== "";
      case "transport":
        return formData.transport !== "";
      case "duration":
        return formData.duration !== "";
      case "departure":
        return true; // Optional step
      default:
        return true;
    }
  };

  return (
    <div className="relative">
      <PatternBackground />

      <div className="min-h-screen container mx-auto px-4 py-16 lg:py-24 relative z-10">
        {/* Header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={showResult ? "result-header" : "questionnaire-header"}
            className="text-center mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold font-el-messiri text-terracotta mb-4">
              {showResult
                ? "Your Tunisian Adventure Awaits!"
                : "Plan your Trip to Tunisia"}
            </h1>
            <p className="text-lg text-dark-brown/70 max-w-3xl mx-auto">
              {showResult
                ? "Here's your personalized itinerary based on your preferences"
                : "Plan your ideal Tunisian journey by filling this easy form and we'll create a tailored itinerary from start to finish."}
            </p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="questionnaire"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Progress Bar */}
              <div className="bg-sand/50 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      {steps.map((step, index) => (
                        <div
                          key={step.id}
                          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300 border border-gray-300 ${
                            index <= currentStep
                              ? "bg-terracotta text-white"
                              : "bg-[#fff8eb] text-gray-800"
                          }`}
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>
                    <div className="w-full bg-[#fff8eb] rounded-sm h-2 border border-gray-300">
                      <motion.div
                        className="bg-terracotta h-2 rounded-full border border-b-gray-300"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${((currentStep + 1) / steps.length) * 100}%`,
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="container mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-5xl mx-auto mb-10"
                  >
                    <Card className="p-8 bg-[#fff8eb]/90 backdrop-blur-sm border-orange-200/50 shadow-xl">
                      {/* Step Header */}
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                          <Icon className="w-8 h-8 text-orange-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                          {currentStepData.title}
                        </h2>
                        <p className="text-gray-600">
                          {currentStepData.subtitle}
                        </p>
                      </div>

                      {/* Step Content */}
                      <StepComponent
                        formData={formData}
                        updateFormData={updateFormData}
                      />

                      {/* Navigation */}
                      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          disabled={currentStep === 0}
                          className="px-8 py-6 bg-terracotta text-white font-medium hover:bg-background hover:text-terracotta hover:border-terracotta transition-all shadow-md flex items-center justify-center space-x-2"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous</span>
                        </Button>

                        <Button
                          onClick={nextStep}
                          disabled={!isStepValid() || isLoading}
                          variant="outline"
                          className="px-8 py-6 border-azure-blue text-azure-blue font-medium hover:bg-azure-blue hover:text-white transition-all flex items-center justify-center space-x-2"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>
                                {currentStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </span>
                              <ChevronRight className="w-4 h-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10, }}
              className="max-w-7xl mx-auto"
            >
              <TravelResult formData={formData} onStartOver={startOver} data={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TravelQuestionnaire;