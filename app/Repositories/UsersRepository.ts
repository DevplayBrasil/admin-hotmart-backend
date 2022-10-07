

import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { User } from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersRepository {

    public async getUserByEmail(email: string) {

        const users = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        return users;
    }

    public async createUser(data: User){

        try {

            const findUserByEmail = await this.getUserByEmail(data.email);
            
            if (!findUserByEmail) {
                
                const safePassword = await Hash.make(data.password)

                await prisma.user.create({
                    data: {
                        email: data.email,
                        password: safePassword,
                        name: data.name!
                    }
                });

            } else {
                return false;
            }
            

        } catch (error) {
            console.log(error);
            return false;
        }

        return true

    }

    public async login(data:User){
        const retorno = {
            success: false,
            msg: ""
        
        };
        try {
            
            const findUserByEmail = await this.getUserByEmail(data.email);

            if (findUserByEmail) {
                
                const verifyPass = await Hash.verify(findUserByEmail.password, data.password);
                
                if (!verifyPass) {
                    retorno.msg = "A senha informada não confere.";
                } else {
                    retorno.success = true;
                    retorno.msg = "Credenciais válidas!";
                }


            } else {
                retorno.msg = "Email não encontrado no sistema";
            }
            
        } catch (error) {
            console.log(error);
            retorno.msg = "Erro";
        }

        return retorno;
    }
    
}