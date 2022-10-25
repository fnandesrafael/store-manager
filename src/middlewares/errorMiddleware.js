const errorHandler = (err, _req, res, _next) => {
  const { details } = err;

  if (err.isJoi === true) {
    const errMessage = details[0].message;
    
    return res.status(400).json({ message: errMessage });
  } if (err.isCataloged === true) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  
  return res.status(500).json({ message: 'Internal server error' });
};

module.exports = errorHandler;