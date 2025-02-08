from ics import Calendar
import json
from os import listdir

icsFiles = list(filter(lambda x: x.endswith("ics"), listdir("./calendar") ))


events = []
for i in icsFiles:
    with open("./calendar/" + i, 'r') as f:
        c = Calendar(f.read())

        for e in c.events:
            events.append({

                "begin":e.begin.isoformat(),
                "end": e.end.isoformat(),
                "description": e.description,
                "location": e.location,
                "name": e.name

                })
        
print(json.dumps(events))

with open("calendar\streams.json", "w+") as f:
    f.write(json.dumps(events))


