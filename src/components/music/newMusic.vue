<template>
  <div class="text-center p-5">
    <div class="d-flex justify-content-center">
      <form
        @submit.prevent="handleSubmit(this)"
        style="border: 2px solid black; border-radius: 20px; padding: 30px; background-color: white"
      >
        <h1 class="h3 mb-3 fw-normal">Add Songs</h1>
        <div class="form-floating">
          <input
            type="textfield"
            v-model="selectedMusic.name"
            class="form-control"
            id="floatingFname"
            placeholder="textfield"
          />
          <label for="floatingFname">Song Name</label>
        </div>
        <div class="form-floating">
          <input
            type="textfield"
            v-model="selectedMusic.album"
            class="form-control"
            id="floatingLname"
            placeholder="textfield"
          />
          <label for="floatingLname">Album</label>
        </div>
        <div class="form-floating">
          <input
            type="textfield"
            v-model="selectedMusic.genre"
            class="form-control"
            id="floatingGenre"
            placeholder="pop"
          />
          <label for="floatingGenre">Genre</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from './../../axios'
import { toast } from 'vue3-toastify'
import { userDataStore } from '/src/storeState/userData'
import { ref } from 'vue'
import 'vue3-toastify/dist/index.css'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = userDataStore()
let selectedMusic = ref([''])

const handleSubmit = async () => {
  try {
    let response = await axios.post('musics', {
      music: {
        title: selectedMusic.value.name,
        genre: selectedMusic.value.genre,
        album: selectedMusic.value.album,
        artistId: store.userData.userId
      }
    })

    if (response) {
      toast.success('Music Added.', {
        autoClose: 1000,
        onClose: () => {
      router.push("/musicDash")
  }
      })
    } else {
      toast.error('Fail while saving data.', {
        autoClose: 10000
      })
    }
  } catch (error) {
    console.log(error.response.data)
    toast.error(error.response.data, {
      autoClose: 10000
    })
  }
}
</script>
