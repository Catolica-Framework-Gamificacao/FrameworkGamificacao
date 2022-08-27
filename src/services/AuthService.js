import axios from 'axios';
import StorageUtils from '../utils/StorageUtils';

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
                sessionStorage.setItem('user', JSON.stringify(data));
                sessionStorage.setItem('TOKEN', data.token);
                return data;
            })
            .catch((error) => {
                if (error && error.message && error.message === 'Network Error') {
                    throw new Error('Não foi possível estabelecer a conexão com o servidor.');
                }
                throw error;
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
