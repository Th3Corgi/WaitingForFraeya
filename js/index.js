
const images = ["images/FraeyaStaring.png", "images/FraeyaLookingMischevious.png", "images/FraeyaLaugh.png", "images/fritch.jpg"]



function testGithubSecret() {
    document.getElementById("testingVariablePass").textContent = "Just test the content"
}

async function howLongSince(vodJson) {

    streamStarted = new Date(vodJson.data[0].published_at)

    currentTime = new Date()

    streamDuration = convertDuration(vodJson.data[0].duration)

    timeInMills = (currentTime.getTime() - publishedat.getTime() - convertDuration(vodJson.data[0].duration))

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

    let vodJson;
    
    const response = await fetch("./js/newFile.txt")

    vodJson = await response.json()

    return vodJson

}

function convertDuration(string) {
    let hours = string.split("h")[0]
    let minutes = string.split("m")[0].split("h")[1]
    let seconds = string.split("m")[1].split("s")[0]
    
    return (hours * 3600000) + (minutes * 60000) + (seconds * 1000)
}

function formatDuration(elapsedMilliseconds) {
    const seconds = Math.floor(elapsedMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    return `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;
}

setInterval(howLongSince, 1000, pullFraeyaVods())