const db		= require("../models");
const config	= require("../config/auth.config");
const cnx   	= db.sequelize;
const Op		= db.Sequelize.Op;


/*
– /api/test/all → Para todos os acessos
*/
exports.allAccess = (req, res) => {
	res.status(200).send("Public Content.");
};

exports.getName = (req, res) => {

	//var nome_produto = req.body.nome_produto;
	//pesquisar de forma filtrada;
	//var sql = `SELECT * from produto where nome_produto like '%${nome_produto}%' `;

	id_usuario = req.body.id_usuario

	var sql = `SELECT nome_completo from usuarios where id = ${id_usuario}`;

	var resposta	= cnx.query(sql,
	{
		type: cnx.QueryTypes.SELECT
	}).then(async rows => {
		res.status(200).send( rows );
	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});
};

exports.getNameAndEmail = (req, res) => {
	
	id_usuario = req.id;
	

	var sql = `select nome_completo, email from usuarios where id = ${id_usuario}`;

	var resposta	= cnx.query(sql,
	{
		type: cnx.QueryTypes.SELECT
	}).then(async rows => {
		res.status(200).send( rows );
	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});
};

exports.getUserId = (req, res) => {
	res.status(200).send({id_usuario: req.id});
};

