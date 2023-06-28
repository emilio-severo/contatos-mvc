const Sequelize = require('sequelize')
const Categorias = require('../model/Categorias')

class DAOCategorias{

    static async insert(descricao){
        try{
            await Categorias.create({descricao: descricao})
            return true
        }
        catch(error){
            console.log(error.toString())
            return false
        }
    }

    static async update(id, descricao){
        try{
           await Categorias .update({ descricao: descricao }, { where: { id: id } })
           return true
        }
        catch(error){
            console.log(error.toString())
            return false
        }

    }

    static async delete(id){
        try{
             await Categorias.destroy({ where: { id: id } })
             return 0
        }
        catch(error){
            if (error instanceof Sequelize.ForeignKeyConstraintError) 
                return 1
            else
                return 2
        }
    }

    static async getAll(){
        try{
            let categorias = await Categorias.findAll({order: ['descricao']})
            return categorias
        }
        catch(error){
            console.log(error.toString())
            return undefined
        }
    }

    static async getOne(id){
       try{
            let categoria = await Categorias.findByPk(id)
            return categoria
       }
       catch(error){
            console.log(error.toString())
            return undefined
       }
    }
    
}

module.exports = DAOCategorias

