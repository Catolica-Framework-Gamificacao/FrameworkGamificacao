import _ from 'lodash';

export default class FormularyUtils {
    static validadeNotEmptyRuleOrThrowMessage(errorMessage) {
        return (value) => !_.isEmpty(value) || errorMessage;
    }

    static emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
