const { authJwt }		= require("../middleware");
const controller		= require("../controllers/comment.controller");
const {verifyComment}	= require("../middleware");

module.exports		= function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers"
		,	"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	//app.post("/api/comment/add", controller.commentAdd);

	app.post(
		"/api/comment/add",
		[
			authJwt.verifyToken
		]
	,	[
			verifyComment.checkDuplicateItem
		]
	,	[
			verifyComment.checkUserComprou
		]
	,		controller.commentAdd
	);
	
	app.post("/api/comment/list", controller.commentsList);
	app.post("/api/comment/delete", controller.commentDelete);

};