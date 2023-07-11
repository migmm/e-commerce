/* import jwt from 'jsonwebtoken';
import authService from '../api/auth.js';

const secretKey = 'mysecretkey';

function signup(req, res) {
    const { username, password, email } = req.body;

    const newUser = authService.createUser(username, password, email);
    console.log(newUser)
    res.json({ message: 'User registered successfully' });
}

function login(req, res) {
    const { email, password } = req.body;

    const user = authService.authenticateUser(email, password);

    if (user) {
        const otp = authService.generateOTP(email);
        //const token = jwt.sign({ username: user.username, otp }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}

function verifyOTP(req, res) {
    const { otp, email } = req.body;

    /* jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        } */

      /*   //const { email } = decoded;
        const isValid = authService.verifyOTP(email, otp);

        if (isValid) {
            res.json({ message: 'OTP ok' });
        } else {
            res.status(401).json({ message: 'invalid OTP' });
        } */
   /*  }); */
 /*}

async function sendOTP(req, res) {
    try {
        const { email } = req.body;

        const otp = authService.generateOTP(email);
        //await otpService.sendOTPByEmail(email, otp);
        console.log(otp)

        res.status(201).json({ message: 'OTP sended' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sendind OTP' });
    }
}


export default {
    signup,
    login,
    verifyOTP,
    sendOTP
};
 */

// const {getProduct, getProducts} = require('../api/products');
import api from '../api/users.js';
//import { USER_IMG_UPLOAD_LOCATION } from '../config.js';



////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getUsers = async (req, res) => {
    res.json(await api.getUsers());
};

const getUser = async (req, res) => {
    const id = req.params.id;
    res.json(await api.getUser(id));
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////


const postUser = async function (req, res, next) {
    try {
        if (req) {
            const user = req.body;
            const files = req.files;
            const locationName = USER_IMG_UPLOAD_LOCATION.STORAGE_LOCATION.substring(9);

            user['images'] = {};

            if (files.avatar !== 'undefined') {

                const firstUserImg = req.files['avatar'][0];
                const userImgGallery = req.files['gallery'];

                user['images']['portada'] = locationName + firstUserImg.filename;

                if (files.gallery !== undefined) {

                    for (let i = 0; i <= userImgGallery.length; ++i) {
                        if (userImgGallery[i] !== undefined) {
                            user['images'][`${'galeria' + [i]}`] = locationName + userImgGallery[i].filename;
                        }
                    }
                }

                const newUser = await api.createUser(user);
                res.json(newUser);
            }
            /* } else {
                res.status(415).send('<h1>Se produjo un error.</h1>');
            } */
        }
    }

    catch (err) {
        res.status(415).send('<h1>Se produjo un error.</h1>');
    }
}


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putUser = async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const files = req.files;
    const locationName = USER_IMG_UPLOAD_LOCATION.STORAGE_LOCATION.substring(9);
    
    try {
        if (files.avatar !== undefined) {

            const firstUserImg = req.files['avatar'][0];

            // const data = req.body
            /*     const previousAvatar = data.images.prevAvatar;
                const previousGalleryImg0 = data.images.prevGallery0
                const previousGalleryImg1 = data.images.prevGallery1
                const previousGalleryImg2 = data.images.prevGallery2 */

            /*  user['images'] = {} */

            user['images']['portada'] = locationName + firstUserImg.filename;
        }
    }
    catch {
        console.log("No se actualizó imágen de portada.")
    }

    try {
        if (files.gallery !== undefined) {

            const userImgGallery = req.files['gallery'];
            for (let i = 0; i <= userImgGallery.length; ++i) {
                if (userImgGallery[i] !== undefined) {
                    user['images'][`${'galeria' + [i]}`] = locationName + userImgGallery[i].filename;
                }
            }
        }
    }

    catch {
        console.log("No se actualizaron imágnes de galería.")
    }
    /*  else {
        res.status(415).send('<h1>Se produjo un error.</h1>');
    } */

    const updatedUser = await api.updateUser(id, user) || {};
    res.json(updatedUser);
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteUser = async (req, res) => {
    const id = req.params.id;

    const removedUser = await api.deleteUser(id) || {};
    res.json(removedUser);
};

export default {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser,
};
