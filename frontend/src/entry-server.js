import createApp from '@/main';

export default () => {
  return new Promise(resolve => {
    const { app, router } = createApp();
    resolve({
      app,
      router
    });
  });
};
