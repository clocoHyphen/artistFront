<template>
    <div class="text-center p-5">
           <div class="d-flex justify-content-center">
               <form @submit.prevent="handleSubmit(this)"
                   style="border: 2px solid black; border-radius: 20px; padding: 30px; background-color: white;">
                   <h1 class="h3 mb-3 fw-normal">Update Songs</h1>
                   <div class="form-floating">
                       <input type="textfield" v-model="selectedMusic.title" class="form-control" id="floatingFname"
                           placeholder="textfield">
                       <label for="floatingFname">Song Name</label>
                   </div>
                   <div class="form-floating">
                       <input type="textfield" v-model="selectedMusic.album" class="form-control" id="floatingLname"
                           placeholder="textfield" >
                       <label for="floatingLname">Album</label>
                   </div>
                   <div class="form-floating">
                       <input type="textfield" v-model="selectedMusic.genre" class="form-control" id="floatingGenre"
                           placeholder="pop" >
                       <label for="floatingGenre">Genre</label>
                   </div>
                   <button class="w-100 btn btn-lg btn-primary" type="submit">Save</button>
               </form>
           </div>
       </div>
   </template>
   
   <script setup>
   import axios from "./../../axios";
   import { toast } from 'vue3-toastify';
   import { userDataStore } from '/src/storeState/userData';
   import { ref, computed } from 'vue'
   import 'vue3-toastify/dist/index.css';
   
   const email = ref('')
   const password = ref('')
   const store = userDataStore();
   const selectedMusic = ref([])

   selectedMusic.value = store.selectedMusic

   console.log(selectedMusic.value)
   
   const handleSubmit = async() => {
       try {
           let response = await axios.patch('musics/'+selectedMusic.value.id, {
            music:{
                title: selectedMusic.value.name,
                genre: selectedMusic.value.genre,
                album: selectedMusic.value.album,
            }
             
           });
   
           if (response) {
               toast.success(
                   'Music Updated.',
                   {
                       autoClose: 1000,
                   });
           } else {
               toast.error(
                   'Fail while saving data.',
                   {
                       autoClose: 10000,
                   }
               )
           }
       } catch (error) {
           console.log(error.response.data);
           toast.error(
               error.response.data,
               {
                   autoClose: 10000,
               }
           )
       }
   }
   
   </script>