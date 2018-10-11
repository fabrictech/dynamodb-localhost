const { start, stop } = require('./index');

const port = 5050;

// just make sure we can spin and shut down a server
start({ port, inMemory: true });
stop(port);

const fgGreen = '\x1b[32m';
const resetColor = '\x1b[0m';
console.info(`${fgGreen}%s${resetColor}`, 'Test passed! You are doing great.');
