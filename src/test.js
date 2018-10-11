const { start, stop } = require('./index');

const port = 5050;

// just make sure we can spin and shut down a server
start({ port, inMemory: true });
stop(port);
