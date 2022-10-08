import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
	{
		path: '/',
		redirect: '/userMgt'
	}, 
	{
		path: '/userMgt',
		component: () => import('../views/common/layout/layout.vue'),
		children: [{
			path: '/',
			component: () => import('../views/userMgt/userMgt.vue'),
			meta: {
				title: '用户列表'
			}
		}, {
			path: '/menuMgt',
			component: () => import('../views/menuMgt/menuMgt.vue'),
			meta: {
				title: '菜单列表'
			}
		}]
	},
]

const router = new VueRouter({
	routes
})

export default router
