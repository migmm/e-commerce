




import api from '../api/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const secretKey = 'mysecretkey';

dotenv.config();


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const login = async (req, res) => {
    const { email, password } = req.body
    console.log("dsds",email, password)
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await api.getAuth('email', email);
    console.log('user auth', foundUser);

    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    const secretKey = process.env.ACCESS_TOKEN_SECRET;

    const accessToken = jwt.sign(
        { 'id': foundUser.id },
        secretKey,
        { expiresIn: '1d' }
    );

    const cookieOptions = {
        //httpOnly: true,
        sameSite: 'none',
        //secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    return res.cookie('jwt', accessToken, cookieOptions).status(201).json({ accessToken });
};


const logout = (req, res) => {
    const cookies = req.cookies.jwt;

    if (!cookies) return res.sendStatus(204)

    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    })

    res.json({ message: 'Cookie cleared' })
}


function signup(req, res) {
    const { username, password, email } = req.body;

    const newUser = authService.createUser(username, password, email);
    console.log(newUser)
    res.json({ message: 'User registered successfully' });
}


function verifyOTP(req, res) {
    const { otp, email } = req.body;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        //const { email } = decoded;
        const isValid = authService.verifyOTP(email, otp);

        if (isValid) {
            res.json({ message: 'OTP ok' });
        } else {
            res.status(401).json({ message: 'invalid OTP' });
        }
    });
}


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
    login,
    logout,
    signup,
    sendOTP,
    verifyOTP
};