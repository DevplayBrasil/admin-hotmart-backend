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

            console.log("aqui", await AxiosCommonRequest.doRequest(`https://developers.hotmart.com/club/api/v1/users?subdomain=devplaybrasil&email=${email}`));
            // ctx.response.send({ data: res });
        } catch (error) {
            console.log(error.response.data);
        }


    }
}
