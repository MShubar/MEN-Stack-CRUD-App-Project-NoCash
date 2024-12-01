const passAccountToView = (req, res, next) => {
  res.locals.account = req.session.account ? req.session.account : null
  next()
}

module.exports = passAccountToView
