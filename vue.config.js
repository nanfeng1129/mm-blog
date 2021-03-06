module.exports = {
    productionSourceMap: false,
    publicPath:'/',
    devServer: {
        port: '9000',
        hot: true,
        proxy: {
            'api': {
                target: 'http://localhost:3000',
                //target: 'http://106.12.71.142:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
/* import { ProjectOptions  } from '@vue/cli-service'

const config: ProjectOptions = {
    productionSourceMap: false,
    publicPath:'/',
    devServer: {
        port: '9999',
        hot: true,
        proxy: {
            'api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
  
module.exports = config; */