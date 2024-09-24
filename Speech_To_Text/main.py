import io
from google.oauth2 import service_account
from google.cloud import speech

# Set the paths for your client file and audio file
client_file = r'C:\Users\tejas\Documents\7th SEM\Major_Project_Final\Sound-Sense-Server\Speech_To_Text\keys2.json'
audio_file = r'C:\Users\tejas\Documents\7th SEM\Major_Project_Final\Sound-Sense-Server\Speech_To_Text\leaf_big_mono.wav'
output_file = r'C:\Users\tejas\Documents\7th SEM\Major_Project_Final\Sound-Sense-Server\Speech_To_Text\transcription_output.txt'

# Load credentials and initialize the Speech client
credentials = service_account.Credentials.from_service_account_file(client_file)
client = speech.SpeechClient(credentials=credentials)

# Read the audio file
with io.open(audio_file, 'rb') as f:
    content = f.read()
    audio = speech.RecognitionAudio(content=content)

# Configure the recognition settings with `single_utterance` enabled
config = speech.RecognitionConfig(
    model="latest_short",
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=44100,
    language_code='kn-IN',
    enable_automatic_punctuation=True,  # Optional: Add punctuation if needed
    # single_utterance=True               # Enable single utterance mode
)

# Perform speech-to-text
response = client.recognize(config=config, audio=audio)

# Extract the transcription and save it to a file
with open(output_file, 'w', encoding='utf-8') as out_f:
    for result in response.results:
        out_f.write(result.alternatives[0].transcript + '\n')

print(f"Transcription saved to {output_file}")
