const jsonErrorHandler = (err, req, res, next) => {
    console.log(err)
    //res.status(err.statusCode).send({ error: err.message });
    res.status(500).json({ error: 'Server error.' });
}

export default jsonErrorHandler;