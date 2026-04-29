import json
from datetime import datetime, timezone


streams=[]

with open("./calendar/streams.json", "r+") as f:
    streams = json.load(f)
    
    
streams.sort(key=lambda x: x["begin"]) 
    
for s in streams:
    now = datetime.now(timezone.utc)
    
    if datetime.fromisoformat(s["end"]) < now: 
        # Already ended
        continue
    
    if datetime.fromisoformat(s["begin"]) < now:
        # currently live
        with open("./calendar/nextStream.txt", "w+") as f:
            f.write(f"Next Stream: Currently Live!!!")
        exit()
        
    if datetime.fromisoformat(s["begin"]) > now:
        # Soon to be live
        diff = datetime.fromisoformat(s["begin"]) - now
        
        days = int(diff.total_seconds() // 86400) 
        hours = int((diff.total_seconds() % 86400) // 3600)
        minutes = int((diff.total_seconds() % 3600) // 60)
        seconds = int(diff.total_seconds() % 60)
        
        parts = []
        if days: parts.append(f"{days} days,")
        if hours: parts.append(f"{hours} hours,")
        if minutes: parts.append(f"{minutes} minutes,")
        if seconds: parts.append(f"{seconds} seconds until stream!")
        
        with open("./calendar/nextStream.txt", "w+", encoding="utf-8") as f:
            f.write(f"Next Stream: {s["description"]} {" ".join(parts) if parts else "Fraeya is Live!!!"}")
        exit()
        
    exit()

with open("./calendar/nextStream.txt", "w+") as f:
        f.write(f"Next Stream: Unknown!")
    
    
    
    





