const { info, error } = require('./logger'); // Import logger functions


const fs = require('fs');
const path = require('path');

const credentialPool = [
    { username: 'automation1@maildrop.cc', password: 'Password1' },
    { username: 'automation2@maildrop.cc', password: 'Password1' },
    { username: 'automation3@maildrop.cc', password: 'Password1' },
    { username: 'mahendraibmautobuyer@maildrop.cc', password: 'Password1' },
];

const usedCredentials = new Set();
let lock = Promise.resolve();

// Mutex to ensure that credentials are picked one at a time
async function acquireCredential(workerIndex) {
    let resolveLock;
    const lockPromise = new Promise(resolve => {
        resolveLock = resolve;
    });

    // Await for the lock to avoid race conditions
    await lock;
    lock = lockPromise;

    const availableCredentials = credentialPool.filter(
        (credential) => !usedCredentials.has(credential.username)
    );

    if (availableCredentials.length === 0) {
        lock = Promise.resolve(); // Reset the lock when all credentials are used
        const errorMessage = 'All credentials have been used and no more credential in the pool now';
        error(errorMessage, workerIndex, 'Credential Management', '');
        throw new Error('All credentials have been used and no more credential in the pool now');
    }

    const credentialIndex = workerIndex % availableCredentials.length;
    const credential = availableCredentials[credentialIndex];
    usedCredentials.add(credential.username);

    logWorker(workerIndex, `Worker ${workerIndex} acquired credential: ${credential.username}`);
    logWorker(workerIndex, `Current active workers: ${usedCredentials.size}`);
    // Log credential acquisition
    info(`Worker ${workerIndex} acquired credential: ${credential.username}`, workerIndex, 'Credential Management', '');
    info(`Current active workers: ${usedCredentials.size}/${credentialPool.length}`, workerIndex, 'Credential Management', '');

    resolveLock(); // Release the lock for the next worker
    return credential;
}

function resetCredentials() {
    usedCredentials.clear();
    logGlobal('Resetting all credentials.');
    info('Resetting all credentials.', 0, 'Credential Management', '');

}

function releaseCredential(username, workerIndex) {
    usedCredentials.delete(username);
    info(`Released credential: ${username}`, workerIndex, 'Credential Management', '');
    info(`Current active workers: ${usedCredentials.size}/${credentialPool.length}`, workerIndex, 'Credential Management', '');

    logWorker(workerIndex, `Released credential: ${username}`);
    logWorker(workerIndex, `Current active workers: ${usedCredentials.size}`);
}

// Logging function per worker
function logWorker(workerIndex, message) {
    const logFilePath = path.join(__dirname, `worker-${workerIndex}.log`);
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFilePath, `${timestamp} - ${message}\n`);
}

// Global logging function (for shared messages)
function logGlobal(message) {
    const globalLogFilePath = path.join(__dirname, 'global.log');
    const timestamp = new Date().toISOString();
    fs.appendFileSync(globalLogFilePath, `${timestamp} - ${message}\n`);
}

module.exports = { acquireCredential, resetCredentials, releaseCredential };
