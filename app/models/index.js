const config		= require("../config/db.config.js");
const Sequelize		= require("sequelize");
const sequelize		= new Sequelize(
	config.DB
,	config.USER
,	config.PASSWORD
,	{
		host:				config.HOST
	,	dialect:			config.dialect
	,	operatorsAliases:	0
	,	pool: {
			max:		config.pool.max
		,	min:		config.pool.min
		,	acquire:	config.pool.acquire
		,	idle:		config.pool.idle
		}
	}
);
const db = {};
db.Sequelize	= Sequelize;
db.sequelize	= sequelize;
db.usuario		= require("../models/user.model.js")(sequelize, Sequelize);
db.produto		= require("../models/product.model.js")(sequelize, Sequelize);
db.itensCarrinho= require("../models/cart.model.js")(sequelize, Sequelize);
db.endereco		= require("../models/address.model.js")(sequelize, Sequelize);
db.venda		= require("../models/venda.model.js")(sequelize, Sequelize);
db.comment		= require("../models/comment.model.js")(sequelize, Sequelize);
module.exports	= db;
