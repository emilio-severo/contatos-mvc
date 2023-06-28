const express = require('express');
const session = require('express-session');
const usuariosController = require('./controller/UsuariosController')
const categoriasController = require('./controller/CategoriasController')
const contatosController = require('./controller/ContatosController')
const conexao = require('./database/conexao');

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(session({ secret: "Um%55kjds", resave: true, saveUninitialized: true }));
app.use(usuariosController)
app.use(categoriasController)
app.use(contatosController)

conexao.authenticate();

app.listen(3000, () =>{
    console.log('Aplicação rodando...')
})

