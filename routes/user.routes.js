const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    //loading the invite page for admin
    // app.get("/api/auth/invite-user",
    //     [authJwt.verifyToken, authJwt.isAdmin],
    //     controller.inviteUserFe
    // );
    //sending the invite email 
    app.post("/api/auth/invite-user",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.inviteUser
    );

    app.get("/api/gateway/dashboardstats", controller.getDashboardStats)

    app.get("/magic", controller.magic)
};