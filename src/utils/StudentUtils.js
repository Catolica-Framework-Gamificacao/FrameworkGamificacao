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
}
