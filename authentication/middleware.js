function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    return res.sendStatus(400)
  }
}

module.exports = authenticationMiddleware