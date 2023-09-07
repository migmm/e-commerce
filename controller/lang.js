import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { LANGUAGE_CONFIG } from '../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const langDirectory = path.join(__dirname, '../languages');

const DEFAULT_LANG = LANGUAGE_CONFIG.DEFAULT_LANGUAGE;


const changeLanguage = async (req, res) => {
    let language = req.params.language;

    const filePath = `${__dirname}/../languages/lang_${language}.json`;

    if (!fs.existsSync(filePath)) {
        language = DEFAULT_LANG;
    }

    if (!language) {
        const acceptLanguage = req.headers['accept-language'];
        if (acceptLanguage) {
            const languages = acceptLanguage.split(',');
            language = languages[0];
        } else {
            language = DEFAULT_LANG;
        }
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        const languageData = JSON.parse(data);
        res.json(languageData);
    });
};

async function getLanguageInfo(req, res = null) {
    const availableLangs = [];
    const availableLangsWithName = {};

    try {
        const langFiles = fs.readdirSync(langDirectory);

        langFiles.forEach(fileName => {
            const langCode = fileName.replace(/^lang_(.+)\.json$/, '$1');
            const langData = loadLanguageFile(langCode);
            if (langData) {
                availableLangs.push(langCode);
                availableLangsWithName[langCode] = langData['language'];
            }
        });

        const languageInfo = {
            availableLangs,
            availableLangsWithName,
        };

        if (res) {
            res.json(languageInfo);
        } else {
            return languageInfo;
        }
    }

    catch (error) {
        console.error(`Error obtaining language files: ${error}`);
        if (res) {
            res.status(500).json({ error: 'Error obtaining language files.' });
        } else {
            throw new Error('Error obtaining language files.');
        }
    }
}

function loadLanguageFile(langCode) {
    const filePath = path.join(langDirectory, `lang_${langCode}.json`);
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading file ${filePath}: ${error}`);
        return null;
    }
}

export {
    changeLanguage,
    getLanguageInfo
};
