
const images = ["images/FraeyaStaring.png", "images/FraeyaLookingMischevious.png"]



function testGithubSecret() {
    document.getElementById("testingVariablePass").textContent = "Just test the content"
}


function changeImage() {
    document.getElementById("FraeyaImage").src = images[Math.floor(Math.random() * images.length)]
}


function pullFraeyaVods() {
    let vodJson = {}
    fetch("./js/newFile.txt")
        .then((response) => response.text())
        .then((text) =>  {
            vodJson = JSON.parse(text)
        })
        .catch((e) => console.error(e))

    console.log(vodJson)
    console.log(vodJson.data)
    console.log(vodJson.data[0])
}


pullFraeyaVods()
testGithubSecret()