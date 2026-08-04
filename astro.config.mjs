import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://shiyulong27.github.io',
  // 尾斜杠必须保留：去掉会导致构建产物中的资源路径少一层
  base: '/5000years/',
  output: 'static',
})
