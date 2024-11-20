module.exports = function(config) {
  process.env.CHROME_BIN = require('puppeteer').executablePath();
  config.set({
    browsers: ['ChromeHeadless'],
    basePath: '../..',
    frameworks: ['jasmine'],
    //...
  });
};
