import { ElButton, ElSwitch, ElSelect, ElOption, ElUpload } from 'element-plus';

export default {
  install: function(app) {
    app.use(ElButton);
    app.use(ElSwitch);
    app.use(ElSelect);
    app.use(ElOption);
    app.use(ElUpload);
  }
};
