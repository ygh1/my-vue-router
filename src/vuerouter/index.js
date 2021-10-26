// eslint-disable-next-line no-unused-vars
let Vue = null;
export default class VueRouter {
  static install (v) {
    Vue = v
    this.generateRouterLink()
    this.generateRouterView()
  }
  constructor (options) {
    this.mode = options.mode
    this.routes = options.routes
  }
  static generateRouterView() {
    Vue.component('router-view', {
      render(h) {
        return h()
      }
    })
  }
  static generateRouterLink() {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h) {
        return h('a', {attrs: {href: this.to}}, this.$slots.default)
      }
    })
  }
}
