# Memorybean
### A custom, free, and open-source client for [Membean](https://membean.com)

---

## How It Works?
Memorybean inherently uses Membean for all of its functionality. It uses an automated browser ([Selenium](https://www.selenium.dev/)) to handle all of its functions such as user login, user choice selection, etc. All of the data from the automated browser is passed over to the actual client (view) using an [Express.js](https://expressjs.com/) server that has RESTFUL api endpoints for both the control of the automated browser and data retrieval.