const { authJwt }			= require("../middleware");
const controller			= require("../controllers/address.controller");
const {verifyAddressLimit}	= require("../middleware");


module.exports		= function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers"
		,	"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	//app.post("/api/address/add", controller.addressAdd);

	app.post(
		"/api/address/add"
	,	[
			authJwt.verifyToken
		]
	,	[
			verifyAddressLimit.checkAddressLimit
		]
	,	[
			verifyAddressLimit.checkDuplicateCep
		]
	,	controller.addressAdd
	);
	app.get("/api/address/list", [ authJwt.verifyToken ] , controller.addressList);
	app.get("/api/address/get/:id_endereco", controller.addressGet);
	app.post("/api/address/delete", controller.addressDelete);

};