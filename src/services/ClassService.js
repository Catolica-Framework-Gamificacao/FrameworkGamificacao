export default class ClassService {
    PATH = '/turmas';

    static prepare(clazz) {
        return clazz;
    }

    static async loadData() {
        // ! Fake data
        return [
            {
                id: 0,
                name: 'Turma 01',
                subject: 'Qualidade de Software',
                studentsAmount: 16,
            },
            {
                id: 1,
                name: 'Turma 02',
                subject: 'IOT',
                studentsAmount: 23,
            },
            {
                id: 2,
                name: 'Turma 03',
                subject: 'Machine Learning',
                studentsAmount: 11,
            },
            {
                id: 3,
                name: 'Turma 04',
                subject: 'Programação orientada à Objetos',
                studentsAmount: 25,
            },
            {
                id: 4,
                name: 'Turma 05',
                subject: 'Gerência de Software',
                studentsAmount: 12,
            },
            {
                id: 5,
                name: 'Turma 06',
                subject: 'Segurança da informação',
                studentsAmount: 14,
            },
        ];
    }
}
