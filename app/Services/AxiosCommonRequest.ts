
import axios from 'axios'
import HotmartService from 'App/Services/Hotmart';

export default class AxiosCommonRequest {

    public static async doRequest(url) {
        const token = await HotmartService.getToken();
        const config = {
            method: 'get',
            // url: 'https://developers.hotmart.com/club/api/v1/users?subdomain=aprendaintegrarcomohotmart',
            url,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        let result:any = {};

        await axios(config)
            .then((response) => {
                result = response.data;
            }).catch(async (error) => {
                console.log(error.response.data);
                const error_message = error.response.data.error;
                const can_generate_new_token = [
                    'token_expired',
                    'invalid_token'
                ];

                if (can_generate_new_token.includes(error_message)) {
                    console.log("💇‍♀️ Gerando uma nova token!");
                    await HotmartService.generateToken();
                    console.log("💇‍♀️ Chamando a função novamente, porém com a nova token gerada!");
                }

            });
        
        return result;
    }
}