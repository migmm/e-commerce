import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import api from '../api/auth.js';

dotenv.config();


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const login = async (req, res) => {
    const { email, password } = req.body
    console.log("dsds", email, password)
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
        { 
            'username': foundUser.username,
            'role': foundUser.role
        },
        secretKey,
        { expiresIn: '1d' }
    );

    const refreshToken = jwt.sign(
        { 
            'username': foundUser.username,
            'role': foundUser.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    const cookieOptions = {
        httpOnly: false, //value for developing in local host, change to "true" in production.
        sameSite: 'Strict', //value for developing in local host, change to "none" in production.
        secure: false, //value for developing in local host, change to "true" in production.
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    return res.cookie('jwt', refreshToken, cookieOptions).status(201).json({ accessToken });
};

const refreshToken = (req, res) => {
    const cookies = req.cookies
    console.log(cookies)
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify( 
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await api.getAuth('username', decoded.username);
            console.log('user auth', foundUser);
        
            if (!foundUser) {
                return res.status(401).json({ message: 'Unauthorized' })
            }

            const accessToken = jwt.sign(
                { 
                    'username': foundUser.username,
                    'role': foundUser.role
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            res.json({ accessToken })
        }
    )
}

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

async function sendOTP(req, res) {
    try {
        const { email, deliveryMethod } = req.body;

        const user = await api.generateOTP(email, deliveryMethod);

        if (!user) {
            return res.status(500).json({ message: 'Error sending OTP' });
        }

        if (deliveryMethod === 'sms') {
        
        } else if (deliveryMethod === 'email') {
        
        } else {
            return res.status(400).json({ message: 'Invalid delivery method' });
        }

        res.status(201).json({ message: 'OTP sended' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error sending OTP' });
    }
}

async function verifyOTP(req, res) {
    const { email, otp } = req.body;

    try {
        const isValid = await api.verifyOTP(email, otp);

        if (isValid) {
            res.json({ message: 'Valid OTP code' });
        } else {
            res.status(401).json({ message: 'Invalid OTP code' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying OTP code' });
    }
}

export default {
    login,
    refreshToken,
    logout,
    signup,
    sendOTP,
    verifyOTP
};