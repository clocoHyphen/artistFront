<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link v-if="!store.token" to="/login">Login</router-link>
    <router-link v-if="store.userData?.role_id=='admin'" to="/userDash">User</router-link>
    <router-link v-if="store.userData?.role_id=='artistmanager'" to="/newArtist">New Artist</router-link>
    <router-link v-if="store.userData?.role_id=='admin'" to="/newUser">New User</router-link>
    <router-link v-if="store.userData?.role_id=='artist'" to="/musicDash">Musics List</router-link>
    <router-link v-if="store.userData?.role_id=='artist'" to="/newMusic">New Music</router-link>
    <router-link v-if="store.userData?.role_id=='artistmanager'" to="/artistDash">Artist</router-link>
    <button v-if="store?.token" @click="logout">logout</button>
  </nav>
  <router-view />
</template>

<script setup>
import router from './router';
import { userDataStore } from '/src/storeState/userData';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const store = userDataStore();

const logout = async () => {
  store.token = null;
  store.userData = null;
  store.allUserData = null;
  store.artistId = null;
  store.selectedUser = null;
  store.selectedMusic = null;
  localStorage.setItem('token', store.token);
  toast.success(
                   'User Logged Out Sucessfully.',
                   {
                       autoClose: 3000,
                   });
  router.push('/');
};
</script>