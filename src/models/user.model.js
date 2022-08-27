export default class User {
    constructor(model) {
        this.name = model.nomeProfessor;
        this.username = model.usuario;
        this.email = model.email;
        this.password = model.senha;
        this.token = model.token;
    }
}
