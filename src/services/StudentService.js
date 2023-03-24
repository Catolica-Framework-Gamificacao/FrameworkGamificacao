import axios from 'axios';
import _ from 'lodash';
import Helper from '@/utils/Helper';
import StudentUtils from '@/utils/StudentUtils';

const CONTROLLER_PATH = '/Aluno';

export default class StudentService {
    static prepare(student) {
        return student;
    }

    static async loadData() {
        let students = [];
        const service = this;
        if (Helper.developmentWorkspace()) {
            return new Promise((resolve) => {
                resolve(StudentUtils.loadFakeStudentsList());
            });
        }
        try {
            const response = await axios.get(`/${CONTROLLER_PATH}/getAlunos`);
            students = response.data;
            if (!students || students.length === 0 || !_.isArray(students)) {
                return [];
            }
            students.forEach((student) => service.prepare(student));
        } catch (error) {
            console.error(error);
            return [];
        }

        return students;
    }

    static async create(model) {
        let student = null;
        const service = this;

        try {
            const response = await axios.post(`/${CONTROLLER_PATH}/saveAluno`, model);
            if (response.data === null || response.data === undefined) {
                throw new Error('Error: Null Response');
            }
            student = service.prepare(response.data);
        } catch (error) {
            console.error(error);
            throw new Error('Não foi possível cadastrar o aluno, entre em contato com o suporte!');
        }

        return student;
    }

    static async remove(id) {
        let deleted = false;
        try {
            const response = await axios.delete(`/${CONTROLLER_PATH}/deleteAluno/${id}`);
            const affecteds = response.data;
            deleted = affecteds !== null;
        } catch (error) {
            console.error(error);
        }
        return deleted;
    }

    static async update(student) {
        return student;
    }
}
