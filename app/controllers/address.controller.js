const db		= require("../models");
const config	= require("../config/auth.config");
const Endereco	= db.endereco;
const Venda		= db.venda;
const cnx   	= db.sequelize;
const Op		= db.Sequelize.Op;

exports.addressList = (req, res) => {

	var id_usuario = req.id;

	var sql = `select * from "endereco" where id_usuario = '${id_usuario}' and status = 'ativo'`;

	var resposta = cnx.query(sql,
	{
		type: cnx.QueryTypes.SELECT
	}).then(async rows => {
		res.status(200).send( rows );
	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});
};

exports.addressGet = (req, res) => {

	var id_endereco = req.params.id_endereco;

	var sql = `select * from "endereco" where id = ${id_endereco}`;

	var resposta = cnx.query(sql,
		{
			type: cnx.QueryTypes.SELECT
		}).then(async rows => {
			res.status(200).send( rows );
		}).catch(err => {
			res.status(500).send({ messsage: err.message });
	});

}

exports.addressAdd = (req, res) => {

	Endereco.create({

		id_usuario:		req.id
	,	nome:       	req.body.nome
	,	cep:		    req.body.cep
	, 	num:		    req.body.num
	,	status:		  "ativo"

	})
	.then(usuario => {
		res.status(200).send({ message: "Endereço registrado com sucesso!" });
	})
	.catch(err => {
		res.status(500).send({ message: err.message });
	});
};

exports.addressDelete = (req, res) => {

	var idendex = req.body.idendex;
  
	Venda.findOne({

    where: {
        id_endereco: idendex
    }
  	}).then(venda => {

      if(venda){
        var sql = `UPDATE endereco
        SET status = 'excluido'
        WHERE id = ${idendex}`;

        var resposta	= cnx.query(sql)
        .then(async rows => {
          res.status(200).send( rows);
        }).catch(err => {
          res.status(500).send({ messsage: err.message });
        });
      }else{

        var sql = `delete from endereco where id = ${idendex}`;

        var resposta	= cnx.query(sql)
          .then(async rows => {
            res.status(200).send( rows);
          }).catch(err => {
            res.status(500).send({ messsage: err.message });
          });
      }

  })

	
}