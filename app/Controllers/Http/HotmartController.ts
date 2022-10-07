import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import StringHelper from 'App/Helpers/StringHelper';
import AxiosCommonRequest from 'App/Services/AxiosCommonRequest';
import HotmartService from 'App/Services/HotmartService';
import UsersService from 'App/Services/UsersService';
const usersService = new UsersService;
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
        
        if (!email) ctx.response.send({ "error": "O email não foi informado!"});
        
        if (!StringHelper.validateEmail(email)) return ctx.response.send({ "error": "O email informado é inválido!" });

        try {
            
            const hotmartCheckEmail = await HotmartService.checkEmail(email);
            
            if (!hotmartCheckEmail.success) {
                return ctx.response.send({ success: false, data: `Houve um erro ao processar o email informado. Erro: ${hotmartCheckEmail.data}` });
            }

            // Verificar a existência de senha de sistema cadastrada;
            const userCheck = await usersService.checkEmail(email);
            return ctx.response.send({ data: userCheck });

        } catch (error) {
            //TODO: enviar erros para plataforma de tratativa de erros, ou escrever em um arquivo de log
            console.log(error);
        }

    }

    public async storePass(ctx: HttpContextContract) {

        const email = ctx.request.input('email');
        if (!email) return ctx.response.send({ "error": "O email não foi informado!" });
        
        const name = ctx.request.input('name');
        if (!name) return ctx.response.send({ "error": "O nome não foi informado!" });

        const password = ctx.request.input('password');
        const passwordConfirmation = ctx.request.input('password-confirmation');

        if (!password) return ctx.response.send({ "error": "É obrigatório informar a senha!" });
        if (!passwordConfirmation) return ctx.response.send({ "error": "É obrigatório confirmar a senha!" });
        if (password !== passwordConfirmation) return ctx.response.send({ "error": "As senhas não conferem!" });
        if (!StringHelper.checkSpecialChars(password)) return ctx.response.send({ "error": "A senha precisa conter pelo menos um caracter especial!" });
        
        const payload = {
            name,
            email,
            password
        }

        try {            
            const createdPassword = await usersService.storePass(payload);
            return ctx.response.send({ data: createdPassword ? "Senha registrada com sucesso! Você pode fazer o login agora." : "Houve um erro ao tentar cadastrar a sua senha."  });
            
        } catch (error) {
            console.log(error);
        }
    }

    public async login(ctx: HttpContextContract) {
        const email = ctx.request.input('email');
        const password = ctx.request.input('password');
        if (!email) return ctx.response.send({ "error": "O email não foi informado!" });
        if (!password) return ctx.response.send({ "error": "A senha não foi informada!" });

        if (!StringHelper.validateEmail(email)) return ctx.response.send({ "error": "O email informado é inválido!" });
        const hotmartCheckEmail = await HotmartService.checkEmail(email);

        if (!hotmartCheckEmail.success) {
            return ctx.response.send({ success: false, data: `${hotmartCheckEmail.data}` });
        }

        const loginUser = await usersService.login({ email, password });
        return ctx.response.send({ data: loginUser });
    }

}