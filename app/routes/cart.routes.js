const { authJwt }		= require("../middleware");
const controller		= require("../controllers/cart.controller");
const {verifyItemCart}	= require("../middleware");


module.exports		= function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers"
		,	"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	//app.post("/api/cart/add", controller.cartAdd);

	app.post(
		"/api/cart/add",
		[
			authJwt.verifyToken
		],
		[
			verifyItemCart.checkDuplicateItem
		],	
		controller.cartAdd
	);

	app.get("/api/cart/list", [ authJwt.verifyToken ], controller.itensList);
	app.get("/api/cart/listComprados/:id_venda", [ authJwt.verifyToken ], controller.returnItensComprados);
  app.post("/api/cart/removerItem", [ authJwt.verifyToken ], controller.removeItem);
};