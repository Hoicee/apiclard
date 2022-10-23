const { authJwt }	= require("../middleware");
const controller	= require("../controllers/product.controller");


module.exports		= function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers"
		,	"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});
	app.get("/api/product/novidades", controller.productNovidades);
	app.get("/api/product/selectId/:id_produto", controller.productSelectId);
	app.get("/api/product/lista/:filtro/:offset", controller.productListaFiltrada);
	app.get("/api/product/listaCategoria/:categoria/:offset", controller.productSelectCategoria);

	//antigo
	app.get("/api/product/list", controller.productList);
	app.get("/api/product/listPage/:offset", controller.productPage);
	app.post("/api/product/create", controller.productCreate);
	app.post("/api/product/insertImg/:id", controller.productImgInsert);
	app.post("/api/product/deleteProd", controller.productDelete);
	app.post("/api/product/altProd", controller.productAlter);
	app.post("/api/product/ativarProd", controller.productAtivar);
};
