import { faker } from '@faker-js/faker';
import _ from 'lodash';

export default class StudentUtils {
    static getDefaultTableHeaders() {
        return [
            {
                text: 'RA',
                align: 'center',
                sortable: true,
                value: 'ra',
            },
            {
                text: 'Nome',
                align: 'center',
                sortable: true,
                value: 'name',
            },
            {
                text: 'Pontos',
                align: 'center',
                sortable: true,
                value: 'points',
            },
            {
                text: 'Exibir',
                align: 'center',
                sortable: true,
                value: 'showOnRanking',
            },
            {
                text: 'Ações',
                align: 'center',
                sortable: false,
                value: 'actions',
            },
        ];
    }

    static openRegisterModal(modal) {
        if (modal.open) modal.open();
    }

    static loadFakeStudentsList() {
        const users = [];
        Array.from({ length: 20 }).forEach(() => {
            users.push({
                ra: faker.datatype.number().toString(),
                name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                email: faker.internet.email(),
                situation: faker.helpers.arrayElement(['Ativo', 'Inativo', 'Bloqueado']),
                class: faker.helpers.arrayElement(['Engenharia de Software', 'Design', 'Direito']),
                showOnRanking: faker.helpers.arrayElement(['a', 'b']) === 'a',
                points: faker.datatype.number(),
            });
        });

        return _.sortBy(users, 'name');
    }
}
