import Vue from 'vue'
import Router from 'vue-router'
import Markdowns from '@/components/markdowns/index'
import MarkdownShow from '@/components/markdowns/show'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Markdowns',
      component: Markdowns
    },
    {
      path: '/:id',
      name: 'MarkdownShow',
      component: MarkdownShow
    }
  ]
})
