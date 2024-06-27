import express from 'express';
import './env/env.js';

import { setEnvironmentConfig, logger, connect2DB } from './src/configurations/index.js';
import { useMiddlewares } from './src/middlewares/index.js';
import routes from './src/routes/index.js';

// Load environment variables

const main = () => {
    setEnvironmentConfig(); // Validate environment configurations

    const app = express();
    useMiddlewares(app); // Use many built-in middlewares
    routes(app); // Add routes
    connect2DB(); // Connect to the database

    // Start the server for listening on a port and export it for testing purposes.
    const port = process.env.PORT || 3030; // Default to 3030 if PORT is not set
    const environment = process.env.NODE_ENV || 'development'; // Default to 'development' if NODE_ENV is not set
    const server = app.listen(port, () => {
        logger.info(`App server is listening on port: ${port} for ${environment}`);
    });

    return server; // Export the server for testing purposes
};

main();

export default main;
