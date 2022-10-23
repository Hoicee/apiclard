/*
– Verificar se o usuario ja possui 3 enderecos
*/

const db		= require("../models");
const Endereco	= db.endereco;

checkAddressLimit = (req, res, next) => {

	Endereco.findAll({
		where: {
			id_usuario: req.id
		,	status:		"ativo"
		}
	}).then(endereco => {
		if (endereco.length > 2) {
			res.status(299).send({
				message: "Ja possui 3 endereços cadastrados!"
			});
			return;
		}
		next();
	});
};

checkDuplicateCep = (req, res, next) => {

		Endereco.findOne({
			where: {
				cep: 		req.body.cep
			,	num:		req.body.num
			,	status:		"ativo"
			}
		}).then(endereco => {
			if (endereco) {
				res.status(299).send({
					message: "Já existe um endereço com este CEP e Número!"
				});
				return;
			}
			next();
		});
}

const verifyAddressLimit = {
	checkAddressLimit: checkAddressLimit,
	checkDuplicateCep: checkDuplicateCep
};
module.exports = verifyAddressLimit;