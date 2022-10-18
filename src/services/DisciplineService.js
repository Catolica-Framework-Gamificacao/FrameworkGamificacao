import axios from 'axios';
import _ from 'lodash';

const CONTROLLER_PATH = '/Disciplina';
export default class DiciplineService {
    static prepare(dicipline) {
        return dicipline;
    }

    static async loadData() {
        let disciplines = [];
        const service = this;

        try {
            const response = await axios.get(`/${CONTROLLER_PATH}/getDisciplinas`);
            disciplines = response.data;
            if (!disciplines || disciplines.length === 0 || !_.isArray(disciplines)) {
                return [];
            }

            disciplines.forEach((dicipline) => service.prepare(dicipline));
        } catch (error) {
            console.error(error);
            throw new Error('Não foi possível buscar a listagem de disciplinas, entre em contato com o suporte');
        }

        return disciplines;
    }

    static async create(model) {
        let discipline;
        const service = this;

        try {
            const response = await axios.post(`/${CONTROLLER_PATH}/saveDisciplina`, model);
            discipline = response.data;

            if (!discipline) return undefined;
            discipline = service.prepare(discipline);
        } catch (error) {
            console.error(error);
            throw new Error('Não foi possível criar a disciplina, entre em contato com o suporte');
        }

        return discipline;
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
