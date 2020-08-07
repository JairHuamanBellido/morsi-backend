import * as dotenv from 'dotenv';
dotenv.config();
export const jwtKey = {
    secret: process.env.KEY_JWT,
};
