const authJwt			= require("./authJWT");
const verifySignUp		= require("./verifySignUp");
const verifyItemCart	= require("./verifyItemCart");
const verifyAddressLimit= require("./verifyAddressLimit");
const verifyComment		= require("./verifyComment");

module.exports = {
	authJwt
,	verifySignUp
,	verifyItemCart
,	verifyAddressLimit
,	verifyComment
};
