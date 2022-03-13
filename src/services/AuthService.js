import axios from 'axios';

export default class AuthService {
    PATH = '/auth';

    static async login(user) {
        return axios
            .post(`${this.PATH}/login`, {
                login: user.login,
                password: user.password,
            })
            .then((response) => {
                const { data } = response;
                if (data.token) {
                    localStorage.setItem('user', JSON.stringify(data));
                }
                return data;
            });
    }

    static logout() {
        localStorage.removeItem('user');
    }

    static async register(user) {
        return axios.post(`${this.PATH}/register`, {
            username: user.username,
            password: user.password,
        });
    }
}
