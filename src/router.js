import { createRouter, createWebHistory } from 'vue-router';
import userDash from './components/users/userDash.vue';
import login from './components/users/login.vue';
import oof from './components/users/oof.vue';
import newUser from './components/users/newUser.vue';
import newMusic from './components/music/newMusic.vue';
import musicDash from './components/music/musicDash.vue';
import musicUpdate from './components/music/musicUpdate.vue';
import newArtist from './components/artists/newArtist.vue';
import artistDash from './components/artists/artistDash.vue';
import welcome from './components/HelloWorld.vue';
import { userDataStore } from '/src/storeState/userData';

const routes = [
  { path: '/', component: welcome },
  { path: '/home', component: welcome },
  { path: '/userDash', component: userDash, beforeEnter: checkUserRole(['admin']) },
  { path: '/login', component: login },
  { path: '/oof', component: oof },
  { path: '/newUser', component: newUser, beforeEnter: checkUserRole(['admin']) },
  { path: '/newArtist', component: newArtist, beforeEnter: checkUserRole(['artistmanager']) },
  { path: '/newMusic', component: newMusic, beforeEnter: checkUserRole(['artist']) },
  { path: '/musicDash', component: musicDash, beforeEnter: checkUserRole(['artist','artistmanager']) },
  { path: '/musicUpdate', component: musicUpdate, beforeEnter: checkUserRole(['artist']) },
  { path: '/artistDash', component: artistDash, beforeEnter: checkUserRole(['artistmanager']) },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function checkUserRole(allowedRoles) {
  return (to, from, next) => {
    const store = userDataStore();
    const userRole = store.userData?.role_id;
    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      next('/');
    }
  };
}

export default router;
