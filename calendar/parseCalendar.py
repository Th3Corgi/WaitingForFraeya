from ics import Calendar
import json

# Currently manually added, will need a better way to resolve that...
files = ["calendar\discord-event.ics", "calendar\discord-event1.ics", "calendar\discord-event2.ics"]

events = []
for i in files:
    with open(i, 'r') as f:
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


