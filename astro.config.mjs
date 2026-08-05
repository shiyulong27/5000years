import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://shiyulong27.github.io',
  // 尾斜杠必须保留：去掉会导致构建产物中的资源路径少一层
  base: '/5000years/',
  output: 'static',

  // 关闭 dev 工具栏：其依赖的 axobject-query 在本环境下加载失败，
  // 抛出的 SyntaxError 会中断 Vite 的模块链，导致 dev 模式下 CSS
  // 完全不注入（构建产物不受影响——那里是真正的 <link> 标签）。
  devToolbar: { enabled: false },
})
