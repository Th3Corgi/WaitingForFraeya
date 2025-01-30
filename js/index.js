
const images = ["images/FraeyaStaring.png", "images/FraeyaLookingMischevious.png", "images/FraeyaLaugh.png", "images/Fritch.png"]



function testGithubSecret() {
    document.getElementById("testingVariablePass").textContent = "Just test the content"
}


function changeImage() {
    document.getElementById("FraeyaImage").src = images[Math.floor(Math.random() * images.length)]
}

const vodJson = await pullFraeyaVods()

function pullFraeyaVods() {
    
    fetch("./js/newFile.txt")
        .then((response) => response.text())
        .then((text) =>  {
            return JSON.parse(text)
        })
        .catch((e) => console.error(e))

    console.log(vodJson)
    console.log(vodJson.data)
    console.log(vodJson.data[0])
}


pullFraeyaVods()
testGithubSecret()