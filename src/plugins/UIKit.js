import UIButton from '@/components/UI/UIButton';
import UISwitch from '@/components/UI/UISwitch';

const components = {
  UIButton,
  UISwitch
};

export default {
  install: function(Vue) {
    Object.keys(components).forEach(name => {
      Vue.component(name, components[name]);
    });
  }
};
