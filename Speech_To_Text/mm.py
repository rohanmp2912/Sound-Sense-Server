import io
from google.oauth2 import service_account
from google.cloud import speech

# client_file = 'C:\Users\tejas\Documents\7th SEM\Major_Project_Final\Sound-Sense-Server\Speech_To_Text\keys.json'
client_file = r'C:\Users\tejas\Documents\7th SEM\Major_Project_Final\Sound-Sense-Server\Speech_To_Text\keys.json'

credentials = service_account.Credentials.from_service_account_file(client_file)
client = speech.SpeechClient(credentials=credentials)

# audio_file = 'AAA_Sound_Sample.wav'
audio_file = r'C:\Users\tejas\Documents\7th SEM\Major_Project_Final\Sound-Sense-Server\Speech_To_Text\total_wav_mono.wav'

with io.open(audio_file, 'rb') as f:
    content = f.read()
    audio = speech.RecognitionAudio(content=content)
    
config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=44100,
    language_code='hi-IN'
)

response = client.recognize(config=config, audio=audio)

# Extract the transcribed text
for result in response.results:
    print(f"Transcription: {result.alternatives[0].transcript}")