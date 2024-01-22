const errorHandler = (err, req, res, next) => {
	// if no success flag, status code or message in error use default flase flag, 500 code and message
	const statusCode = err.status || 500;
	const success = err.success || false;
	const message = err.message || "Something went wrong.";

	
	// returns error success flag, status code and message
	return res.status(statusCode).json({
		success, 
		statusCode: statusCode,
		message: message
	})
}

export default errorHandler;