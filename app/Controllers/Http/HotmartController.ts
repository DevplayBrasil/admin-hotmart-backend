import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import HotmartService from 'App/Services/Hotmart';
import AxiosCommonRequest from 'App/Services/AxiosCommonRequest';

export default class HotmartController {

    public async index(ctx: HttpContextContract) {

        try {
            await AxiosCommonRequest.doRequest('https://developers.hotmart.com/club/api/v1/users?subdomain=devplaybrasil');
        } catch (error) {
            this.index(ctx);
        }                
    
    }


    public async checkEmail(ctx: HttpContextContract){

        const email = ctx.request.param('email');
        // const email = ctx.params.email;
        
        if (!email) {
            ctx.response.send({ "error": "O email não foi informado!"});
        }

        try {
            const getByEmail = await AxiosCommonRequest.doRequest(`https://developers.hotmart.com/club/api/v1/users?subdomain=devplaybrasil&email=${email}`);
                        
            if (!Object.keys(getByEmail.items).length){
                return ctx.response.send({ data: "Atenção! Email não encontrado na base de dados da Hotmart! Verifique o email informado e tente novamente." }); 
            }

            if (getByEmail.items[0].status !== "ACTIVE") {                
                return ctx.response.send({ data: "Atenção! O seu cadastro encontra-se INATIVO. Favor entrar em contato com o produtor do seu curso." }); 
            }

            // Verificar a existência de senha de sistema cadastrada;

            return ctx.response.send({ data: "Email encontrado e válido na plataforma" });
        } catch (error) {
            console.log(error);
        }


    }
}
