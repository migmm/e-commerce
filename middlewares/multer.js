/* 
import multer from 'multer';
import {PRODUCT_IMG_UPLOAD_LOCATION} from '../config.js';

const storageLocation = PRODUCT_IMG_UPLOAD_LOCATION.STORAGE_LOCATION;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const error = null;
        cb(error, storageLocation);
    },
    filename: function (req, file, cb) {
        const error = null;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(error, `${uniqueSuffix}-${file.originalname.toLowerCase().replaceAll(' ', '-')}`);
    }
});

const fileFilter = (req, file, cb) => {
    const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    const mimeTypeIsOk = validMimeTypes.includes(file.mimetype);
    cb(null, mimeTypeIsOk);
};

const upload = multer({ storage, fileFilter });

const fieldConfig = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 3 }])

export default {
    fieldConfig,
};
 */

import multer from 'multer';

// Multer configuration to store in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
