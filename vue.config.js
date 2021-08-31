const Components = require('unplugin-vue-components/webpack')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          math: 'always'
        },
      },
    },
  },
  transpileDependencies: ["veui"],
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [
          name => {
            if (name.startsWith('Veui')) {
              return {
                importName: name.slice(4),
                path: 'veui'
              }
            }
          }
        ],
        transformer: 'vue2'
      })
    ]
  },
  chainWebpack: (config) => {
    config.module
      .rule("veui")
      .test(/\.vue$/)
      .pre()
      .use("veui-loader")
      .loader("veui-loader")
      .tap(() => {
        return {
          modules: [
            {
              package: "veui-theme-dls",
              fileName: "{module}.less",
            },
            {
              package: "veui-theme-dls",
              fileName: "{module}.js",
              transform: false,
            },
          ],
        };
      });
  },
};
