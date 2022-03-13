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
                value: 'nome',
            },
            {
                text: 'Pontos',
                align: 'center',
                sortable: true,
                value: 'pontos',
            },
            {
                text: 'Exibir',
                align: 'center',
                sortable: true,
                value: 'exibir',
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
