const Contatos = require('../model/Contatos')
const Categorias = require('../model/Categorias')

class DAOContatos{

    static async insert(nome, email, nascimento, categoria){
        try{
            await Contatos.create({nome: nome, email: email, nascimento: nascimento, categoriaId: categoria})
            return true
        }
        catch(error){
            console.log(error.toString())
            return false
        }
    }

    static async update(id, nome, email, nascimento, categoria){
        try{
           await Contatos .update({nome: nome, email: email, nascimento: nascimento, categoriaId: categoria}, { where: { id: id } })
           return true
        }
        catch(error){
            console.log(error.toString())
            return false
        }

    }

    static async delete(id){
        try{
             await Contatos.destroy({ where: { id: id } })
             return true
        }
        catch(error){
            console.log(error.toString())
            return false
        }
    }

    static async getAll(){
        try{
            let contatos = await Contatos.findAll({order: ['nome'],  include: [{ model: Categorias }] })
            return contatos
        }
        catch(error){
            console.log(error.toString())
            return undefined
        }
    }

    static async getOne(id){
       try{
            let contato = Contatos.findByPk(id)
            return contato
       }
       catch(error){
            console.log(error.toString())
            return undefined
       }
    }
    
}

module.exports = DAOContatos
