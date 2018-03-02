'use strict';

const YOUR_API_KEY = require('./settings.json').apiKey;
console.log(`Using API key: ${YOUR_API_KEY}`);

const promiseFactory = {
    makePromise: (p) => (new Promise(p)),
    resolve: Promise.resolve.bind(Promise),
    reject: Promise.reject.bind(Promise)
  };

  var chrome = require('chromedriver');

function main() {

    var webdriver = require('selenium-webdriver');

    // Open a Chrome browser.
    var driver = new webdriver.Builder().forBrowser("chrome").build();

    // Initialize the eyes SDK and set your private API key.
    var Eyes = require('eyes.selenium').Eyes;
    var eyes = new Eyes(undefined, undefined, promiseFactory);
    eyes.setApiKey(YOUR_API_KEY);

    try {

        // Start the test and set the browser's viewport size to 800x600.
        eyes.open(driver, 'Hello World!', 'My first Javascript test!',
            {width: 800, height: 600});

        // Navigate the browser to the "hello world!" web-site.
        driver.get('https://applitools.com/helloworld');

        // Visual checkpoint #1.
        eyes.checkWindow('Main Page');

        // Click the "Click me!" button.
        driver.findElement(webdriver.By.tagName('button')).click();

        // Visual checkpoint #2.
        eyes.checkWindow('Click!');

        // End the test.
        eyes.close();

    } finally {

      // Close the browser.
      driver.quit();

      // If the test was aborted before eyes.close was called ends the test as aborted.
      eyes.abortIfNotClosed();

  }

}

main();