const db		= require("../models");
const config	= require("../config/auth.config");
const ItensCarrinho	= db.itensCarrinho;
const cnx   	= db.sequelize;
const Op		= db.Sequelize.Op;

exports.itensList = (req, res) => {

	var id_usuario = req.id;
	//pesquisar de forma filtrada;

	var sql = `select * from "itensCarrinho" where id_usuario = '${id_usuario}' and status_de_compra = 0`;

	//var sql = `select * from "itensCarrinho"`;

	var resposta	= cnx.query(sql,
	{
		type: cnx.QueryTypes.SELECT
	}).then(async rows => {
		res.status(200).send( rows );
	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});
};

exports.cartAdd = (req, res) => {

	ItensCarrinho.create({

		id_usuario:			req.id
	,	id_produto:			req.body.id_produto
	,	nome_produto:		req.body.nome_produto
	,	quantidade:			req.body.quantidade
	,	valor_unitario:		req.body.valor_unitario
	,	status_de_compra:	req.body.status_de_compra

	})
	.then(usuario => {
		res.status(200).send({ message: "Item registrado com sucesso!" });
	})
	.catch(err => {
		res.status(500).send({ message: err.message });
	});
};

exports.removeItem = (req, res) => {

	var id_produto = req.body.id_produto;
	var id_usuario = req.id;
	//remover da lista;

	var sql = `delete from "itensCarrinho" 
	where id_produto = '${id_produto}' and 
	status_de_compra = 0 and 
	id_usuario = '${id_usuario}' `;

	var resposta	= cnx.query(sql,
	{
		type: cnx.QueryTypes.DELETE
	}).then(async rows => {
		res.status(200).send({ message: "Item removido do carrinho"});
	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});
};

exports.returnItensComprados = (req, res) => {

	var id_venda = req.params.id_venda;
	var id_usuario = req.id;

	var sql = `select * from "itensCarrinho" where status_de_compra = ${id_venda} and id_usuario = ${id_usuario}`

	var resposta = cnx.query(sql,
		{
			type: cnx.QueryTypes.SELECT
		}).then(async rows => {
			res.status(200).send( rows );
		}).catch(err => {
			res.status(500).send({ messsage: err.message });
		});

}
