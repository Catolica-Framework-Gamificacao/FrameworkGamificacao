export default class DisciplineUtils {
    static getDefaultTableHeaders() {
        return [
            {
                text: 'Nome',
                align: 'center',
                sortable: true,
                value: 'name',
            },
            {
                text: 'Descrição',
                align: 'center',
                sortable: false,
                value: 'description',
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
