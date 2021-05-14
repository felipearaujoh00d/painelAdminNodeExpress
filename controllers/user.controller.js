exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {

    res.render('dashboard')
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};