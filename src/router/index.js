import Vue from 'vue'
import Router from 'vue-router'
import Markdowns from '@/components/markdowns/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:id?',
      name: 'markdowns',
      component: Markdowns
    }
  ]
})
