/*
GET /api/test/all
*/
const { authJwt }	= require("../middleware");
const controller	= require("../controllers/user.controller");
module.exports		= function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers"
		,	"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});
	app.get("/api/test/all", controller.allAccess);
	app.post("/api/user/getName", controller.getName);
	app.get("/api/user/getUserId", [ authJwt.verifyToken ], controller.getUserId);
	app.get("/api/user/getNameEmail", [ authJwt.verifyToken ], controller.getNameAndEmail);

};
