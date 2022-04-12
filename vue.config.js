module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/penfu-store/' : '/',
  lintOnSave: process.env.NODE_ENV === 'development'
}
