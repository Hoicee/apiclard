/*
– Verificar se o username ou o email está duplicado ou não
– Verificar se o perfil requisitado é ou não existente
*/

const db		= require("../models");
const Usuario	= db.usuario;

checkDuplicateUsernameOrEmail = (req, res, next) => {
	// Username
	Usuario.findOne({
		where: {
			nome_completo: req.body.nome_completo
		}
	}).then(usuario => {
		if (usuario) {
			res.status(400).send({
				message: "Failed! Username is already in use!"
			});
			return;
		}
		// Email
		Usuario.findOne({
			where: {
				email: req.body.email
			}
		}).then(usuario => {
			if (usuario) {
				res.status(400).send({
					message: "Failed! Email is already in use!"
				});
				return;
			}
			next();
		});
	});
};

const verifySignUp = {
	checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};
module.exports = verifySignUp;
