/*
Esse Controller tem duas funções:
- signup: incluir um novo usuário no banco de dados (definir um perfil para o usuário caso nenhum tenha sido selecionado)
- signin:
    . selecionar o usuário no database, verificando se existe
    . comparar senha com bcrypt, verificando se está correto
    . gerar token usando jsonwebtoken
    . retornar informações do usuário e token de acesso
*/
const db		= require("../models");
const config	= require("../config/auth.config");
const Usuario	= db.usuario;
const Op		= db.Sequelize.Op;
var jwt			= require("jsonwebtoken");
var bcrypt		= require("bcryptjs");

exports.signup = (req, res) => {
	// Save User to Database
	Usuario.create({
		nome_completo:	req.body.nome_completo
	,	email:			req.body.email
	,	senha:			bcrypt.hashSync(req.body.senha, 8)
	})
	.then(usuario => {
		res.status(200).send({ message: "Registrado com sucesso!" });
	})
	.catch(err => {
		res.status(500).send({ message: err.message });
	});
};
exports.signin = (req, res) => {
	Usuario.findOne({
		where: {
			email:	req.body.email
		}
	})
	.then(usuario => {
		if (!usuario) {
			return res.status(404).send({ message: "Usuário não encontrado!" });
		}
		
		var passwordIsValid = bcrypt.compareSync(
			req.body.senha
		,	usuario.senha
		);
		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken:	null
			,	message: 		"Senha incorreta!"
			});
		}

		var token = jwt.sign({ id: usuario.id }, config.secret, {
			expiresIn: 86400 * 300 // 24 horas * 300 dias
		});
		
		return res.status(200).send({
			id:				usuario.id,
			nome_completo:	usuario.nome_completo,
			email:			usuario.email,
			accessToken:	token
		});
	})
	.catch(err => {
		res.status(500).send({ message: err.message });
	});


};
