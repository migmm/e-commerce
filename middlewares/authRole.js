import jwt from 'jsonwebtoken';
import api from '../api/users.js';
import * as dotenv from 'dotenv'
dotenv.config()

const COOKIE_NAME = process.env.COOKIE_NAME || 'jwt';


const authRole = (roles) => async (req, res) => {
    try {
        // Get JWT token from HTTPS Cookies and ID from URL param
        const token = req.cookies?.[COOKIE_NAME];
        const id = req.params.id;
        console.log('roles', roles);

        // Ckeck if you have a token, if not, you are unauthorized
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        // Decode token
        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        //Find user in database with te ID in payload
        const userAuth = await api.getUser(payload.id);

        if (!userAuth) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // First check if user is admin or has required role specified in the route
        if (!roles.includes(userAuth.role)) {
            return res.status(403).json({ message: 'Forbidden.' });
        }

        // If there is any value in ID
        if (id) {
            // From the ID taken from URL find the user
            const userFromID = await api.getUser(id);

            // Check if user exist, if not, throw error
            if (!userFromID) {
                return res.status(404).json({ message: 'User not found.' });
            }
        }

        // Check if user is trying to modify their own information
        // If admin is logged just go on
        if (id && id !== userAuth.id && userAuth.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden.' });
        }

        // Check if user has permission to get
        if (req.body && req.method === 'GET') {
            return res.status(403).json({ message: 'Forbidden.' });
        }

        // Check if user has permission to update
        if (req.body && req.method === 'PUT') {
            return res.status(403).json({ message: 'Forbidden.' });
        }

        // Check if user has permission to delete
        if (req.method === 'DELETE') {
            return res.status(403).json({ message: 'Forbidden.' });
        }

        // Check if user has permission to create
        if (req.body && req.method === 'POST') {
            return res.status(403).json({ message: 'Forbidden.' });
        }

        // If banned property is in body
        // If Actual User is an Admin
        // Or if role permission can change banned status
        // User check is negation in order to throw an error if is true
        if (req.body.hasOwnProperty('banned') && (userAuth.role !== 'admin')) {
            return res.status(403).json({ message: 'Forbidden.' });
        }

        // If role property is in body
        // If Actual User is an Admin
        // Or if role permission can change banned status
        // User check is negation in order to throw an error if is true
        if (req.body.hasOwnProperty('role') && (userAuth.role !== 'admin')) {
            return res.status(403).json({ message: 'Forbidden 3' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default authRole;
