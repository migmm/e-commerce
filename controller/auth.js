import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import api from '../api/auth.js';
import apiUsers from '../api/users.js';

dotenv.config();


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required.' })
        }

        const foundUser = await api.getAuth('email', email);
        if (!foundUser) return res.status(401).json({ message: 'Unauthorized.' })

        const match = await bcrypt.compare(password, foundUser.password)
        if (!match) return res.status(401).json({ message: 'Unauthorized.' })

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

        foundUser.lastLogin = new Date()
        const { id, ...userData } = foundUser;

        await apiUsers.updateUser(id, userData);

        return res.cookie('jwt', refreshToken, cookieOptions).status(201).json({ accessToken });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error: An unexpected error occurred.' });
    }
};

const refreshToken = (req, res) => {
    const cookies = req.cookies

    try {
        if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

        const refreshToken = cookies.jwt

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.status(403).json({ message: 'Forbidden' })

                const foundUser = await api.getAuth('username', decoded.username);

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

                foundUser.lastLogin = new Date()
                const { id, ...userData } = foundUser;

                await apiUsers.updateUser(id, userData);

                res.status(201).json({ token: accessToken })
            }
        )

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error: Error refreshing token.' });
    }
}

const logout = (req, res) => {
    const cookies = req.cookies.jwt;

    try {
        if (!cookies) return res.status(204).end();

        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })

        res.status(204).json({ message: 'Cookie cleared' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error: Error clearing cookie.' });
    }
}

const signup = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const foundUser = await apiUsers.getByField('username', username);
        const foundEmail = await apiUsers.getByField('email', email);

        if (foundUser && foundEmail) {
            return res.status(409).json({ message: 'Internal server error: Username or email already exists.' });
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = {
            username,
            password: hashedPwd,
            email
        }

        await apiUsers.createUser(newUser);
        res.status(201).json({ message: "User created sucessfully." });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error: Error creating user.' });
    }
}

async function sendOTP(req, res) {
    try {
        const { email, deliveryMethod } = req.body;

        const user = await api.generateOTP(email, deliveryMethod);

        if (!user) return res.status(500).json({ message: 'Error sending OTP' });

        if (deliveryMethod === 'sms') {

        } else if (deliveryMethod === 'email') {

        } else {
            return res.status(400).json({ message: 'Invalid delivery method' });
        }

        res.status(201).json({ message: 'OTP sended' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error: Error sending OTP' });
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
        res.status(500).json({ message: 'Internal server error: Error verifying OTP code' });
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