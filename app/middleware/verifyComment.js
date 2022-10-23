const db			= require("../models");
const Comment		= db.comment;
const ItemCarrinho	= db.itensCarrinho;
const cnx   		= db.sequelize;
const Op			= db.Sequelize.Op;


checkDuplicateItem = (req, res, next) => {
	// Username
	Comment.findOne({
		where: {
			id_produto: req.body.id_produto,
			id_usuario: req.id,
		}
	}).then(usuario => {
		if (usuario) {
			res.status(299).send({
				message: "Um comentário seu já foi feito neste produto!"
			});
			return;
		}
		next();
	});
};

checkUserComprou = (req, res, next) => {
	var id_usuario = req.id;
	var id_produto = req.body.id_produto;
	//pesquisar de forma filtrada;

	var sql = `select * from "itensCarrinho" where id_usuario = '${id_usuario}' and id_produto = '${id_produto}' and status_de_compra > 0`;

	//var sql = `select * from "itensCarrinho"`;

	var resposta = cnx.query(sql,
	{
		type: cnx.QueryTypes.SELECT
	}).then(async rows => {
		if(rows.length == 0){
			res.status(299).send({ message: "Produto ainda não foi comprado!"});
			return;
		}if(rows.length !== 0){
			next();
		}
	}).catch(err => {
		res.status(500).send({ messsage: err.message });
	});

};




const verifyComment = {
	checkDuplicateItem: checkDuplicateItem,
	checkUserComprou: checkUserComprou
};
module.exports = verifyComment;