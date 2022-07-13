import axios from 'axios';
import StorageUtils from '../utils/StorageUtils';

const PATH = '/auth';

export default class AuthService {
    static async login(credential) {
        if (!credential) {
            throw new Error('Um erro ocorreu ao tentar fazer login. Por favor, tente novamente.');
        }
        return axios
            .post(`${PATH}/login`, {
                login: credential.login,
                password: credential.password,
            })
            .then((response) => {
                const { data } = response;
                if (!data.token) {
                    throw new Error('Um erro ocorreu ao tentar fazer login.');
                }
                sessionStorage.setItem('user', JSON.stringify(data));
                sessionStorage.setItem('TOKEN', data.token);
                return data;
            })
            .catch((error) => {
                if (error && error.message && error.message === 'Network Error') {
                    console.error('Não foi possível estabelecer a conexão com o servidor.');
                }
                throw error;
            });
    }

    static logout() {
        sessionStorage.removeItem('user');
        StorageUtils.clearToken();
        this.$router.push('/login');
    }

    static isLoggedIn() {
        if (StorageUtils.getToken() !== null) {
            return true;
        }
        const user = StorageUtils.getCurrentUser();
        return user != null && user.token !== null;
    }
}
