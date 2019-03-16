import Vue from 'vue'
import Router from 'vue-router'
import HomeView from './views/HomeView.vue'
import MonthView from '@/views/MonthView';
import NotFoundView from '@/views/NotFoundView';

Vue.use(Router)

const monthsArray = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'decemember',
];

const monthRoutes = [];

monthsArray.forEach((month) => {
  monthRoutes.push({
    path: '',
    name: month,
    component: MonthView,
  });
});

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/calendar/:year/:month',
      component: () => import(/* webpackChunkName: "calendar" */ './views/MonthView.vue'),
      children: monthRoutes
    },
    {
      path: '*', component: NotFoundView
    }
  ]
})
