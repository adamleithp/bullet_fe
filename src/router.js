import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Month from '@/views/Month';

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

// const getDaysInMonth = (month,year) => new Date(year, month, 0).getDate();
const monthRoutes = [];

monthsArray.forEach((month) => {
  monthRoutes.push({
    path: '',
    name: month,
    component: Month,
  });
});

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:year/:month',
      component: () => import(/* webpackChunkName: "calendar" */ './views/Month.vue'),
      children: monthRoutes
    },
  ]
})
