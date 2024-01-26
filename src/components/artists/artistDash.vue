<template>
  <h1>Artist dash</h1>

  <table>
    <thead>
      <tr>
        <th>Fname</th>
        <th>Lname</th>
        <th>Email</th>
        <th>Dob</th>
        <th>Album Count</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in store.allUserData" v-bind:key="item.userId">
        <td>{{ item.fname }}</td>
        <td>{{ item.lname }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.dob }}</td>
        <td>{{ item.count }}</td>
        <td>
          <button @click="showSongs(item)">Songs</button>
              <!-- <button @click="toggleEdit(item)">Edit</button> -->
          <button @click="deleteUser(item)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { userDataStore } from '/src/storeState/userData.js'
import axios from './../../axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useRouter } from 'vue-router'
const router = useRouter()

const store = userDataStore()

const fetchArtist = async () => {
  try {
    let response = await axios.get('users/' + store.userData.userId, {})
    if (response) {
      store.allUserData = response.data
    } else {
      toast.error('Something Went Wrong')
    }
  } catch (error) {
    toast.error('Failed to fetch artist data')
  }
}

fetchArtist()

const deleteUser = async (item) => {
  try {
    let response = await axios('users/' + item.userId, {
      method: 'delete',
      body: {
        email: item.email
      }
    })
    if (response) {
      toast.success('Artist Deleted')
    } else {
      toast.error('Something Went Wrong')
    }
  } catch (error) {
    toast.error(error.response.data)
  }
  fetchArtist()
}

const showSongs = (item) => {
  store.selecTedUser = item
  store.artistId = item.userId
  router.push('/musicDash')
}

// const toggleEdit = (item) => {
//   store.selecTedUser = item
// }
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
