import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import Home from '../views/Home.vue'
//import Home from '../components/NavLeft.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: Home,
    meta: {
        title: '首页'
    },
    children: [
        {
            path: 'index',
            name: 'index',
            component: () => import('../views/index.vue'),
            meta: {
                title: '首页',
            }
        },
        {
            path: 'detail',
            name: 'detail',
            component: () => import('../components/Content.vue'),
            meta: {
                title: 'detail',
            }
        },
        {
            path: 'tagAll',
            name: 'tagAll',
            component: () => import('../views/tagAll.vue'),
            meta: {
                title: '标签',
            }
        },
        {
            path: 'classAll',
            name: 'classAll',
            component: () => import('../views/classAll.vue'),
            meta: {
                title: '类别',
            }
        },
        {
            path: 'stamp',
            name: 'stamp',
            component: () => import('../views/timeStamp.vue'),
            meta: {
                title: '时间戳',
            }
        },
    ]
  },
  /* {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/About.vue')
  } */
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to: RouteLocationNormalized) => {
    if(to.query.title){
        document.title = to.query.title as string;
    }else{
        document.title = to.meta.title as string;
    }
})

export default router
