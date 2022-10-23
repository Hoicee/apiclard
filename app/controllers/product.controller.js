const db		= require("../models");
const config	= require("../config/auth.config");
var fs 			= require('fs');
const Produto	= db.produto;
const cnx   	= db.sequelize;
const Op		= db.Sequelize.Op;

const multer 	= require('multer');

exports.productNovidades = (req, res) => {
	
	var sql = `select * from produto where status = 'ativo' order by id desc limit 4`;

	var resposta	= cnx.query(sql,
	{
		type: cnx.QueryTypes.SELECT
	}).then(async rows => {
		res.status(200).send( rows );
	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});

}

exports.productSelectId = (req, res) => {
	var id_produto = req.params.id_produto;

	var sql = `select * from produto where id = ${id_produto}`;

	var resposta = cnx.query(sql,
	{
		type: cnx.QueryTypes.SELECT
	}).then(async rows => {
		res.status(200).send( rows );
	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});
}

exports.productListaFiltrada = (req, res) => {

	var filtro = req.params.filtro;
	var offset = req.params.offset;


	var sql2 = `select count(*) from produto where status = 'ativo' and UPPER(nome_produto) like UPPER('%${filtro}%')`;
	var sql1 = `select * from produto where status = 'ativo' and UPPER(nome_produto) like UPPER('%${filtro}%') limit 12 offset ${12 * offset}`;

	var resposta = cnx.query(sql1,
	{
		type: cnx.QueryTypes.SELECT
	}).then(async rows => {
		
		var resposta = cnx.query(sql2,
			{
				type: cnx.QueryTypes.SELECT
			}).then(async count => {
				res.status(200).send([{rows: rows}, {count: count}]);
			}).catch(err => {
				res.status(500).send({ messsage: err.message });
			});

	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});

}

exports.productSelectCategoria = (req, res) => {
	
	var categoria = req.params.categoria;
	var offset = req.params.offset;


	var sql2 = `select count(*) from produto where status = 'ativo' and categoria = '${categoria}'`;
	var sql1 = `select * from produto where status = 'ativo' and categoria = '${categoria}' limit 12 offset ${offset * 12};`;

	var resposta = cnx.query(sql1,
	{
		type: cnx.QueryTypes.SELECT
	}).then(async rows => {
		
		var resposta = cnx.query(sql2,
			{
				type: cnx.QueryTypes.SELECT
			}).then(async count => {
				res.status(200).send([{rows: rows}, {count: count}]);
			}).catch(err => {
				res.status(500).send({ messsage: err.message });
			});

	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});

}


//antigo

exports.productList = (req, res) => {

	//var nome_produto = req.body.nome_produto;
	//pesquisar de forma filtrada;
	//var sql = `SELECT * from produto where nome_produto like '%${nome_produto}%' `;

	var sql = `SELECT * from produto`;

	var resposta	= cnx.query(sql,
	{
		type: cnx.QueryTypes.SELECT
	}).then(async rows => {
		res.status(200).send( rows );
	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});
};

exports.productPage = (req, res) => {

	var offset = req.params.offset;
	
	var sql = `select * from produto where status = 'ativo' order by id limit 12 offset ${offset} * 12`;

	var resposta	= cnx.query(sql,
	{
		type: cnx.QueryTypes.SELECT
	}).then(async rows => {
		res.status(200).send( rows );
	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});
}

exports.productCreate = (req, res) => {

	Produto.create({
		nome_produto:	req.body.nome_produto
	,	categoria:		req.body.categoria
	,	descricao:		req.body.descricao
	,	estoque:		req.body.estoque
	,	valor:			req.body.valor
	,	status:			"ativo"
	})
	.then(usuario => {
		res.status(200).send({ message: "Produto registrado com sucesso!" });
	})
	.catch(err => {
		res.status(500).send({ message: err.message });
	});
};

exports.productImgInsert = (req, res) => {
	var id_produto = req.params.id;
	var storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, './app/public/upload/productsImg')
		},
		filename: (req, file, cb) => {
			cb(null, `produto_${id_produto}.png`)
		}
	});
	var upload = multer({
		storage: storage
	}).single('image');

	upload(req, res, function(err) {
		if(err instanceof multer.MulterError) {
			console.log("Erro do Multer");
			return res.status(500).json(err);
		} else if (err) {
			console.log("Outros Erros");
			return res.status(500).json(err);
		}
		res.status(200).send({ message: "Upload executado com sucesso!" });
	});
};

exports.productDelete = (req, res) => {

		var idprodex = req.body.idprodex;
			
		var sql 	= 	`UPDATE produto
						SET status = 'excluido'
						WHERE id = ${idprodex};`;

		var resposta	= cnx.query(sql,
		{
			type: cnx.QueryTypes.UPDATE
		}).then(async rows => {
			res.status(200).send( rows);
		}).catch(err => {
			res.status(500).send({ messsage: err.message });
		});

		var sql = `delete from "itensCarrinho" where id_produto = '${idprodex}' and status_de_compra = 0`;

		var resposta	= cnx.query(sql,
		{
			type: cnx.QueryTypes.DELETE
		}).then(async rows => {
		}).catch(err => {
		});
}

exports.productAtivar = (req, res) => {

		var idprodex = req.body.idprodex;
			
		var sql 	= 	`UPDATE produto
						SET status = 'ativo'
						WHERE id = ${idprodex};`;

		var resposta	= cnx.query(sql,
		{
			type: cnx.QueryTypes.UPDATE
		}).then(async rows => {
			res.status(200).send( rows);
		}).catch(err => {
			res.status(500).send({ messsage: err.message });
		});
}

		

exports.productAlter = (req, res) => {

		var alt_id 			= req.body.alt_id;
		var alt_nome_prod 	= req.body.alt_nome_prod;
		var alt_descricao	= req.body.alt_descricao;
		var alt_quantidade	= req.body.alt_quantidade;
		var alt_valor		= req.body.alt_valor;

		var sql = 	`UPDATE produto
					SET nome_produto = '${alt_nome_prod}',
					descricao = '${alt_descricao}', 
					estoque = ${alt_quantidade}, 
					valor = ${alt_valor}
					WHERE id = ${alt_id}; `;

		var resposta	= cnx.query(sql,
		{
			type: cnx.QueryTypes.UPDATE
		}).then(async rows => {
			res.status(200).send( rows );
		}).catch(err => {
			res.status(500).send({ messsage: err.message });
		});

}