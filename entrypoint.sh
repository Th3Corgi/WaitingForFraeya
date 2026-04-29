#!/bin/bash
set -e

# Ensure required env vars exist
if [ -z "$GIT_USERNAME" ] || [ -z "$GIT_PAT" ]; then
  echo "Missing GIT_USERNAME or GIT_PAT"
  exit 1
fi

# Configure git globally inside container
git config --global user.name "$GIT_USERNAME"

# Use credential helper (stores credentials in memory file inside container)
git config --global credential.helper store

# Write credentials into git credential store
# WARNING: this is stored inside container filesystem (ephemeral if container is ephemeral)
echo "https://${GIT_USERNAME}:${GIT_PAT}@github.com" > ~/.git-credentials

echo "Git configured successfully"

# Run your application
exec python bot.py