import Vue from 'vue';
import FancyHeading from '../pages/index.vue';

function mountComponentWithProps (Component, propsData) {
  const Constructor = Vue.extend(Component);
  const vm = new Constructor({
    propsData
  }).$mount();

  return vm.$el;
}

describe('FancyHeading.vue', () => {

    it('should be the correct color', () => {
        const headingData = mountComponentWithProps(FancyHeading, { color: '' });
        const styleData = headingData.style.getPropertyValue('');
    
        console.log(styleData)
    
        expect(styleData).toEqual('');
      });
    

});