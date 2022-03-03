const path = require("path");
const readline = require("readline");
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const loginInfo = {
    email: "li1201@dcds.edu",
};
const service = new chrome.ServiceBuilder(
    path.join(__dirname, "../", "chromedriver")
);

const browserOptions = new chrome.Options();
const driver = new Builder()
    .forBrowser("chrome")
    .setChromeService(service)
    .setChromeOptions(browserOptions)
    .build();

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function prompt(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((res) =>
        rl.question(query, (ans) => {
            rl.close();
            res(ans);
        })
    );
}

(async function () {
    await driver.get("https://membean.com");
    await driver
        .findElement(By.xpath("/html/body/header/nav/div[2]/ul[2]/li[2]/a"))
        .click();
    await driver
        .findElement(By.xpath("/html/body/div/div[2]/div/main/section/ul/li/a"))
        .click();
    await driver
        .findElement(
            By.xpath(
                "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div/div[1]/div/div[1]/input"
            )
        )
        .sendKeys(loginInfo.email);
    await driver
        .findElement(
            By.xpath(
                "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[2]/div/div[1]/div/div/button"
            )
        )
        .click();
    console.log(
        "Please enter your password in the browser window. Press enter when you are done."
    );
    await prompt("");
    console.clear();
    const user = await driver
        .findElement(By.className("student-name-header"))
        .getText();
    console.log(`Welcome to the service, ${user}.`);
    await driver.findElement(By.id("startTrainingBtn")).click();

    // selecting time
    const possibleTimes = await driver
        .findElement(
            By.xpath("/html/body/div[1]/div[2]/div[2]/div/div/div[1]/ul")
        )
        .findElements(By.css("li"));

    for (const [index, time] of possibleTimes.entries()) {
        const text = await time
            .findElement(By.css("form"))
            .getAttribute("name");
        console.log(`[${index}] - ${text}`);
    }
    console.log("Select a time...");
    const timeSelection = await prompt("");
    possibleTimes[parseInt(timeSelection.toString().trim())].click();
    await prompt("Exit the browser.");
    await driver.quit();
})();
