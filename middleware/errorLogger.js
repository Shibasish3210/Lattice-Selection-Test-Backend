const errorLogger = (err, req, res, next) => {
	// logs error to console and then passes to next middleware
    console.error(err);
    next(err);
}

export default errorLogger;