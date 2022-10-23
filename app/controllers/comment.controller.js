const db		= require("../models");
const config	= require("../config/auth.config");
const Comment	= db.comment;
const cnx   	= db.sequelize;
const Op		= db.Sequelize.Op;

exports.commentAdd = (req, res) => {

	Comment.create({

		id_usuario:		req.id
	,	id_produto:		req.body.id_produto
	,	comentario:		req.body.comentario

	})
	.then(usuario => {
		res.status(200).send({ message: "Comentário registrado com sucesso!" });
	})
	.catch(err => {
		res.status(500).send({ message: err.message });
	});
};

exports.commentsList = (req, res) => {

	var id_produto = req.body.id_produto;

	var sql = `select * from "comment" where id_produto = '${id_produto}' `;

	var resposta	= cnx.query(sql,
	{
		type: cnx.QueryTypes.SELECT
	}).then(async rows => {
		res.status(200).send( rows );
	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});
};

exports.commentDelete = (req, res) => {

	var id = req.body.id;
	var id_usuario = req.body.id_usuario;

	var sql = `delete from "comment" where id = '${id}' and id_usuario = '${id_usuario}' `;

	var resposta	= cnx.query(sql,
	{
		type: cnx.QueryTypes.DELETE
	}).then(async rows => {
		res.status(200).send( rows );
	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});
};