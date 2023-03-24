import { faker } from '@faker-js/faker';
import _ from 'lodash';

export default class RankingUtils {
    static loadFakeRankingList() {
        const ranking = [];
        Array.from({ length: 20 }).forEach(() => {
            ranking.push({
                position: faker.datatype.number(),
                student: `${faker.name.firstName()} ${faker.name.lastName()}`,
                ra: faker.datatype.number().toString(),
                discipline: faker.helpers.arrayElement(['Engenharia de Software', 'Design', 'Direito']),
                points: faker.datatype.number(),
            });
        });

        return _.sortBy(ranking, 'name');
    }

    static getDefaultTableHeaders() {
        return [
            {
                text: 'Posição',
                align: 'center',
                sortable: true,
                value: 'position',
            },
            {
                text: 'RA',
                align: 'left',
                sortable: true,
                value: 'student',
            },
            {
                text: 'Disciplina',
                align: 'center',
                sortable: true,
                value: 'discipline',
            },
            {
                text: 'Pontuação',
                align: 'center',
                sortable: true,
                value: 'points',
            },
        ];
    }
}
