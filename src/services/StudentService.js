import axios from 'axios';
import _ from 'lodash';

export default class StudentService {
    CONTROLLER_PATH = '/Aluno';

    static prepare(student) {
        return student;
    }

    static async loadData() {
        let students = [];
        const service = this;

        students = await axios
            .get('/Aluno/getAlunos')
            .then((response) => {
                students = response.data;
                if (students.length === 0 || !_.isArray(students)) {
                    return [];
                }

                students.forEach((student) => service.prepare(student));

                return students;
            })
            .catch((error) => {
                if (error && error.message) {
                    console.error(error.message);
                }
                return [];
            });

        return students;
    }

    static async create(model) {
        let student = model;
        const service = this;

        student = await axios
            .post('/Aluno/saveAluno', model)
            .then((response) => {
                student = response.data;
                if (student.length === 0 || !_.isArray(student)) {
                    return undefined;
                }

                return service.prepare(student);
            })
            .catch((error) => {
                if (error && error.message) {
                    console.error(error.message);
                }
                return undefined;
            });

        return model;
    }

    static async remove(studentId) {
        let affecteds = await axios
            .delete(`/Aluno/deleteAluno/${studentId}`)
            .then((response) => {
                affecteds = response.data;
                console.log(affecteds);
                return affecteds;
            })
            .catch((error) => {
                if (error && error.message) {
                    console.error(error.message);
                }
            });
        return affecteds !== null;
    }

    static async update(student) {
        return student;
    }
}
