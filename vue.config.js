module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/car-service-book-v1/" : "/",
  transpileDependencies: ["vuetify"],
  lintOnSave: true,
};
