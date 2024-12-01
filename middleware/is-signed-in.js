const isSignedIn = (req, res, next) => {
  if (req.session.account) return next()
  res.redirect('/account/sign-in')
}

module.exports = isSignedIn
