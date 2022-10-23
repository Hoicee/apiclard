module.exports = (sequelize, Sequelize) => {
	const ItensCarrinho = sequelize.define("itensCarrinho", {
		
		id_usuario:			{allowNull: false, type: Sequelize.INTEGER}
	,	id_produto:			{allowNull: false, type: Sequelize.INTEGER}
	,	nome_produto:		{allowNull: false, type: Sequelize.STRING(24)}
	,	quantidade:			{allowNull: false, type: Sequelize.INTEGER}
	,	valor_unitario:		{allowNull: false, type: Sequelize.DOUBLE}
	,	status_de_compra:	{allowNull: false, type: Sequelize.INTEGER}
	
	},

	{	

		freezeTableName: true
	,	createdAt: 		false
	,	updatedAt: 		false 
	
	}

	);

	return ItensCarrinho;
};