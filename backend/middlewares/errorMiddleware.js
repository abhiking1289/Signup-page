//this page is created when the errors occured in Postman...
//Actually when an error occurs it is showing in HTML format but for showing the eroor in structured format we created this file

const notFound = (req, res, next) => {
  // this is when the route (/api/users) is not found or doesnt exists
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); //this throws an error to the user when not found
  next(error); //and then move on
};

const errorHandler = (err, req, res, next) => {
  //General errors...it going see what the error is being thrown by the server and it's going to convert it in a structured form
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, //we don't want the stack if the application is in production form so we added .env NODE_ENV
  });
};

module.exports = { notFound, errorHandler };
