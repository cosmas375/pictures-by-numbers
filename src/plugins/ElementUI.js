import {
  ElButton,
  ElSwitch,
  ElSelect,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElOption,
  ElUpload,
  ElNotification
} from 'element-plus';

export default {
  install: function(app) {
    app.use(ElButton);
    app.use(ElSwitch);
    app.use(ElSelect);
    app.use(ElDropdown);
    app.use(ElDropdownItem);
    app.use(ElDropdownMenu);
    app.use(ElOption);
    app.use(ElUpload);
    app.use(ElNotification);
  }
};
