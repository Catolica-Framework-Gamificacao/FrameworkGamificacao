import AuthService from '../../src/services/AuthService';

jest.mock('axios');

const BAD_PARAMS_ERROR_MESSAGE = 'Credenciais inválidas, informe-as corretamente.';

describe('AuthService', () => {
    describe('Method: login', () => {
        describe('When bad parameters was passed', () => {
            it('Should throw an error if parameter is empty', async () => {
                try {
                    await AuthService.login();
                } catch (error) {
                    expect(error.message).toMatch(BAD_PARAMS_ERROR_MESSAGE);
                }
            });

            it('Should throw an error if parameter is null', async () => {
                try {
                    await AuthService.login(null);
                } catch (error) {
                    expect(error.message).toMatch(BAD_PARAMS_ERROR_MESSAGE);
                }
            });

            it('Should throw an error if parameter is undefined', async () => {
                try {
                    await AuthService.login(undefined);
                } catch (error) {
                    expect(error.message).toMatch(BAD_PARAMS_ERROR_MESSAGE);
                }
            });

            it('Should throw an error if parameter is an empty object', async () => {
                try {
                    await AuthService.login({});
                } catch (error) {
                    expect(error.message).toMatch(BAD_PARAMS_ERROR_MESSAGE);
                }
            });

            it('Should throw an error if parameter is an empty array', async () => {
                try {
                    await AuthService.login([]);
                } catch (error) {
                    expect(error.message).toMatch(BAD_PARAMS_ERROR_MESSAGE);
                }
            });

            it('Should throw an error if "login" is an empty string', async () => {
                try {
                    await AuthService.login({
                        login: '',
                        password: '123',
                    });
                } catch (error) {
                    expect(error.message).toMatch(BAD_PARAMS_ERROR_MESSAGE);
                }
            });

            it('Should throw an error if "password" is an empty string', async () => {
                try {
                    await AuthService.login({
                        login: 'ludus@tests.com',
                        password: '',
                    });
                } catch (error) {
                    expect(error.message).toMatch(BAD_PARAMS_ERROR_MESSAGE);
                }
            });
        });
    });
});
