export default class StorageUtils {
    static getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('user'));
    }

    static getLastLogin() {
        return localStorage.getItem('LAST_LOGIN');
    }

    static getToken() {
        return sessionStorage.getItem('TOKEN');
    }

    static clearToken() {
        sessionStorage.removeItem('TOKEN');
    }
}
