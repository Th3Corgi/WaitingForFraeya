const vodsJson = await pullFraeyaVods()
//const images = ["images/FraeyaStaring.png", "images/FraeyaLookingMischevious.png", "images/FraeyaLaugh.png", "images/fritch.jpg"]

const images = ["images/FraeyaStaring.png", "images/FraeyaLookingMischevious.png", "images/FraeyaLaugh.png"]

function testGithubSecret() {
    document.getElementById("testingVariablePass").textContent = "Just test the content"
}

async function howLongSince(vodJson) {

    streamStarted = new Date(vodJson.data[0].published_at)

    currentTime = new Date()

    streamDuration = convertDuration(vodJson.data[0].duration)

    timeInMills = (currentTime.getTime() - streamStarted.getTime() - streamDuration)

    // If the time since the stream updated and now is less than 15 minutes, she is most likely still live (find a better way to check this)
    if (timeInMills < 900000) {
        document.getElementById("howLong").textContent = "Fraeya is live!!"
    } else {
        document.getElementById("howLong").textContent = `We have spent ${formatDuration(timeInMills)} missing Fraeya.`
    }

    
}



function changeImage() {
    document.getElementById("FraeyaImage").src = images[Math.floor(Math.random() * images.length)]
}

async function pullFraeyaVods() {
    
    const response = await fetch("./js/newFile.txt")

    return response.json()

}

function convertDuration(string) {

    // DO NOT DO WHATEVER THIS IS, ITS HORRENDOUS
    let timeArray = string.split(/[a-z]/)

    if (timeArray.length == 4) {
        return (timeArray[0] * 3600000) + (timeArray[1] * 60000) + (timeArray[3] * 1000)
    } else if (timeArray.length == 3) {
        return((timeArray[0] * 60000) + (timeArray[1] * 1000))
    }
    
    
}

function formatDuration(elapsedMilliseconds) {
    const seconds = Math.floor(elapsedMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    return `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;
}

// Run the script on the start of the page
howLongSince(vodsJson)

// Set interval to update every second
setInterval(howLongSince, 1000, vodsJson)