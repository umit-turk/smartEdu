//Eğer son kullanıcı yetkisi olmayan bir linke ulaştığı zaman onu giriş sayfasına redirect etsin.
const User = require("../models/User");

module.exports = (req, res, next) => {
  User.findById(req.session.userID, (err, user) => {
    if (err || !user) return res.redirect("/login");
    next();
  });
};
