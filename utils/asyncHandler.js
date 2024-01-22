//higher order function to catch error and forwrd errors to error handlers
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (err) {
        next(err);
    }
}

export default asyncHandler;