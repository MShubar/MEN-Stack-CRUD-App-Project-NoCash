const sucMessage = (req, res, next) => {
  if (req.session.successMessage) {
    res.locals.successMessage = req.session.successMessage
    req.session.successMessage = null
  } else {
    res.locals.successMessage = null
  }
  next()
}

module.exports = sucMessage
