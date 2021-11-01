// options 
// data > current  记录当前路由对象
// routeMap
// _install
// init
// initEvent
// createRouteMap
// initComponents


// eslint-disable-next-line no-unused-vars
let _Vue = null;
export default class VueRouter {
  static install (Vue) {
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    _Vue = Vue

    _Vue.mixin({
      beforeCreate () {
        console.log(this)
        if (this.$options.router) {
          console.log('实例')
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }
  constructor (options) {
    this.options = options
    this.routerMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
    this.mode = options.mode
  }

  init () {
    this.createRouterMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  // 将路径跟组件对应起来
  createRouterMap () {
    this.options.routes.forEach(entry => {
      this.routerMap[entry.path] = entry.component
    })
  }

  initComponents (Vue) {
    Vue.component('router-link', {
      props: {
        to: String,
      },
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, this.$slots.default)
      },
      methods: {
        clickHandler (e) {
          history.pushState(null, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })
    const me = this
    Vue.component('router-view', {
      render (h) {
        const c = me.routerMap[me.data.current]
        return h(c)
      }
    })
  }

  initEvent () {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
