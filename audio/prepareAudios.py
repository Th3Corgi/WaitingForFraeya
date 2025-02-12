from os import listdir
import json

# Find the audio files we have imported
audios = list(filter(lambda x: x.endswith("mp3"), listdir("./audio") ))

print(json.dumps(audios))

# Dump the json list into a new file
with open("audio\audioList.json", "w+") as f:
    f.write(json.dumps(audios))