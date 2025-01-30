
const images = ["images/FraeyaStaring.png", "images/FraeyaLookingMischevious.png", "images/FraeyaLaugh.png", "images/fritch.jpg"]



function testGithubSecret() {
    document.getElementById("testingVariablePass").textContent = "Just test the content"
}

async function howLongSince() {
    document.getElementById("howLong").textContent = await pullFraeyaVods()
}


function changeImage() {
    document.getElementById("FraeyaImage").src = images[Math.floor(Math.random() * images.length)]
}

async function pullFraeyaVods() {

    let vodJson;
    
    const response = await fetch("./js/newFile.txt")

    vodJson = await response.json()

    publishedat = new Date(vodJson.data[0].published_at)

    todayDate = new Date()

    console.log(todayDate.getTime())
    console.log(publishedat.getTime())

    console.log(todayDate.getTime() - publishedat.getTime())

    console.log(vodJson.data[0].duration)


    console.log(formatDuration(todayDate.getTime() - publishedat.getTime() - convertDuration(vodJson.data[0].duration)))

    return(formatDuration(todayDate.getTime() - publishedat.getTime() - convertDuration(vodJson.data[0].duration)))

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


pullFraeyaVods()
testGithubSecret()
howLongSince()