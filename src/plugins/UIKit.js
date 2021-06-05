import UIButton from '@/components/UI/UIButton';
import UIIcon from '@/components/UI/UIIcon';
import UISwitch from '@/components/UI/UISwitch';
import UISelect from '@/components/UI/UISelect';
import UIOption from '@/components/UI/UIOption';

const components = {
  UIButton,
  UIIcon,
  UISwitch,
  UISelect,
  UIOption
};

export default {
  install: function(Vue) {
    Object.keys(components).forEach(name => {
      Vue.component(name, components[name]);
    });
  }
};
