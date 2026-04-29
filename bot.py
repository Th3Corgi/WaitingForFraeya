#! /usr/bin/env python

import discord
import os
from dotenv import load_dotenv
from discord.ext import tasks
import json
from git import Repo
from datetime import datetime
import logging
import sys

gitrepo = '.git'
logging.basicConfig(stream=sys.stdout, level=logging.INFO)

load_dotenv()

intents = discord.Intents.default()

intents.guild_scheduled_events = True

client = discord.Client(intents=intents)

# Keep a list of valid creators so that we dont get attacked by spam events
# Corgi, Fraeya, Cujo
validEventCreators = [131572993242431488, 1005892341686616216, 181228012430163978]

@client.event
async def on_ready():
    logging.info(f'We have logged in as {client.user}')
    if not hourly_task.is_running():
        hourly_task.start()
    
@tasks.loop(hours=1)
async def hourly_task():
    logging.info("Hour passed!")
    
    events = []

    # in each guild
    for guild in client.guilds:
        # if guild.id == fraeya server id
        
        # for each scheduled event
        for s in guild.scheduled_events:
            
            if (s.creator_id in validEventCreators):
                
                e = {}
                if (s.start_time):
                    e["begin"] = s.start_time.isoformat()
                if (s.end_time):
                    e["end"] = s.end_time.isoformat()
                if (s.description):
                    e["description"] = s.description,
                if (s.location):
                    e["location"] = s.location
                if (s.name):
                    e["name"] = s.name
                if (s.cover_image):
                    e["image"] = s.cover_image.url
                    
                events.append(e)
                
                
    repo = Repo(gitrepo)

    origin = repo.remote('origin')
    origin.fetch()
    
    # 2. Get the remote commit
    remote_commit = repo.commit("origin/main")

    # 3. Read file from that commit tree
    blob = remote_commit.tree / "calendar/streams.json"
    remote_content = blob.data_stream.read().decode("utf-8")

    # 4. Parse JSON
    previousData = json.loads(remote_content)

    logging.info(previousData)
    logging.info(events)
    if (previousData == events):
        logging.info("No change in events.")
    else:               
        with open("calendar/streams.json", "w+") as f:
            f.write(json.dumps(events))
            
        try:
            logging.info("Changes Detected")
            repo = Repo(gitrepo)
            repo.index.add(['calendar/streams.json'])
            repo.index.commit(f"Event Update: {datetime.now().strftime("%d/%m/%Y, %H:%M:%S")}")

            origin.push()
            logging.info("Pushed.")
        except Exception:
            logging.error("Git Failed")
            raise
        

client.run(os.getenv('discordToken'))