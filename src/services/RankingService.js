import axios from 'axios';
import _ from 'lodash';

export default class RankingService {
    PATH = '/ranking';

    static prepare(position) {
        return position;
    }

    static async loadData() {
        let ranking = [];
        const service = this;

        ranking = await axios
            .get(service.PATH)
            .then((response) => {
                ranking = response;
                if (ranking.length === 0 || !_.isArray(ranking)) {
                    return [];
                }

                ranking.forEach((position) => {
                    service.prepare(position);
                });

                return ranking;
            })
            .catch((error) => {
                if (error && error.message) {
                    console.error(error.message);
                }
                return [];
            });
        return ranking;
    }
}
