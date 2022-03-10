import axios from 'axios';
import _ from 'lodash';

export default class RankingService {
    PATH = '/ranking';

    static prepare(position) {
        return position;
    }

    static getDefaultTableHeaders() {
        return [
            {
                text: 'Posição',
                align: 'center',
                sortable: true,
                value: 'posicao',
            },
            {
                text: 'RA',
                align: 'left',
                sortable: true,
                value: 'aluno',
            },
            {
                text: 'Disciplina',
                align: 'center',
                sortable: true,
                value: 'disciplina',
            },
            {
                text: 'Pontuação',
                align: 'center',
                sortable: true,
                value: 'pontuacao',
            },
        ];
    }
            });
        return ranking;
    }
}
