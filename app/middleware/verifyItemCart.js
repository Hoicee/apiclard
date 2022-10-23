/*
– Verificar se o item ja esta adicionado ao carrinho
- Aumentar a quantidade caso ja esteja
*/

const db			= require("../models");
const ItemCarrinho	= db.itensCarrinho;

checkDuplicateItem = (req, res, next) => {
	// Username
	ItemCarrinho.findOne({
		where: {
			id_produto: req.body.id_produto,
			id_usuario: req.id,
			status_de_compra: 0
		}
	}).then(usuario => {
		if (usuario) {
			res.status(299).send({
				message: "Produto ja foi adicionado ao carrinho!"
			});
			return;
		}
		next();
	});
};

const verifyItemCart = {
	checkDuplicateItem: checkDuplicateItem
};
module.exports = verifyItemCart;