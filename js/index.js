
const images = ["images/FraeyaStaring.png", "images/FraeyaLookingMischevious.png", "images/FraeyaLaugh.png", "images/Fritch.png"]



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

    publishedat = vodJson.data[0].published_at

    console.log(publishedat)
    console.log(Date())
    console.log(Date(publishedat))
    console.log(Date() - Date(publishedat))
}


pullFraeyaVods()
testGithubSecret()