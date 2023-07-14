import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const changeLanguage = (req, res) => {
    let language = req.params.language;

    if (!language) {
        const acceptLanguage = req.headers['accept-language'];
        if (acceptLanguage) {
            const languages = acceptLanguage.split(',');
            language = languages[0];
        } else {
            language = 'en';
        }
    }

    const filePath = `${__dirname}/../languages/lang_${language}.json`;
    if (!fs.existsSync(filePath) || language === 'fr') {
        language = 'en';
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

export { changeLanguage };
