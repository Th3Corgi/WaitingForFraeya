
const images = ["images/FraeyaStaring.png", "images/FraeyaLookingMischevious.png", "images/FraeyaLaugh.png", "images/fritch.jpg"]

const audios = ["audio/yippee.mp3", "audio/FraeyaBwomp.mp3"]

let previousImage = -1

let previousAudio = -1

let playingAudio = false

let fraeyaSound;

// This function uses the list of fraeya vods to determine the amount of time the stream has been offline for.
// Param - JSON Promise
async function howLongSince(vodJsonPromise) {

    vodJson = await vodJsonPromise

    streamStarted = new Date(vodJson.data[0].published_at)

    currentTime = new Date()

    streamDuration = convertDuration(vodJson.data[0].duration)

    timeInMills = (currentTime.getTime() - streamStarted.getTime() - streamDuration)

    // Update checking every 15 minutes in schedule, so on the next update, if more than 15 minutes have passed, the stream must be offline. I still hate this way of doing things...
    if (timeInMills < 900500) {
        document.getElementById("howLong").textContent = "Fraeya is live!!"
    } else {
        document.getElementById("howLong").textContent = `We have spent ${formatDuration(timeInMills)} missing Fraeya.`
    }

    
}

// This function changes the image of fraeya to a new random image that is different than the previous one
function changeImage() {
    
    newRandom = -1
    while (newRandom == previousImage || newRandom == -1) {
        newRandom = Math.floor(Math.random() * images.length)
    }
    previousImage = newRandom

    document.getElementById("FraeyaImage").src = images[newRandom]
}

// This function pulls the json from the newFile.txt
// Returns - JSON Promise
async function pullFraeyaVods() {
    
    const response = await fetch("./js/newFile.txt")

    return response.json()

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

        playingAudio = true
        document.getElementById("SoundButton").style.opacity = .6

        newRandom = -1
        while (newRandom == previousAudio || newRandom == -1) {
            newRandom = Math.floor(Math.random() * audios.length)
        }

        previousAudio = newRandom

        let fraeyaSound = new Audio(audios[newRandom])

        await playAudio(fraeyaSound)

        fraeyaSound.currentTime = 0
        playingAudio = false

        document.getElementById("SoundButton").style.opacity = 1

    }
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
  
    return `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;
}

// Run the script on the start of the page
howLongSince(pullFraeyaVods())

// Set interval to update every second
setInterval(howLongSince, 1000, pullFraeyaVods())