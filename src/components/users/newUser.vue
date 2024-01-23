<template>
    <div class="text-center p-5">
           <div class="d-flex justify-content-center">
               <form @submit.prevent="handleSubmit(this)"
                   style="border: 2px solid black; border-radius: 20px; padding: 30px; background-color: white;">
                   <h1 class="h3 mb-3 fw-normal">Add User</h1>
                   <div class="form-floating">
                       <input type="textfield" v-model="selectedRow.fname" class="form-control" id="floatingFname"
                           placeholder="textfield">
                       <label for="floatingFname">Fname</label>
                   </div>
                   <div class="form-floating">
                       <input type="textfield" v-model="selectedRow.lname" class="form-control" id="floatingLname"
                           placeholder="textfield" >
                       <label for="floatingLname">Lname</label>
                   </div>
                   <div class="form-floating">
                       <input type="email" v-model="selectedRow.email" class="form-control" id="floatingInput"
                           placeholder="name@example.com" >
                       <label for="floatingInput">Email address</label>
                   </div>
                   <div class="form-floating">
                       <input type="textfield" v-model="selectedRow.address" class="form-control" id="floatingAddress"
                           placeholder="textfield" >
                       <label for="floatingAddress">Address</label>
                   </div>
                   <div class="form-floating">
                       <input type="date" v-model="selectedRow.dob" class="form-control" id="floatingDate"
                           placeholder="Passtextfieldword" >
                       <label for="floatingDate">Date Of Birth</label>
                   </div>
                   <div class="form-floating">
                       <input type="textfield" v-model="selectedRow.gender" class="form-control" id="floatingGender"
                           placeholder="textfield" >
                       <label for="floatingGender">Gender</label>
                   </div>
                   <div class="form-floating">
                       <select type="textfield" v-model="selectedRow.roleId" class="form-control" id="floatingroleId"
                           placeholder="textfield">
                       
                       <option value = 'admin'>Admin</option>
                       <option value = 'artistmanager'>Artist Manager</option>
                       </select>
                   </div>
                   <div class="form-floating">
                       <input type="password" v-model="selectedRow.password" class="form-control" id="floatingPassword"
                           placeholder="Password" >
                       <label for="floatingPassword">Password</label>
                   </div>
                   <div class="form-floating">
                       <input type="password" v-model="selectedRow.password" class="form-control" id="floatingPassword"
                           placeholder="Password" >
                       <label for="floatingPassword">Confifm Password</label>
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
   import { useRouter } from 'vue-router';

   
   const email = ref('')
   const password = ref('')
   const store = userDataStore();
   let selectedRow = ref([''])
    const router = useRouter();

   selectedRow.value.roleId = "artistmanager"
   
   const handleSubmit = async(item) => {
       try {
           let response = await axios.post('users', {
            user:{
                fname: selectedRow.value.fname,
             lname: selectedRow.value.lname,
             email: selectedRow.value.email,
             phone: selectedRow.value.phone,
             gender: selectedRow.value.gender,
             dob: selectedRow.value.dob,
             address: selectedRow.value.address,
             password: selectedRow.value.password,
             role_id: selectedRow.value.roleId
            }
             
           });
   
           if (response) {
               toast.success(
                   'Added User Sucessfully.',
                   {
                       autoClose: 1000,
                   });
                   router.push("/userDash")
           } else {
               toast.error(
                   'Error',
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