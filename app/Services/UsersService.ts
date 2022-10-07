import { User } from "App/Models/User";
import UsersRepository from "App/Repositories/UsersRepository";
const usersRepository = new UsersRepository;

export default class UsersService {
    
    public async checkEmail(email: string) {
        
        const getUserByEmail = await usersRepository.getUserByEmail(email);
        return getUserByEmail;

    }

    public async storePass(data: User){
        
        const storeUserInformation = await usersRepository.createUser(data);
        return storeUserInformation;
    }

    public async login(data: User) {
        const loginUser = await usersRepository.login(data);
        return loginUser;
    }

}