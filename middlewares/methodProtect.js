const allowMethods = (allowedMethods) => {
    return (req, res, next) => {
        if (!allowedMethods.includes(req.method)) {
            return res.status(405).send({ error: 'Server error' });
        }
        next();
    };
};

export default allowMethods;
