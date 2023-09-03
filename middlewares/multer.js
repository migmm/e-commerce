import multer from 'multer';


const storage = multer.memoryStorage();

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const fileFilter = (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
        const error = new Error('Error in file format. Only allowed JPEG, PNG, and GIF.');
        cb(error);
    } else {
        cb(null, true);
    }
};

const limits = {
    fileSize: 2 * 1024 * 1024, // 2MB
};

const upload = multer({
    storage,
    fileFilter,
    limits,
});

const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size exceeds the limit (2MB)' });
        }
        return res.status(400).json({ error: err.message });
    } else if (err) {
        return res.status(400).json({ error: err.message });
    }
    next();
};


export { upload as default, handleMulterError };

