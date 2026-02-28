from google import genai
import os
from dotenv import load_dotenv
import json
import re

load_dotenv() 
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def trip(user_interests, user_season, user_budget, user_transport,user_duration,user_city) -> str:
    prompt =f"""
        You are a smart travel assistant for tourists visiting Tunisia.
        Based on the following user profile and preferences, generate a personalized travel suggestion in Tunisia. The response must be structured, detailed, and helpful.

        *User Input:*

        Interests: {user_interests}

        Preferred Season: {user_season}

        Budget: {user_budget}

        Transportation: {user_transport}

        Trip Duration: {user_duration}

        Starting City: {user_city}

        *Output*

        The suggestions include:

        Destination(s): Place names with short description

        Key Activities or Monuments to Visit

        Estimated total cost (I need an approximate number only, not detailed breakdown)

        Suggested transportation mode(s)

        Recommended itinerary (day-by-day if possible)

        Travel tips for the user based on preferences and season

        Some remarks are to be realistic and helpful. Write as if you're a professional local travel guide assisting a real tourist.The descriptions are brief, long paragraphs are not allowed.

        WHAT I NEED YOU TO DO:
        Your job is to return the result as a structured JSON object with the following keys: (don’t change anything from the JSON format, keep this same structure no matter what)
        {{
        "destination": "",
        "description": "",
        "highlights": [],
        "estimated_cost": "",
        "transportation": "",
        "itinerary": [],
        "tips": ""
        }}
        Format the itinerary as an array of objects, where each object has the following structure:
        {{
        "day": 1,
        "location": "City or region name",
        "activities": [
            "Activity 1",
            "Activity 2",
            "Activity 3"
        ]
        }}
        
    """


    response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)

    if not response or not response.text:
        raise ValueError("No response received from the AI model.")
    
    # Nettoyer les balises Markdown si présentes
    cleaned_text = response.text.strip()
    if cleaned_text.startswith("```json"):
        cleaned_text = re.sub(r"^```json", "", cleaned_text).strip()
    if cleaned_text.endswith("```"):
        cleaned_text = re.sub(r"```$", "", cleaned_text).strip()

    try:
        # Tenter de parser le JSON
        response_json = json.loads(cleaned_text)
        return response_json
    except json.JSONDecodeError:
        print("❌ Failed to parse response as JSON. Returning raw text.")
        print(f"Response: {cleaned_text}")
        return cleaned_text
