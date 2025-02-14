from ics import Calendar
import json
from os import listdir

# Find the ics files we have imported
icsFiles = list(filter(lambda x: x.endswith("ics"), listdir("./calendar") ))

events = []

for i in icsFiles:
    with open("./calendar/" + i, 'r', encoding="utf-8") as f:
        c = Calendar(f.read())

        # Read the file and create a calendar dict object
        for e in c.events:
            events.append({

                "begin":e.begin.isoformat(),
                "end": e.end.isoformat(),
                "description": e.description,
                "location": e.location,
                "name": e.name

                })
        
print(json.dumps(events))

# Dump the json list into a new file
with open("./calendar/streams.json", "w+") as f:
    f.write(json.dumps(events))


