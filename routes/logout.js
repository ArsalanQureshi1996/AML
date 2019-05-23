module.exports = function logout(req,res) {
    req.logout();
    req.session.destroy();
    res.redirect('/users/login');
};