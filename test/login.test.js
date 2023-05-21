import Component from '../pages/auth/login.vue'
import Login from '../pages/auth/login.vue';
import {shallow, mount, shallowMount } from '@vue/test-utils';
describe('Component', () => {


  test('is a Vue instance', () => {
    const wrapper = mount(Component)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
}
,
test('renders correctly', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toMatchSnapshot()
  })
)

describe('Login Component', () => {
 
 // make our assertion and what we expect to happen 
 it('should render without throwing an error', () => {
   expect(shallow(Login ).find('.error').exists()).toBe(false)
 })
})

describe("Login has a button", () => {
  

  test("Has a button", () => {
    const wrapper = shallowMount(Component);
    expect(wrapper.contains("button")).toBe(true);
  });

});

