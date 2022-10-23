module.exports = (sequelize, Sequelize) => {
	const Comment = sequelize.define("comment", {
		
		id_usuario:		{allowNull: false, type: Sequelize.INTEGER}
	,	id_produto:		{allowNull: false, type: Sequelize.INTEGER}
	,	comentario:		{allowNull: false, type: Sequelize.STRING(150)}
	
	},
	{	

		freezeTableName: true
	,	createdAt: 		false
	,	updatedAt: 		false 
	
	}
	);

	return Comment;
};