module.exports = (sequelize, Sequelize) => {
	const Usuario = sequelize.define("usuario", {
		
		nome_completo:	{allowNull: false, type: Sequelize.STRING(60)}
	,	email:			{allowNull: false, type: Sequelize.STRING(100)}
	,	senha:			{allowNull: false, type: Sequelize.STRING}
	
	},
	{
		createdAt: 		false
	,	updatedAt: 		false 
	}
	);

	return Usuario;
};
