import axios from 'axios';
import UserModel from '@/models/user.model';
import StorageUtils from '@/utils/StorageUtils';

export default class AuthService {
    static async login(credential) {
        const development = !!process.env.VUE_APP_DEVELOPMENT_MODE;
        if (!credential) {
            throw new Error('Um erro ocorreu ao tentar fazer login. Entre em contato com o suporte.');
        }
        return axios
            .post('/Professor/loginProfessor', {
                login: credential.login,
                password: credential.password,
            })
            .then((response) => {
                const { data } = response;
                if (!data.token && !development) {
                    throw new Error('Um erro ocorreu ao tentar fazer login.');
                }
                const user = new UserModel(data);
                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('TOKEN', data.token);
                return user;
            })
            .catch((error) => {
                if (error && error.message && error.message === 'Network Error') {
                    throw new Error('Não foi possível estabelecer a conexão com o servidor.');
                }
                console.error(error);
                throw new Error('Não foi possível realizar o login, entre em contato com o suporte!');
            });
    }

    static logout() {
        sessionStorage.removeItem('user');
        StorageUtils.clearToken();
    }

    static isLoggedIn() {
        if (StorageUtils.getToken() !== null) {
            return true;
        }
        const user = StorageUtils.getCurrentUser();
        return user != null && user.token !== null;
    }
}
