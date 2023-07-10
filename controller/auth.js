import jwt from 'jsonwebtoken';
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

        //const { email } = decoded;
        const isValid = authService.verifyOTP(email, otp);

        if (isValid) {
            res.json({ message: 'OTP ok' });
        } else {
            res.status(401).json({ message: 'invalid OTP' });
        }
   /*  }); */
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
    signup,
    login,
    verifyOTP,
    sendOTP
};
