export default class User {
    constructor(model) {
        this.name = model.name;
        this.username = model.name;
        this.email = model.email;
        this.password = model.password;
        this.token = model.token;
        this.type = {
            userId: model.type.userId,
            type: model.type.userType,
        };
    }
}
