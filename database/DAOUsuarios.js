const Usuarios = require( '../model/Usuarios')
const bcrypt = require('bcryptjs')

class DAOUsuarios {

   static async insert(nome, email, senha){
        try{
            await Usuarios.create({ nome: nome, email: email, senha: senha })
            return true
        }
        catch(error){
            console.log(error.toString())
            return false
        }
   }

    static async login(email, senha){
        try{
            let usuario = await Usuarios.findOne({ where: { email: email }})
            if(usuario)
                if (bcrypt.compareSync(senha, usuario.senha)) {             
                    return usuario
                }
            return undefined
        }
        catch(error){
            console.log(error.toString())
            return undefined
        }
    }
}

 module.exports = DAOUsuarios