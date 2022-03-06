export default class RankingService {
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
}
