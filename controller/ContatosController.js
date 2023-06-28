const express = require('express')
const routerContatos = express.Router()
const DAOContatos = require('../database/DAOContatos')
const DAOCategorias = require('../database/DAOCategorias')
const autorizacao = require('../autorizacao/autorizacao')

routerContatos.get("/contatos/novo/:mensagem?", autorizacao, function (req, res) {
    DAOCategorias.getAll().then(categorias => {
        if (req.params.mensagem)
            res.render("contatos/novo", { mensagem: "Contato incluído.", categorias: categorias })
        else
            if (categorias)
                res.render("contatos/novo", { mensagem: "", categorias: categorias })
            else
                res.redirect('/contatos/lista/categorias_vazias')
    })
    //res.render("contatos/novo", { mensagem: "" })
})

routerContatos.post("/contatos/salvar", autorizacao, function (req, res) {
    let { nome, email, nascimento, categoria } = req.body
    DAOContatos.insert(nome, email, nascimento, categoria).then(inserido => {
        DAOCategorias.getAll().then(categorias => {
            if (inserido)
                res.render("contatos/novo", { mensagem: "Contato incluido.", categorias: categorias })
            else
                res.render("erro", { mensagem: "Não foi possível incluir o contato." })
        })
    })
})

routerContatos.post("/contatos/atualizar", autorizacao, function (req, res) {
    let { id, nome, email, nascimento, categoria } = req.body
    DAOContatos.update(id, nome, email, nascimento, categoria).then(atualizado => {
        if (atualizado)
            res.redirect("/contatos/lista")
        else
            res.render("erro", { mensagem: "Erro na tentativa de atualização do contato.." })
    })
})

routerContatos.get("/contatos/excluir/:id", autorizacao, function (req, res) {
    let id = req.params.id;
    DAOContatos.delete(id).then(excluido => {
        if (excluido)
            res.redirect("/contatos/lista")
        else
            res.render("erro", { mensagem: "Não foi possível excluir o contato." })
    })
})

routerContatos.get("/contatos/editar/:id", autorizacao, function (req, res) {
    let id = req.params.id
    DAOContatos.getOne(id).then(contato => {
        DAOCategorias.getAll().then(categorias => {
            if (contato)
                res.render("contatos/editar", { contato: contato, categorias: categorias })
            else
                res.render("erro", { mensagem: "Erro na tentativa de edição do contato." })
        })
    })
})

routerContatos.get("/contatos/lista/:mensagem?", autorizacao, function (req, res) {
    DAOContatos.getAll().then(contatos => {
        console.log("há " + contatos.length + " contatos.")
        if (contatos)
            res.render("contatos/contatos", { contatos: contatos, mensagem: "" })
        else
            res.render("erro", { mensagem: "Erro na listagem dos contatos." })
    })
})

module.exports = routerContatos



