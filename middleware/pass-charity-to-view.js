const passCharityToView = (req, res, next) => {
  console.log('req.session.charity', req.session.charity)
  res.locals.charity = req.session.charity ? req.session.charity : null
  next()
}

module.exports = passCharityToView
