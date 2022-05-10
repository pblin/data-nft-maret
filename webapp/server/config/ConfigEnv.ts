import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();
let configPath;

switch (process.env.NODE_ENV) {
    case 'test':
        configPath = path.join(__dirname, '.env.test');
        break;
    case 'development':
        configPath = path.join(__dirname, '.env.dev');
        break;
    case 'production':
        configPath = path.join(__dirname, '.env.production');
        break;
    default:
        configPath = path.join(__dirname, '.env');
}
dotenv.config({ path: configPath });

export const SSL_KEY = process.env.SSL_KEY;
export const SSL_PEM = process.env.SSL_PEM;
export const SSL_PFX = process.env.SSL_PFX;
export const KEY_PASS = process.env.KEY_PASS;
export const HTTPS_ON = process.env.HTTPS_ON || 'NO';
export const HTTP_API_URL = process.env.HTTP_API_URL;
export const HTTPS_API_URL = process.env.HTTPS_API_URL;
export const PORT = process.env.PORT || 3000;

console.info("HTTPS=" + HTTPS_ON);
console.info("HTTPS=" + HTTPS_API_URL);
console.info("KEY=" + SSL_KEY);
console.info("KEY=" + SSL_PEM);
console.info("PEM=" + SSL_PFX);



