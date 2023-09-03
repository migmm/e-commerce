
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Error de multer, como tamaño de archivo excedido
        return res.status(400).json({ error: err.message });
    } else if (err) {
        // Otro tipo de error, como el filtro de archivos personalizado
        return res.status(400).json({ error: err.message });
    }
    next();
};

export default {
    handleMulterError
}