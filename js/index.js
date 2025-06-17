
const images = ["images/FraeyaStaring.png", "images/FraeyaLookingMischevious.png", "images/FraeyaLaugh.png", "images/fritch.jpg", "images/awfawfawef.png",
                "images/cutie.jpg", "images/dreamy.jpg", "images/evil.png", "images/FraeyaPuppy.png", "images/grabbing.png", "images/sgwearfgsg.png",
                "images/spooked.png", "images/stare.png", "images/witch.png", "images/disapprove.png", "images/sexglasses.png", "images/lewdPull.png"]

const bgs = ["bg/19-1024x576.png", "bg/20-1024x576.png"]

let previousImage = [-1,-1,-1]

let previousAudio = [-1,-1,-1]

let playingAudio = false

let fraeyaSound;

// This function checks the stream schedules to see if Fraeya is currently live
// Returns - Boolean
async function isFraeyaLive() {

    let schedule = await scheduleToTime(pullFraeyaSchedule())

    for (stream of schedule) {

        scheduledDuration = stream.end - stream.start

        timeSinceStart = new Date().getTime() - stream.start

        // If the stream is in the future, not live
        if (timeSinceStart < 0) {
            continue
        }
        // If the scheduled duration + 5 minutes is over, the stream is in the past
        // Probably want to include a check here to see if maybe shes going over time
        if (timeSinceStart > scheduledDuration + 300000) {
            continue
        }
        return true
    }
    return false
}

// This function uses the Fraeya schedule to check when the next stream is!
//
async function whenNextStream() {

    let nextStream;
    let live = await isFraeyaLive()

    // If we are live, we don't care!
    if (!live) {

        let schedule = await scheduleToTime(pullFraeyaSchedule())

        for (stream of schedule) {

            scheduledDuration = stream.end - stream.start

            timeSinceStart = new Date().getTime() - stream.start

            // If the stream is in the future, its soon
            if (timeSinceStart < 0) {
                // Find the closest stream on the schedule
                if (nextStream == undefined || stream.start < nextStream.start) {
                    nextStream = stream
                }
            }
        }

        currentTime = new Date()

        if (nextStream == undefined) {
            document.getElementById("headerBanner").innerHTML = `<text style="font-size:2rem">Next Fraeya Stream: Unknown!</text>`
        } else {
            document.getElementById("headerBanner").innerHTML = `<text style="font-size:2rem">Next Fraeya Stream: ${formatDuration(nextStream.start - currentTime.getTime())}</text><br><text style="font-size:1rem"> ${nextStream.description}</text>`
        }
    } else {
        try {
            // Delete the header if we are live
            document.getElementById("header").outerHTML = ""
        } catch {
            // You already deleted it silly goose
        }
    }

}

// This function uses the list of fraeya vods to determine the amount of time the stream has been offline for.
// Param - JSON Promise
async function howLongSince(vodJsonPromise) {

    let live = await isFraeyaLive()

    vodJson = await vodJsonPromise

    streamStarted = new Date(vodJson.data[0].published_at)

    currentTime = new Date()

    streamDuration = convertDuration(vodJson.data[0].duration)

    if (streamDuration == undefined) {
        streamDuration = convertDuration(vodJson.data[1].duration)
    }

    timeInMills = (currentTime.getTime() - streamStarted.getTime() - streamDuration)

    // Check if Fraeya is live using a calendar setup
    if (live) {
        document.getElementById("howLong").textContent = "Fraeya is live!!"
    } else {
        document.getElementById("howLong").textContent = `We have spent ${formatDuration(timeInMills)} missing Fraeya.`
    }

    
}

// This function changes the image of fraeya to a new random image that is different than the previous one
//
function changeImage() {
    
    newRandom = -1
    while (previousImage.includes(newRandom) || newRandom == -1) {
        newRandom = Math.floor(Math.random() * images.length)
    }
    // FIFO images to maintain unique up to 3
    previousImage.shift()
    previousImage.push(newRandom)

    document.getElementById("FraeyaImage").src = images[newRandom]
}

