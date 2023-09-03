import Jimp from 'jimp';
import { IMAGE_RESIZE_PARAMETERS } from '../config.js';


function resizeImagesMiddleware(req, res, next) {

    if (!req.files || req.files.length === 0) {
        return next();
    }

    const promises = req.files.map((file) => {
        return Jimp.read(file.buffer)
            .then((image) => {

                if (image.bitmap.width > IMAGE_RESIZE_PARAMETERS.maxWidth || image.bitmap.height > IMAGE_RESIZE_PARAMETERS.maxHeight) {

                    image.scaleToFit(IMAGE_RESIZE_PARAMETERS.maxWidth, IMAGE_RESIZE_PARAMETERS.maxHeight);
                    image.quality(IMAGE_RESIZE_PARAMETERS.imageQuality); 

                    return image.getBufferAsync(Jimp.MIME_JPEG);
                } else {
                    return file.buffer;
                }
            })

            .then((buffer) => {
                file.buffer = buffer;
                return file;
            });
    });

    Promise.all(promises)
        .then((resizedFiles) => {
            req.files = resizedFiles;
            next();
        })
        
        .catch((err) => {
            next(err);
        });
}


export default resizeImagesMiddleware;
