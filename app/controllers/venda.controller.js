const db			= require("../models");
const config		= require("../config/auth.config");
const Venda			= db.venda;
const ItensCarrinho	= db.itensCarrinho;
const cnx   		= db.sequelize;
const Op			= db.Sequelize.Op;

exports.vendaCreate = (req, res, next) => {


	Venda.create({
		id_usuario:			req.id
	,	id_endereco:		req.body.id_endereco
	,	forma_pgto:			req.body.forma_pgto
	,	valor_total:		req.body.valor_total
	,	status_entrega:		'Concluída'
	})
	.then(venda => {


		var sql 	= 	`UPDATE "itensCarrinho"
						SET status_de_compra = '${venda.id}'
						WHERE id_usuario = ${venda.id_usuario} and status_de_compra = 0;`;

		var resposta	= cnx.query(sql,
		{
			type: cnx.QueryTypes.UPDATE
		}).then(async rows => {
			res.status(200).send({ message: "Venda registrado com sucesso!"});
		}).catch(err => {
			res.status(500).send({ messsage: err.message });
		});


		ItensCarrinho.findAll({
			where: {
					status_de_compra: venda.id
				}
			}).then(items => {

				items.forEach(item => {
		
				var sql 	=	`UPDATE produto
								SET estoque = estoque - ${item.quantidade}
								WHERE id = ${item.id_produto};`


				var resposta	= cnx.query(sql,
					{
						type: cnx.QueryTypes.UPDATE
					}).then(async rows => {
					}).catch(err => {
					});

				})	

		});
		

	})
	.catch(err => {
		res.status(500).send({ message: err.message });
	});


		

};

exports.vendaList = (req, res) => {

	var id_usuario = req.id;
	//pesquisar de forma filtrada;

	var sql = `select * from "venda" where id_usuario = '${id_usuario}' `;

	var resposta	= cnx.query(sql,
	{
		type: cnx.QueryTypes.SELECT
	}).then(async rows => {
		res.status(200).send( rows );
	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});
};

exports.vendaListTotal = (req, res) => {


	var sql = `select * from "venda"`;

	var resposta	= cnx.query(sql,
	{
		type: cnx.QueryTypes.SELECT
	}).then(async rows => {
		res.status(200).send( rows );
	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});
};