import { mount } from '@vue/test-utils'
import Nav from '@/components/Nav.vue'

describe('Nav', () => {
  const wrapper = mount(Nav)
  
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('has a navbrand', () => {
    expect(wrapper.contains('.navbar-brand')).toBe(true)
  })

  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

})
