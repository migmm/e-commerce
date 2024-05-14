import { TIME_ZONE } from '../config.js';

const formatDateTime = () => {
    const timeZoneOffsetHours = TIME_ZONE; 
    const currentDate = new Date();
    const adjustedDate = new Date(currentDate.getTime() + timeZoneOffsetHours * 60 * 60 * 1000);
    return adjustedDate.toISOString().replace('T', ' ').slice(0, -5) + ` GMT${timeZoneOffsetHours >= 0 ? '+' : ''}${timeZoneOffsetHours}`;
};

export default formatDateTime;
