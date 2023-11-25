// creating isLoggedIn middleware to check whether the user has successfully loggedin or not
function isLoggedIn(req, res, next) {
    let loginSession = true;
  req.user ? next() : res.sendStatus(401);
}


module.exports = isLoggedIn;