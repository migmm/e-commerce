import { v4 as uuidv4 } from 'uuid';
import { GetObjectCommand, ListObjectsCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl as getPresignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, AWS_BUCKET_NAME } from '../config.js';


// Function to get the signed URL
const getSignedUrl = async fileName => {

    const bucketParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
    };

    try {
        const url = await getPresignedUrl(s3Client, new GetObjectCommand(bucketParams), { expiresIn: 15 * 60 });
        return url;
    } catch (err) {
        console.log('Error', err);
        throw err;
    }
};

// Controller to get an image by ID
const getImage = async (req, res) => {
    const { id } = req.params;

    try {
        const url = await getSignedUrl(id);
        console.log('URL:', url);
        res.status(200).json({ url });
    } catch (error) {
        console.error('Error retrieving the image:', error);
        res.status(500).json({ error: 'Error retrieving the image' });
    }
};

// Controller to get all images
const getImages = async (req, res) => {
    const listParams = {
        Bucket: AWS_BUCKET_NAME,
    };

    try {
        const data = await s3Client.send(new ListObjectsCommand(listParams));
        const images = data.Contents?.map((obj) => obj.Key || '') || [];
        res.status(200).json(images);
    } catch (err) {
        console.log('Error', err);
        res.status(500).json({ error: 'Error getting the images' });
    }
};

// Controller to get all images with presigned URL
const getImagesPresignedURL = async (req, res) => {
    const listParams = {
        Bucket: AWS_BUCKET_NAME,
    };

    try {
        const data = await s3Client.send(new ListObjectsCommand(listParams));
        const images =
            data.Contents?.map(async (obj) => {
                const signedUrl = await getSignedUrl(obj.Key || '');
                return { key: obj.Key, url: signedUrl };
            }) || [];

        const imagesWithUrls = await Promise.all(images);

        res.status(200).json(imagesWithUrls);
    } catch (err) {
        console.log('Error', err);
        res.status(500).json({ error: 'Error getting the images' });
    }
};

// Controller to upload images
const uploadImages = async (uploadedImages) => {
    try {
        const uploadedFileNames = await Promise.all(
            uploadedImages.map(async (image) => {
                const fileKey = `${uuidv4()}_${image.originalname}`;

                const uploadParams = {
                    Bucket: AWS_BUCKET_NAME,
                    Key: fileKey,
                    Body: image.buffer,
                };

                await s3Client.send(new PutObjectCommand(uploadParams));

                return fileKey;
            })
        );

        return uploadedFileNames;
    } catch (error) {
        throw new Error('Error uploading the images');
    }
};

// Controller to delete an image
const deleteImage = async id => {

    try {
        const deleteParams = {
            Bucket: AWS_BUCKET_NAME,
            Key: id,
        };

        await s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
        console.error('Error deleting the image:', error);

    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////
//                              Controllers for testing in routes                              //
/////////////////////////////////////////////////////////////////////////////////////////////////

// Controller to get an image by ID
const getImageController = async (req, res) => {
    const { id } = req.params;

    try {
        const url = await getSignedUrl(id);
        console.log('URL:', url);
        res.status(200).json({ url });
    } catch (error) {
        console.error('Error retrieving the image:', error);
        res.status(500).json({ error: 'Error retrieving the image' });
    }
};

// Controller to get all images
const getImagesController = async (req, res) => {
    const listParams = {
        Bucket: AWS_BUCKET_NAME,
    };

    try {
        const data = await s3Client.send(new ListObjectsCommand(listParams));
        const images = data.Contents?.map((obj) => obj.Key || '') || [];
        res.status(200).json(images);
    } catch (err) {
        console.log('Error', err);
        res.status(500).json({ error: 'Error getting the images' });
    }
};

// Controller to get all images with presigned URL
const getImagesPresignedURLController = async (req, res) => {
    const listParams = {
        Bucket: AWS_BUCKET_NAME,
    };

    try {
        const data = await s3Client.send(new ListObjectsCommand(listParams));
        const images =
            data.Contents?.map(async (obj) => {
                const signedUrl = await getSignedUrl(obj.Key || '');
                return { key: obj.Key, url: signedUrl };
            }) || [];

        const imagesWithUrls = await Promise.all(images);

        res.status(200).json(imagesWithUrls);
    } catch (err) {
        console.log('Error', err);
        res.status(500).json({ error: 'Error getting the images' });
    }
};

// Controller to upload images
const uploadImagesController = async (req, res) => {
    const uploadedImages = req.files;

    try {
        const uploadPromises = uploadedImages.map(async (image) => {
            const fileKey = `${uuidv4()}_${image.originalname}`;

            const uploadParams = {
                Bucket: AWS_BUCKET_NAME,
                Key: fileKey,
                Body: image.buffer,
            };

            await s3Client.send(new PutObjectCommand(uploadParams));

            const url = await getSignedUrl(fileKey);
            return url;
        });

        const urls = await Promise.all(uploadPromises);
        res.status(201).json({ urls });
    } catch (error) {
        console.error('Error uploading the images:', error);
        res.status(500).json({ error: 'Error uploading the images' });
    }
};

// Controller to delete an image
const deleteImageController = async (req, res) => {
    const imageName = req.params.id;
    try {
        const deleteParams = {
            Bucket: AWS_BUCKET_NAME,
            Key: imageName,
        };

        await s3Client.send(new DeleteObjectCommand(deleteParams));
        res.status(204).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting the image:', error);
        res.status(500).json({ error: 'Error deleting the image' });
    }
};



export {
    getImage,
    getImages,
    getImagesPresignedURL,
    uploadImages,
    deleteImage,
    getSignedUrl,
    getImageController,
    getImagesController,
    getImagesPresignedURLController,
    uploadImagesController,
    deleteImageController
}