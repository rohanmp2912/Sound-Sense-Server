from flask import Flask, request, jsonify
from google.oauth2 import service_account
from google.cloud import speech
from flask_cors import CORS
import io
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

client_file = r'C:\Users\tejas\Documents\7th SEM\Major_Project_Final\Sound-Sense-Server\Speech_To_Text\keys2.json'

credentials = service_account.Credentials.from_service_account_file(client_file)
client = speech.SpeechClient(credentials=credentials)

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    try:
        if 'file' not in request.files:
            return jsonify({"message": "No file part in the request"}), 400

        file = request.files['file']
        
        if file.filename == '':
            return jsonify({"message": "No file selected"}), 400

        audio_content = file.read()
        audio = speech.RecognitionAudio(content=audio_content)

        config = speech.RecognitionConfig(
            model="latest_short",
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=44100,
            language_code='kn-IN',  
            enable_automatic_punctuation=True 
        )

        response = client.recognize(config=config, audio=audio)

        transcriptions = []
        for result in response.results:
            transcriptions.append(result.alternatives[0].transcript)

        return jsonify({"message": transcriptions[0] if transcriptions else "No transcription found"})
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