// This function pulls the json from the TwitchVods.txt
// Returns - JSON Promise
async function pullFraeyaVods() {
    
    const response = await fetch("./TwitchVods.txt")

    return response.json()
}

// This function pulls the json from the streams.json
// Returns - JSON Promise
async function pullFraeyaSchedule() {
    const response = await fetch("./calendar/streams.json")

    return response.json()
}

// This function creates a json object of the stream schedules in a usable format
// Returns - JSON Promise of a list of json objects
async function scheduleToTime(JsonPromise) {
    
    let schedulejson = await JsonPromise
    let schedule = []

    for (stream of schedulejson) {

        schedule.push({ "start": new Date(stream.begin).getTime(),
                        "end": new Date(stream.end).getTime(),
                        "description": stream.description
                    })
    }

    return schedule

}

// This function creates a javascript promise for playing audio
// Params - A HTML Audio object
// Returns - A promise to be resolved when the audio has finished playing
function playAudio(audio) {
    return new Promise(result => {
        audio.play()
        audio.onended = result
    })
}

// This function plays a random fraeya sound (not the previous) and verifies that only one audio is running at a time
//
async function playFraeyaSound() {

    if (!playingAudio) {

        let audios = await pullFraeyaAudios()

        playingAudio = true
        document.getElementById("SoundButton").style.opacity = .6

        newRandom = -1
        while (previousAudio.includes(newRandom) || newRandom == -1) {
            newRandom = Math.floor(Math.random() * audios.length)
        }

        // FIFO audios to maintain unique up to 3
        previousAudio.shift()
        previousAudio.push(newRandom)

        let fraeyaSound = new Audio("./audio/" + audios[newRandom])

        await playAudio(fraeyaSound)

        fraeyaSound.currentTime = 0
        playingAudio = false

        document.getElementById("SoundButton").style.opacity = 1

    }
}

// This function pulls the json from the audioList.json
// Returns - JSON Promise
async function pullFraeyaAudios() {
    const response = await fetch("./audio/audioList.json")

    return response.json()
    
}

// This function converts *h*m*s string into miliseconds
// Param - String of form *h*m*s
// Returns - Int of milliseconds
function convertDuration(string) {

    // DO NOT DO WHATEVER THIS IS, ITS HORRENDOUS
    let timeArray = string.split(/[a-z]/)

    if (timeArray.length == 4) {
        return (timeArray[0] * 3600000) + (timeArray[1] * 60000) + (timeArray[3] * 1000)
    } else if (timeArray.length == 3) {
        return((timeArray[0] * 60000) + (timeArray[1] * 1000))
    }
    
    
}

// This function converts miliseconds into a readable string.
// Param - Int
// Returns - String
function formatDuration(elapsedMilliseconds) {
    const seconds = Math.floor(elapsedMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days != 1) {daysText = "days"} else {daysText = "day"}

    if (hours != 1) {hoursText = "hours"} else {hoursText = "hour"}

    if (minutes != 1) {minutesText = "minutes"} else {minutesText = "minute"}

    if (seconds != 1) {secondsText = "seconds"} else {secondsText = "second"}

    if (days == 0) {
        if (hours == 0) {
            if (minutes == 0) {
                return `${seconds % 60} ${secondsText}`;
            }
            return `${minutes % 60} ${minutesText}, and ${seconds % 60} ${secondsText}`;
        }
        return `${hours % 24} ${hoursText}, ${minutes % 60} ${minutesText}, and ${seconds % 60} ${secondsText}`;
    }
    return `${days} ${daysText}, ${hours % 24} ${hoursText}, ${minutes % 60} ${minutesText}, and ${seconds % 60} ${secondsText}`;
}

// This function changes the background!
//
function changeBackground() {
    newRandom = Math.floor(Math.random() * bgs.length)

    document.body.style.backgroundImage = `url(${bgs[newRandom]})`

}

// Run the scripts on the start of the page
isFraeyaLive()
whenNextStream()
pullFraeyaAudios()
changeImage()
changeBackground()
howLongSince(pullFraeyaVods())


// Set interval to update every second
setInterval(howLongSince, 1000, pullFraeyaVods())
setInterval(whenNextStream, 1000)