const express = require('express')
const routerCategorias = express.Router()
const DAOCategorias = require('../database/DAOCategorias')
const autorizacao = require('../autorizacao/autorizacao')

routerCategorias.get("/categorias/novo", autorizacao, function (req, res) {
    res.render("categorias/novo", { mensagem: "" });
});

routerCategorias.post("/categorias/salvar", autorizacao, function (req, res) {
    let descricao = req.body.descricao;
    DAOCategorias.insert(descricao).then(inserido => {
        if (inserido)
            res.render("categorias/novo", { mensagem: "Categoria incluída." })
        else
            res.render("erro", { mensagem: "Não foi possível incluir a categoria." })
    })
})

routerCategorias.post("/categorias/atualizar", autorizacao, function (req, res) {
    let { id, descricao } = req.body
    DAOCategorias.update(id, descricao).then(categorias => {
        if (categorias)
            res.redirect("/categorias/lista");
        else
            res.render("erro", { mensagem: "Erro na tentativa de atualização da categoria." })
    })
})

routerCategorias.get("/categorias/excluir/:id", autorizacao, function (req, res) {
    let id = req.params.id;
    DAOCategorias.delete(id).then(excluido => {
        switch(excluido){
            case 0:
                res.redirect("/categorias/lista")
                break
            case 1:
                res.redirect("/categorias/lista/categoria_utilizada")
                break
            case 2:
                res.render("erro", { mensagem: "Não foi possível excluir a categoria." })
        }
    })
})

routerCategorias.get("/categorias/editar/:id", autorizacao, function (req, res) {
    let id = req.params.id
    DAOCategorias.getOne(id).then(categoria => {
        if (categoria)
            res.render("categorias/editar", { categoria: categoria })
        else
            res.render("erro", { mensagem: "Erro na tentativa de edição da categoria." })
    })
})

routerCategorias.get("/categorias/lista/:mensagem?", autorizacao, function (req, res) {
    DAOCategorias.getAll().then(categorias => {
        if (categorias)
            res.render("categorias/categorias", 
            { categorias: categorias, 
                mensagem: req.params.mensagem?"Não é possível excluir uma categoria já referenciada por um contato." :""});
        else
            res.render("erro", { mensagem: "Erro na listagem de categorias." })
    })

})

module.exports = routerCategorias


