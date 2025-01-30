
const images = ["images/FraeyaStaring.png", "images/FraeyaLookingMischevious.png", "images/FraeyaLaugh.png", "images/ritch.png"]



function testGithubSecret() {
    document.getElementById("testingVariablePass").textContent = "Just test the content"
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

    console.log(msToTime(todayDate.getTime() - publishedat.getTime()))

}

function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }


pullFraeyaVods()
testGithubSecret()