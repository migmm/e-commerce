import fs from 'fs';
import path from 'path';
import util from 'util';
import formatDateTime from '../helpers/dateUtils.js';
import { LOGS_DIRECTORY } from '../config.js';

const logsDirectory = LOGS_DIRECTORY;

if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
}

const appendFileAsync = util.promisify(fs.appendFile);

const loggerMiddleware = async (req, res, next) => {

    const formattedDate = formatDateTime();

    let logMessage = `${formattedDate} - Request received: ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`;

    const ip = req.ip;

    logMessage += ` - IP: ${ip}`;

    if (req.query.from) {
        logMessage += ` (from: ${req.query.from})`;
    }

    try {
        console.log(logMessage);
        await appendFileAsync(path.join(logsDirectory, 'access.log'), logMessage + '\n');
    } catch (error) {
        console.error('Error writing register file:', error);
    }

    next();
};

export default loggerMiddleware;
