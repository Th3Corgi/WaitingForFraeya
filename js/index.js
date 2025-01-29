function testGithubSecret() {
    document.getElementById("testingVariablePass").textContent = "Just test the content"

    fetch("./js/newFile.txt")
        .then((response) => response.text())
        .then((text) =>  {
            console.log(text)
        })
        .catch((e) => console.error(e))
}

testGithubSecret()