/*
- verificar se o token está correto, lendo a partir do x-access-token do cabeçalho HTTP, usando a função jsonwebtoken's verify().
- verificar se os perfís de usuário foram fornecidos ou não.
*/

const jwt		= require("jsonwebtoken");
const config	= require("../config/auth.config.js");
const db		= require("../models");
const Usuario	= db.usuario;

verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"];
	if (!token) {
		return res.status(403).send({message: "No token provided!"});
	}
	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({message: "Unauthorized!"});
		}
		req.id = decoded.id;
		next();
	});
};

const authJwt = {
	verifyToken:	verifyToken
};
module.exports = authJwt;
