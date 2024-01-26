<template>
  <h1>Music dash</h1>
  <table>
    <thead>
      <tr>
        <th>Song Name</th>
        <th>Genre</th>
        <th>Album</th>
        <th>Created At</th>
        <th>Updated At</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in allMusicData" v-bind:key="item.musicId">
        <td>{{ item.title }}</td>
        <td>{{ item.genre }}</td>
        <td>{{ item.album }}</td>
        <td>{{ item.created_at }}</td>
        <td>{{ item.updated_at }}</td>
        <td>
          <button @click="toggleEdit(item)">Edit</button>
            <button @click="toggleEdit(item)">Show</button>
          <button @click="deleteMusic(item)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { userDataStore } from '/src/storeState/userData.js'
import axios from './../../axios'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'
import 'vue3-toastify/dist/index.css'
import { useRouter } from 'vue-router'
const router = useRouter()

const store = userDataStore()
const allMusicData = ref([])

const fetchMusic = async () => {
  if (store.userData.role_id == 'artist') {
    store.artistId = store.userData.userId
  }
  try {
    let response = await axios.get('musics/' + store.artistId, {})
    if (response) {
      allMusicData.value = response.data
    } else {
      toast.error('Something Went Wrong')
    }
  } catch (error) {
    toast.error('Failed to fetch music data')
  }
}

fetchMusic()

const deleteMusic = async (item) => {
  try {
    let response = await axios('musics/' + item.id, {
      method: 'delete',
      body: {
        musicId: item.id
      }
    })
    if (response) {
      toast.success('Music Deleted')
    } else {
      toast.error('Something Went Wrong')
    }
  } catch (error) {
    toast.error(error.response.data)
  }
  fetchMusic()
}

const toggleEdit = (item) => {
  store.selectedMusic = item
  router.push('/musicUpdate')
}
</script>

<style scoped>
table,
td,
th {
  border: 1px solid red;
  display: flex horizontal;
  padding: 10px;
  border-collapse: collapse;
}

.action {
  display: flex horizontal;
}
</style>
