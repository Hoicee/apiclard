const { authJwt }	= require("../middleware");
const controller	= require("../controllers/venda.controller");


module.exports		= function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers"
		,	"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.post("/api/venda/create", [ authJwt.verifyToken ], controller.vendaCreate);
	app.get("/api/venda/list", [authJwt.verifyToken ], controller.vendaList);
	app.get("/api/venda/listTotal", controller.vendaListTotal);
};