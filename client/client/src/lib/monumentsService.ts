import { Monument, RecognitionResult } from "../types/monument";
import { monumentsData, recognizedMonuments } from "../data/monuments";
import axios from "./axios";

// Simulated delay to mimic API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Get all monuments
export async function getMonuments(): Promise<Monument[]> {
  await delay(300); // Simulate network delay
  return [...monumentsData];
}

// Get monument by ID
export async function getMonumentById(id: number): Promise<Monument> {
  await delay(200);
  const monument = monumentsData.find((m) => m.id === id);

  if (!monument) {
    throw new Error("Monument not found");
  }

  return monument;
}

// Get monuments by category
export async function getMonumentsByCategory(
  category: string
): Promise<Monument[]> {
  await delay(300);
  if (category === "All Monuments") {
    return [...monumentsData];
  }
  return monumentsData.filter((m) => m.category === category);
}

// Simulated monument recognition
export async function recognizeMonument(
  imageFile: File
): Promise<{ recognition: RecognitionResult }> {
  await delay(2000); // Simulate processing time
  const formData = new FormData();
  formData.append("file", imageFile);
  try {
    const response = await axios.post("predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Response from server:", response.data);
    if (response.status !== 200) {
      throw new Error("Failed to recognize monument");
    }
    // Create a local URL for the uploaded image
    const imageUrl = URL.createObjectURL(imageFile);

    // Generate a simulated recognition result
    const recognition: RecognitionResult = {
      id: Math.floor(Math.random() * 1000),
      imageUrl,
      confidence: (response.data.confidence * 100).toFixed(3) + "%",
      timestamp: new Date().toISOString(),
      name: response.data.predicted_class,
      name2:
        recognizedMonuments[
          response.data.predicted_class as keyof typeof recognizedMonuments
        ],
    };

    return { recognition };
  } catch (error) {
    throw new Error("Failed to recognize monument. Please try again.");
  }
}

export function playAudioFromBlob(
  blob: Blob,
  currentAudio: HTMLAudioElement | null = null
) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audioUrl = URL.createObjectURL(blob);
  currentAudio = new Audio(audioUrl);
  currentAudio.play();
}

export function stopAudio(currentAudio: HTMLAudioElement | null = null) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

export async function fetchAndPlayAudio(
  monument: string,
  userType: string,
  language: string,
  currentAudio: HTMLAudioElement | null = null
) {
  try {
    stopAudio(currentAudio);

    const response = await axios.post(
      "assistant",
      { name: monument, user_type: userType, language },
      { responseType: "blob" }
    );

    playAudioFromBlob(response.data, currentAudio); // Joue le fichier reçu
  } catch (error) {
    console.error("Erreur lors de la lecture audio :", error);
  }
}

// Export monument categories for filtering
export { monumentCategories } from "../types/monument";
