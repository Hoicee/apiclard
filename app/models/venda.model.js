module.exports = (sequelize, Sequelize) => {
	const Venda = sequelize.define("venda", {
		
		id_usuario:			{allowNull: false, type: Sequelize.INTEGER}
	,	id_endereco:		{allowNull: false, type: Sequelize.INTEGER}
	,	forma_pgto:			{allowNull: false, type: Sequelize.STRING(15)}
	,	valor_total:		{allowNull: false, type: Sequelize.DOUBLE}
	,	status_entrega:		{allowNull: false, type: Sequelize.STRING(20)}
	
	},

	{	
		freezeTableName: true
	,	createdAt: 		false
	,	updatedAt: 		false 
	}

	);

	return Venda;
};