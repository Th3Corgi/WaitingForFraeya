
const images = ["images/FraeyaStaring.png", "images/FraeyaLookingMischevious.png"]



function testGithubSecret() {
    document.getElementById("testingVariablePass").textContent = "Just test the content"

    fetch("./js/newFile.txt")
        .then((response) => response.text())
        .then((text) =>  {
            console.log(text)
        })
        .catch((e) => console.error(e))
}


function changeImage() {
    console.log("Hello")
    document.getElementById("FraeyaImage").src = images[Math.floor(Math.random() * images.length)]
    
}

testGithubSecret()