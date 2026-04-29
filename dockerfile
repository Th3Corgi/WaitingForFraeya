FROM python:3.12-slim

# Set working directory
WORKDIR /app

# install git
RUN apt-get update && apt-get install -y git

# Copy files
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run your bot
CMD ["python", "bot.py"]