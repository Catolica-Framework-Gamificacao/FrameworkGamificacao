export default class Student {
    constructor(model) {
        this.id = model?.id;
        this.ra = model?.ra;
        this.name = model?.name;
        this.showOnRanking = model?.showOnRanking;
        this.class = model?.class;
        this.points = model?.points;
    }
}
