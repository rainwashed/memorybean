const path = require("path");
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

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

(async function () {
    await driver.get("https://membean.com");
    await driver.quit();
})();
