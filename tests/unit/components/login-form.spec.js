import { mount, shallowMount } from '@vue/test-utils';
import LoginForm from '../../../src/components/authentication/LoginForm.vue';

const factory = () => mount(LoginForm);
const stubusShallowFactory = (...stubs) => shallowMount(LoginForm, { stubs });

describe('LoginForm.vue', () => {
    it('LoginForm must be mounted', () => {
        const wrapper = factory();
        expect(wrapper).toBeDefined();
    });

    it('LoginForm must be mounted with some stubs', () => {
        const stubbedChildComponentsWrapper = stubusShallowFactory('router-link', 'router-view');
        expect(stubbedChildComponentsWrapper).toBeDefined();
    });
});
