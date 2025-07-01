from ics import Calendar
import json
from os import listdir
import time
import datetime

# Find the ics files we have imported
icsFiles = list(filter(lambda x: x.endswith("ics"), listdir("./calendar") ))

events = []
streams = []

for i in icsFiles:
    with open("./calendar/" + i, 'r', encoding="utf-8") as f:
        c = Calendar(f.read())

        # Read the file and create a calendar dict object
        for e in c.events:
            
            streams.append({
                "begin":e.begin.timestamp(),
                "end": e.end.timestamp(),
                "description": e.description
            })
            
            events.append({

                "begin":e.begin.isoformat(),
                "end": e.end.isoformat(),
                "description": e.description,
                "location": e.location,
                "name": e.name

                })
        
#print(json.dumps(events))

# Dump the json list into a new file
with open("./calendar/streams.json", "w+") as f:
    f.write(json.dumps(events))
    
streams.sort(key=lambda x: x["begin"]) 
    
for s in streams:
    now = time.time()
    
    if s["end"] < now: 
        # Already ended
        continue
    
    if s["begin"] < now:
        # currently live
        with open("./calendar/nextStream.txt", "w+") as f:
            f.write(f"Next Stream: Currently Live!!!")
        break
        
    if s["begin"] > now:
        # Soon to be live
        diff = s["begin"] - now
        
        days = int(diff // 86400) 
        hours = int(diff // 3600)
        minutes = int((diff % 3600) // 60)
        seconds = int(diff % 60)
        
        parts = []
        if days: parts.append(f"{days} days,")
        if hours: parts.append(f"{hours} hours,")
        if minutes: parts.append(f"{minutes} minutes,")
        if seconds: parts.append(f"{seconds} seconds until stream!")
        
        with open("./calendar/nextStream.txt", "w+", encoding="utf-8") as f:
            f.write(f"Next Stream: {s["description"]} {" ".join(parts) if parts else "Fraeya is Live!!!"}")
        break
    
    with open("./calendar/nextStream.txt", "w+") as f:
        f.write(f"Next Stream: Unknown!")
        
    break
    
    
    
    





