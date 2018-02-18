const winston = require('winston');
const fs = require('fs');

// Datetime
const date = new Date();

// Init Logging
const logDir = '../logs'; // Move to config later

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

const Logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
        timestamp: tsFormat,
        colorize: true,
        level: 'info'
    }),
    new (winston.transports.File)({
        filename: `${logDir}/bot_output_${date.getMonth()}_${date.getDay()}_${date.getFullYear()}.log`,
        timestamp: tsFormat,
        level: 'debug'
    })
  ]
});

module.exports = Logger;