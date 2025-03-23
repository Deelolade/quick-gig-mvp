export const errorHandler = (statusCode, message)=>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}
export const errorMiddleware = (err, req, res, next)=>{
    const statusCode = err.status || 500;
    const message = err.message || "Something went wrong!";
    res.status(statusCode).json({ success: false ,message})
}