module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/car-service-book-old/' : '/',
  transpileDependencies: ['vuetify'],
  lintOnSave: true,
};
