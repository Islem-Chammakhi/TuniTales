from google.cloud import texttospeech
from google.api_core.exceptions import GoogleAPICallError, RetryError
import os

# Define the environment variable pointing to the JSON file for Google Cloud credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "app/utils/ttskey.json"

def synthesize_ssml(ssml_text: str, language_code: str, voice_name: str = None):
    try:
        client = texttospeech.TextToSpeechClient()

        synthesis_input = texttospeech.SynthesisInput(ssml=ssml_text)

        voice = texttospeech.VoiceSelectionParams(
            language_code=language_code,
            name=voice_name or f"{language_code}-Wavenet-A"
        )

        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

        response = client.synthesize_speech(
            input=synthesis_input,
            voice=voice,
            audio_config=audio_config
        )

        print("✅ Audio content generated !")
        return response.audio_content

    except GoogleAPICallError as api_error:
        print("❌ Erreur lors de l'appel à l'API Google Cloud TTS :", api_error.message)
        raise

    except RetryError as retry_error:
        print("❌ Erreur de reconnexion/répétition :", retry_error)
        raise

    except FileNotFoundError as e:
        print("❌ Fichier de clé JSON non trouvé ou chemin invalide :", e)
        raise

    except Exception as e:
        print("❌ Une erreur inattendue est survenue :", e)
        raise
