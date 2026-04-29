#! /usr/bin/env python

import discord
import os
from dotenv import load_dotenv
from discord.ext import tasks
import json
from git import Repo
from datetime import datetime

gitrepo = '.git'

load_dotenv()
intents = discord.Intents.default()

intents.guild_scheduled_events = True

client = discord.Client(intents=intents)

# Keep a list of valid creators so that we dont get attacked by spam events
# Corgi, Fraeya, Cujo
validEventCreators = [131572993242431488, 1005892341686616216, 181228012430163978]

@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')
    if not hourly_task.is_running():
        hourly_task.start()
    
@tasks.loop(hours=1)
async def hourly_task():
    print("Hour passed!")
    
    events = []

    # in each guild
    for guild in client.guilds:
        # if guild.id == fraeya server id
        
        # for each scheduled event
        for s in guild.scheduled_events:
            
            if (s.creator_id in validEventCreators):
                
                events.append({
                    "begin":s.start_time.isoformat(),
                    "end": s.end_time.isoformat(),
                    "description": s.description,
                    "location": s.location,
                    "name": s.name,
                    "image": s.cover_image.url
                })
                
        
    previous = {}
    with open("calendar/streams.json", "r+") as f:
        previous = json.load(f)
        
    if (previous == events):
        print("No change in events.")
    else:               
        with open("calendar/streams.json", "w+") as f:
            f.write(json.dumps(events))
            
        repo = Repo(gitrepo)
        repo.index.add(['calendar/streams.json'])
        repo.index.commit(f"Event Update: {datetime.now().strftime("%d/%m/%Y, %H:%M:%S")}")
        
        main = repo.remote('origin')
        main.push()
        
        
    

client.run(os.getenv('discordToken'))