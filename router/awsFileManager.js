import express from 'express';
import upload from '../middlewares/multer.js';
import { getImageController, getImagesController, uploadImagesController, deleteImageController, getImagesPresignedURLController } from '../helpers/awsFileManager.js';

const router = express.Router();

router.get('/', getImagesController);
router.get('/url',getImagesPresignedURLController);
router.get('/url/:id', getImageController);
router.post('/', upload.array('images', 10), uploadImagesController);
router.delete('/:id', deleteImageController);

export default router;
