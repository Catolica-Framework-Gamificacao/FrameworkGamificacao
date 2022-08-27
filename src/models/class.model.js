import Helper from '../utils/Helper';

export default class Class {
    constructor(model) {
        this.uid = !model?.uid ? Helper.generateUid() : model?.uid;
        this.name = model?.name;
        this.subject = model?.subject;
        this.students = !model?.students ? [] : model?.students;
        this.studentsAmount = model?.studentsAmount;
        this.discipline = model?.discipline;
    }
}
