const express		= require("express");
const bodyParser	= require("body-parser");
const cors			= require("cors");
const app			= express();
const PORT			= process.env.PORT || 9001;

var corsOptions = {
	origin: "*"
};
app.use(cors(corsOptions));

// requisição do content-type = application/json
app.use(bodyParser.json());

// requisição do content-type = application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/productsImg", express.static("app/public/upload/productsImg/"));

// rota incial
app.get("/", (req, res) => {
	res.json({ message: "Seja bem vindo ao projeto!" });
});

app.listen(PORT, () => {
	console.log(`Servidor sendo executado na porta: ${PORT}.`);
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/products.routes')(app);
require('./app/routes/cart.routes')(app);
require('./app/routes/address.routes')(app);
require('./app/routes/venda.routes')(app);
require('./app/routes/comment.routes')(app);

const db = require("./app/models");


/*
db.sequelize.sync({force: true}).then(() => { // O force faz com que os dados sejam apagados e sincronizados novamente, em produção retire esse comando e insira manualmente *** SOMENTE PARA AMBIENTE DE TESTE
	console.log('Dropar e resincronizar o Banco de Dados!');
});
*/
