module.exports = (sequelize, Sequelize) => {
	const Endereco = sequelize.define("endereco", {
		
		id_usuario:		{allowNull: false, type: Sequelize.INTEGER}
	,	nome:			{allowNull: false, type: Sequelize.STRING(12)}
	,	cep:			{allowNull: false, type: Sequelize.STRING(9)}
	,	num:			{allowNull: false, type: Sequelize.INTEGER}
	,	status:			{allowNull: false, type: Sequelize.STRING(30)}
	
	},
	{	

		freezeTableName: true
	,	createdAt: 		false
	,	updatedAt: 		false 
	
	}
	);

	return Endereco;
};