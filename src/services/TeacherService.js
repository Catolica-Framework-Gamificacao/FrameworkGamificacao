import axios from 'axios';
import _ from 'lodash';

export default class TeacherService {
    CONTROLLER_PATH = '/Professor';

    static prepare(teacher) {
        return teacher;
    }

    static async loadData() {
        let teachers = [];
        const service = this;

        teachers = await axios
            .get('/Professor/getProfessores')
            .then((response) => {
                teachers = response.data;
                if (teachers.length === 0 || !_.isArray(teachers)) {
                    return [];
                }

                teachers.forEach((teacher) => service.prepare(teacher));

                return teachers;
            })
            .catch((error) => {
                if (error && error.message) {
                    console.error(error.message);
                }
                return [];
            });

        return teachers;
    }
}
