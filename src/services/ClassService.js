import _ from 'lodash';
import Class from '../models/class.model';

export default class ClassService {
    PATH = '/turmas';

    static prepare(clazz) {
        return new Class(clazz);
    }

    static async loadData() {
        const data = [];
        // ! Fake data
        // const def = [
        //     {
        //         id: 0,
        //         name: 'Turma 01',
        //         subject: 'Qualidade de Software',
        //         studentsAmount: 16,
        //     },
        //     {
        //         id: 1,
        //         name: 'Turma 02',
        //         subject: 'IOT',
        //         studentsAmount: 23,
        //     },
        //     {
        //         id: 2,
        //         name: 'Turma 03',
        //         subject: 'Machine Learning',
        //         studentsAmount: 11,
        //     },
        //     {
        //         id: 3,
        //         name: 'Turma 04',
        //         subject: 'Programação orientada à Objetos',
        //         studentsAmount: 25,
        //     },
        //     {
        //         id: 4,
        //         name: 'Turma 05',
        //         subject: 'Gerência de Software',
        //         studentsAmount: 12,
        //     },
        //     {
        //         id: 5,
        //         name: 'Turma 06',
        //         subject: 'Segurança da informação',
        //         studentsAmount: 14,
        //     },
        // ];

        const classes = JSON.parse(localStorage.getItem('classes'));

        if (classes) {
            classes.forEach((clazz) => {
                data.push(new Class(clazz));
            });
        }

        return data;
    }

    static getAllFromStorage() {
        const classes = JSON.parse(localStorage.getItem('classes'));
        return classes || [];
    }

    static findByUid(list, uid) {
        if (!list) return undefined;
        const index = _.findIndex(list, (row) => row.uid === uid);
        if (index !== -1) {
            return { data: list[index], index };
        }
        return undefined;
    }

    static async create(data) {
        const service = this;
        const clazz = service.prepare(data);
        let classes = JSON.parse(localStorage.getItem('classes'));
        if (!classes) classes = [];
        classes.push(clazz);
        localStorage.setItem('classes', JSON.stringify(classes));

        return clazz;
    }

    static async update(data) {
        const service = this;
        const clazz = service.prepare(data);
        const { uid } = clazz;
        const classes = this.getAllFromStorage();
        const existing = this.findByUid(classes, uid);

        if (existing) {
            classes[existing.index] = existing.data;
        }

        localStorage.setItem('classes', JSON.stringify(classes));

        return clazz;
    }
}
