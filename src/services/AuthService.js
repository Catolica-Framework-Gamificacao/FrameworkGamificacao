import axios from 'axios';
import UserModel from '@/models/user.model';
import StorageUtils from '@/utils/StorageUtils';

export default class AuthService {
    static async login(credential) {
        if (!credential) {
            throw new Error('Um erro ocorreu ao tentar fazer login. Entre em contato com o suporte.');
        }
        return axios
            .post('/auth/login', {
                login: credential.login,
                password: credential.password,
            })
            .then((response) => {
                const { user } = response.data;
                if (!user || !user.token) {
                    throw new Error({
                        response: {
                            error: 'Um erro ocorreu ao tentar fazer login.',
                        },
                    });
                }
                const model = new UserModel(user);
                sessionStorage.setItem('user', JSON.stringify(model));
                sessionStorage.setItem('TOKEN', model.token);
                return user;
            })
            .catch((error) => {
                if (error && error.message && error.message === 'Network Error') {
                    throw new Error('Não foi possível estabelecer a conexão com o servidor.');
                }
                const response = error.response.data;
                console.error(response);
                throw new Error(response.error);
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
