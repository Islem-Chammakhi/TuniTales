## TuniTales
Our solution makes exploring Tunisia’s cultural heritage fun and interactive, helping travelers discover and connect with our country in a whole new way.

![App Preview](https://i.imgur.com/TH27OC6.png)

## How It Works
Users can simply snap a photo of a monument, and our platform instantly recognizes it, narrates its history, and generates a 3D street view to explore the surrounding area. To enhance the travel experience, 
it also features a smart trip planner that builds personalized itineraries based on the traveler’s interests, budget, and schedule. And lastly, an interactive map that highlights key monuments across Tunisia
and offers brief descriptions and rich cultural insights to guide and inspire exploration.

## AI & Integrations
At its core, our app combines multiple AI technologies: a fine-tuned EfficientNetB0 model for monument recognition, voice narration delivered via Google Cloud's Text-to-Speech, and a trip planning system 
powered by Gemini 2.0 Flash.

## Demo
You can view the demo [here](https://drive.google.com/file/d/1xiL7k3d7-w0yAFbiE2fsUIy83xwre6wr/view?usp=sharing).

## Created By
- Islem Chammakhi
- Firas Ben Ali

## Getting Started
1. **Clone the project**
   ```bash
   git clone https://github.com/Islem-Chammakhi/TuniTales.git
   cd tunitales
   ```
   
2. **Create a .env file in the python directory and add your environment variables.**
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Add your Google Cloud Text-to-Speech service account key.**
   - Place your ttskey.json file in python/app/utils/
   - This file is required for the voice narration feature

4. **Install dependencies**
   ```bash
   npm install
   ```
