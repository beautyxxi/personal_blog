import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import NotFound from '../views/NotFoundView.vue';
import RegisterView from '../views/RegisterView.vue';
import UserList from '../views/UserListView.vue';
import UserProfile from '../views/UserProfileView.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/login/',
    name: 'login',
    component: LoginView
  },

  {
    path: '/404/',
    name: '404',
    component: NotFound
  },

  {
    path: '/register/',
    name:'register',
    component: RegisterView
  },

  {
    path: '/userlist/',
    name: 'userlist',
    component: UserList
  },

  {
    path: '/userprofile/:userId/',
    name: 'userprofile',
    component: UserProfile
  },

  {
    path: '/:catchAll(.*)',
    redirect: '/404/'
  }
];

//创建一个新的路由器实例，需要传入一个配置对象
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
