import fs from 'fs';
import path from 'path';
import util from 'util';

const logsDirectory = 'log';

if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
}

const appendFileAsync = util.promisify(fs.appendFile);

const loggerMiddleware = async (req, res, next) => {

    const timeZoneOffsetHours = -3;
    const currentDate = new Date();

    currentDate.setHours(currentDate.getHours() + timeZoneOffsetHours);

    const formattedDate = currentDate.toISOString().replace('T', ' ').slice(0, -5) + ` GMT${timeZoneOffsetHours >= 0 ? '+' : ''}${timeZoneOffsetHours}`;

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
        console.error('Error writting register file:', error);
    }

    next();
};

export default loggerMiddleware;
