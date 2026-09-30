const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Logging strutturato (in produzione sostituire con Pino o Winston)
  console.error(`[ERROR] ${req.method} ${req.url} - Status: ${statusCode} - ${message}`);

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
      timestamp: new Date().toISOString()
    }
  });
};

module.exports = errorHandler;