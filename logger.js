// logger.js

const fs = require('fs');
const path = require('path');

// Define the log file path
const logFilePath = path.join(__dirname, 'test_logs.log');

// Ensure the log file exists or clear previous logs on first run
if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, '', { flag: 'w' }); // Create a new log file
}

const log = (level, message, workerIndex, suiteName, testName) => {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} [${level}] [Worker ${workerIndex}] [Suite: ${suiteName}] [Test: ${testName}] - ${message}\n`;

    // Append the log entry to the log file
    fs.appendFileSync(logFilePath, logEntry, { flag: 'a' }); // Append mode
};

// Utility functions for different log levels
const info = (message, workerIndex, suiteName, testName) => {
    log('INFO', message, workerIndex, suiteName, testName);
};

const error = (message, workerIndex, suiteName, testName) => {
    log('ERROR', message, workerIndex, suiteName, testName);
};

module.exports = { info, error };
