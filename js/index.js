function testGithubSecret() {
    document.getElementById("testingVariablePass").textContent = process.env.PASSED_DATA;
    console.log(process.env.PASSED_DATA)
}