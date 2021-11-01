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
    this.mode = options.mode
    const current = this.mode === 'history'? window.location.pathname : window.location.hash.replace('#', '')
    this.data = _Vue.observable({
      current
    })
    
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
          const mode = this.$router.mode
          if (mode === 'history') {
            history.pushState(null, '', this.to)
            this.$router.data.current = this.to
          } else if (mode === 'hash') {
            location.href = '/#' + this.to
          }
          
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
    if (this.mode === 'history') {
      window.addEventListener('popstate', () => {
        this.data.current = window.location.pathname
      })
    } else if (this.mode === 'hash') {
      window.addEventListener('hashchange', () => {
        const path = window.location.hash.replace('#', '')
        this.data.current = path
      })
    }
  }

  afterEach(cb) {
    console.log(cb)
  }
}
