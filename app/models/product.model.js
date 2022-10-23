module.exports = (sequelize, Sequelize) => {
	const Produto = sequelize.define("produto", {
		
		nome_produto:	{allowNull: false, type: Sequelize.STRING(24)}
	,	descricao:		{allowNull: false, type: Sequelize.STRING(100)}
	,	estoque:		{allowNull: false, type: Sequelize.INTEGER}
	, 	categoria:		{allowNull: false, type: Sequelize.STRING(24)}
	,	valor:			{allowNull: false, type: Sequelize.DOUBLE}
	,	status:			{allowNull: false, type: Sequelize.STRING(40)}
	
	},
	{ 	
		
		freezeTableName: true
	,	createdAt: 		false
	,	updatedAt: 		false 

	}
	);

	return Produto;
};