#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../index.js';
import debug from 'debug';
import * as http from "http";
const debugSetter = debug('starwar-movies:server');

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '8040';
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);



/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
    const address = server.address();
    const bind = typeof address === 'string'
        ? 'pipe ' + address
        : 'port ' + address.port;
    debugSetter('Listening on ' + bind);
}


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
