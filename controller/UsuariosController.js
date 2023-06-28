const express = require('express')
const bcrypt = require('bcryptjs');
const routerUsuarios = express.Router()
const DAOUsuarios = require('../database/DAOUsuarios')

routerUsuarios.get("/", (req, res) => {
    res.render("login", { mensagem: "" })
})

routerUsuarios.get("/index", (req, res) => {
    res.render("index", { usuario: req.session.usuario.nome })
})

routerUsuarios.post("/login", function (req, res) {
    let { email, senha } = req.body
    DAOUsuarios.login(email, senha).then(usuario => {
        if (usuario != undefined) {
            if (bcrypt.compareSync(req.body.senha, usuario.senha)) {
                req.session.usuario = { id: usuario.id, nome: usuario.nome, email: usuario.email }
                res.redirect("/index");
            }
            else {
                res.render("login", { mensagem: "Usuário ou senha inválidos." })
            }
        }
        else
            res.render("login", { mensagem: "Usuário ou senha inválidos." })
    })
})

routerUsuarios.get("/logout", function (req, res) {
    req.session.usuario = undefined
    res.redirect("/")
});

routerUsuarios.get("/usuarios/novo", function (req, res) {
    res.render("usuarios")
});

routerUsuarios.post("/usuarios/salvar", function (req, res) {
    let { nome, email, senha } = req.body,
        salt = bcrypt.genSaltSync(10)
    senha = bcrypt.hashSync(senha, salt)
    if (DAOUsuarios.insert(nome, email, senha))
        res.render("login", { mensagem: "Usuário cadastrado." })
    else
        res.render("erro", { mensagem: "Não foi possível cadastrar o usuário." })
});

module.exports = routerUsuarios

