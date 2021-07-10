import UIButton from '@/components/UI/UIButton';
import UIIcon from '@/components/UI/UIIcon';
import UISwitch from '@/components/UI/UISwitch';
import UISelect from '@/components/UI/UISelect';
import UIDropdown from '@/components/UI/UIDropdown';
import UIDropdownItem from '@/components/UI/UIDropdownItem';
import UIDropdownMenu from '@/components/UI/UIDropdownMenu';
import UIOption from '@/components/UI/UIOption';
import UIFileUpload from '@/components/UI/UIFileUpload';
import UINotification from '@/components/UI/UINotification';

const components = {
  UIButton,
  UIIcon,
  UISwitch,
  UISelect,
  UIDropdown,
  UIDropdownItem,
  UIDropdownMenu,
  UIOption,
  UIFileUpload,
  UINotification
};

export default {
  install: function(Vue) {
    Object.keys(components).forEach(name => {
      Vue.component(name, components[name]);
    });
  }
};
