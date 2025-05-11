const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: { allowedHosts: 'all', // 或者具体的域名/IP列表 ['your-domain.com', '192.168.1.100'] // 如果是 vue-cli 3+，可能需要使用下面的配置 // disableHostCheck: true, // 注意：这会完全禁用主机检查，安全性较低，仅在受信任的网络环境中使用 }
}
})
