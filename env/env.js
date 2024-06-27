import dotenv from 'dotenv';
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
dotenv.config({silent: true, path: `./env/.env.${process.env.NODE_ENV}`});
