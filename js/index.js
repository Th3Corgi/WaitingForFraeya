function testGithubSecret() {
    document.getElementById("testingVariablePass").textContent = "Just test the content"

    fetch("newFile.txt")
        .then((response) => response.text())
        .then((text) =>  {
            console.log(text)
        })
        .catch((e) => console.error(e))
}