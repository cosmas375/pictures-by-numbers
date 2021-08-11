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
import UIPopover from '@/components/UI/UIPopover';
import UITooltip from '@/components/UI/UITooltip';
import UIColorPicker from '@/components/UI/UIColorPicker';
import UIInput from '@/components/UI/UIInput';
import UICheckbox from '@/components/UI/UICheckbox';

import {
  ElButton,
  ElSwitch,
  ElSelect,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElOption,
  ElUpload,
  ElNotification,
  ElPopover,
  ElTooltip,
  ElColorPicker
} from 'element-plus';

const elementUIComponents = {
  ElButton,
  ElSwitch,
  ElSelect,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElOption,
  ElUpload,
  ElNotification,
  ElPopover,
  ElTooltip,
  ElColorPicker
};

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
  UINotification,
  UIPopover,
  UITooltip,
  UIColorPicker,
  UIInput,
  UICheckbox
};

export default {
  install: function(app) {
    Object.keys(elementUIComponents).forEach(name => {
      app.use(elementUIComponents[name]);
    });

    Object.keys(components).forEach(name => {
      app.component(name, components[name]);
    });
  }
};
