import axios from 'axios';
import _ from 'lodash';

export default class DiciplineService {
    CONTROLLER_PATH = '/Disciplina';

    static prepare(dicipline) {
        return dicipline;
    }

    static async loadData() {
        let diciplines = [];
        const service = this;

        diciplines = await axios
            .get('/Disciplina/getDisciplinas')
            .then((response) => {
                diciplines = response.data;
                if (diciplines.length === 0 || !_.isArray(diciplines)) {
                    return [];
                }

                diciplines.forEach((dicipline) => service.prepare(dicipline));

                return diciplines;
            })
            .catch((error) => {
                if (error && error.message) {
                    console.error(error.message);
                }
                return [];
            });

        return diciplines;
    }

    static async create(model) {
        let dicipline;
        const service = this;

        dicipline = await axios
            .post('/Disciplina/saveDisciplina', model)
            .then((response) => {
                dicipline = response.data;
                if (dicipline.length === 0 || !_.isArray(dicipline)) {
                    return undefined;
                }

                return service.prepare(dicipline);
            })
            .catch((error) => {
                if (error && error.message) {
                    console.error(error.message);
                }
                return undefined;
            });

        return dicipline;
    }

    static async remove(diciplineId) {
        let affecteds = await axios
            .delete(`/Disciplina/deleteDisciplina/${diciplineId}`)
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

    static async update(dicipline) {
        return dicipline;
    }
}
