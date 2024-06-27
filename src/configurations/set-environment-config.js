import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

import { AppError } from '../utilities/index.js';

// Export a function that performs configuration validation
export const setEnvironmentConfig = () => {
    // Get the directory name
    const __dirname = dirname(fileURLToPath(import.meta.url));

    const environmentDirectory = join(__dirname, '../../env');
    const environmentFilesToCheck = ['production', 'development', 'test'];
    let envFileFound = false;

    // Check if the env directory exists and has the required config files.
    if (existsSync(environmentDirectory)) {
        // Check if any of the config files are present within the directory.
        for (const env of environmentFilesToCheck) {
            const filePath = join(environmentDirectory, `.env.${env}`);
            if (existsSync(filePath)) {
                dotenv.config({ path: filePath });
                envFileFound = true;
                break;
            }
        }

        if (!envFileFound) {
            throw new AppError(`None of the specified .env files (${environmentFilesToCheck.join(', ')}) are present in the env directory.`, '7005', false);
        }

        // Check for essential configurations
        const requiredEnvVars = ['PORT', 'NODE_ENV', 'BASE_URL', 'JWT_PRIVATE_KEY', 'DB_USERNAME', 'DB_PASSWORD', 'DB_CLUSTER', 'DB_CLUSTERID', 'DB_COLLECTION', 'MAILER_EMAIL', 'MAILER_PASSWORD'];
        const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

        if (missingVars.length > 0) {
            throw new AppError(`CONFIG_ERROR: Missing required environment variables: ${missingVars.join(', ')}.`, '7002', false);
        }
    } else {
        throw new AppError('Config directory does not exist in app\'s root. Please create one.', '7004', false);
    }
};
