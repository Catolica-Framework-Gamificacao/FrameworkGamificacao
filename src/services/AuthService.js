import axios from 'axios';
import UserModel from '@/models/user.model';
import StorageUtils from '@/utils/StorageUtils';
import Helper from '@/utils/Helper';
import FormularyUtils from '@/utils/FormularyUtils';

export default class AuthService {
    static async login(credential) {
        const service = this;
        const development = Helper.developmentMode();
        if (!service.isCredentialValid(credential)) {
            throw new Error('Credenciais inválidas, informe-as corretamente.');
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

    static isCredentialValid(credential) {
        if (!credential) {
            return false;
        }
        if (!credential.login || !credential.password) {
            return false;
        }
        return FormularyUtils.emailIsValid(credential.login);
    }
}
