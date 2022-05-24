import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register'
import Nofind from './views/404'
import Login from './views/Login'
import Home from './views/Home'
import InfoShow from './views/InfoShow'
import ProductList from './views/ProductList'
import Sample from './views/Sample'
import Time from './views/Time'
import Analyse from './views/Analyse'
import SignUp from './views/SignUp'
import Personal from './views/Personal'
import Modulars from './views/Modulars'
import User from './views/User'
import Manager from './views/Manager'
import Notice from './views/Notice'
import NoticeManager from './views/NoticeManager'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', name: '/404', component: Nofind },
    { path: '/', redirect: '/login' },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    {
      path: '/user', name: 'user', component: User,
      children: [
        { path: '', component: Home },
        { path: '/home', name: 'home', component: Home },
        { path: '/productlist', name: 'productlist', component: ProductList },
        { path: '/sample', name: 'sample', component: Sample },
        { path: '/time', name: 'time', component: Time },
        { path: '/analyse', name: 'analyse', component: Analyse },
        { path: '/signup', name: 'signup', component: SignUp },
        { path: '/personal', name: 'personal', component: Personal },
        { path: '/notice', name: 'notice', component: Notice },
      ]
    },
    {
      path: '/manager', name: 'manager', component: Manager,
      children: [
        { path: '', component: InfoShow },
        { path: '/infoshow', name: 'infoshow', component: InfoShow },
        { path: '/modulars', name: 'modulars', component: Modulars },
        { path: '/noticemanager', name: 'noticemanager', component: NoticeManager },
      ]
    },

    // {
    //   path: '/index',
    //   name: 'index',
    //   component: Index,
    //   children: [
    //     { path: '', component: Home },
    //     { path: '/home', name: 'home', component: Home },
    //     { path: '/infoshow', name: 'infoshow', component: InfoShow },
    //     { path: '/productlist', name: 'productlist', component: ProductList },
    //     { path: '/sample', name: 'sample', component: Sample },
    //     { path: '/time', name: 'time', component: Time },
    //     { path: '/analyse', name: 'analyse', component: Analyse },
    //     { path: '/signup', name: 'signup', component: SignUp },
    //     { path: '/personal', name: 'personal', component: Personal },
    //     { path: '/news', name: 'news', component: News },
    //     { path: '/modulars', name: 'modulars', component: Modulars }
    //   ]
    // },
  ]
})


// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;