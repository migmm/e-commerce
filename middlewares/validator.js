const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const data = req.body;
        const validationError = schema.validate(data);

        if (validationError.error) {
            console.error(validationError.error.details[0].message);
            return res.status(400).json({ error: 'Error validating.' });
        }

        next();
    };
};

export default validationMiddleware;