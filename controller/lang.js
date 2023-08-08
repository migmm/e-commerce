import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { LANGUAGE_CONFIG } from '../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_LANG = LANGUAGE_CONFIG.DEFAULT_LANGUAGE;

const getAvailableLanguages = () => {
    const languages = [];
    const directoryPath = `${__dirname}/../languages`;
    console.log("entro aca")
    try {
        const files = fs.readdirSync(directoryPath);
        files.forEach(file => {
            if (file.startsWith('lang_') && file.endsWith('.json')) {
                const language = file.substring(5, file.length - 5);
                languages.push(language);
            }
        });
    } catch (err) {
        console.error('Error reading directory:', err);
    }

    return languages;
};

const availableLanguages = (req, res) => {
    const languages = getAvailableLanguages();
    res.json(languages);
}

const changeLanguage = (req, res) => {
    let language = req.params.language;

    if (!language) {
        const acceptLanguage = req.headers['accept-language'];
        if (acceptLanguage) {
            const languages = acceptLanguage.split(',');
            language = languages[0];
        } else {
            language = DEFAULT_LANG;
        }
    }

    const filePath = `${__dirname}/../languages/lang_${language}.json`;
    if (!fs.existsSync(filePath)) {
        language = DEFAULT_LANG;
    }

    const defaultFilePath = `${__dirname}/../languages/lang_${language}.json`;
    fs.readFile(defaultFilePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        const languageData = JSON.parse(data);
        res.json(languageData);
    });
};

export { changeLanguage, availableLanguages };
