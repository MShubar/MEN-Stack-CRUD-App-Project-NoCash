const errorMessage = (req, res, next) => {
  if (req.session.errMessage) {
    res.locals.errMessage = req.session.errMessage
    req.session.errMessage = null
  } else {
    res.locals.errMessage = null
  }
  next()
}

module.exports = errorMessage
