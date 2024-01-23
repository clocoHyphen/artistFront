<template>
  <div class="text-center p-5">
    <div class="d-flex justify-content-center">
      <form
        @submit.prevent="handleSubmit(this)"
        style="border: 2px solid black; border-radius: 20px; padding: 30px; background-color: white"
      >
        <h1 class="h3 mb-3 fw-normal">User Update</h1>
        <div class="form-floating">
          <input
            type="textfield"
            v-model="selectedRow.fname"
            class="form-control"
            id="floatingFname"
            placeholder="textfield"
            value="store.selecTedUser.fname"
          />
          <label for="floatingFname">Fname</label>
        </div>
        <div class="form-floating">
          <input
            type="textfield"
            v-model="selectedRow.lname"
            class="form-control"
            id="floatingLname"
            placeholder="textfield"
          />
          <label for="floatingLname">Lname</label>
        </div>
        <div class="form-floating">
          <input
            type="email"
            v-model="selectedRow.email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="textfield"
            v-model="selectedRow.address"
            class="form-control"
            id="floatingAddress"
            placeholder="textfield"
          />
          <label for="floatingAddress">Address</label>
        </div>
        <div class="form-floating">
          <input
            type="date"
            v-model="selectedRow.dob"
            class="form-control"
            id="floatingDate"
            placeholder="Passtextfieldword"
          />
          <label for="floatingDate">Date Of Birth</label>
        </div>
        <div class="form-floating">
          <input
            type="textfield"
            v-model="selectedRow.gender"
            class="form-control"
            id="floatingGender"
            placeholder="textfield"
          />
          <label for="floatingGender">Gender</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            v-model="selectedRow.password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Update</button>
        <button class="w-100 btn btn-lg">Cancel</button>
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

const store = userDataStore()
let selectedRow = ref([''])

selectedRow.value = store.selecTedUser

const handleSubmit = async () => {
  try {
    let response = await axios.put('users/' + selectedRow.value.userId, {
      fname: selectedRow.value.fname,
      lname: selectedRow.value.lname,
      email: selectedRow.value.email,
      phone: selectedRow.value.phone,
      gender: selectedRow.value.gender,
      date_of_birth: selectedRow.value.dob,
      address: selectedRow.value.address
    })

    if (response) {
      localStorage.setItem('token', response.data)
      store.tokem = 'jkhfdsjk2kdhkahdka'
      toast.success('User Updated Sucessfully..', {
        autoClose: 1000
      })
    } else {
      toast.error('Update Failed.', {
        autoClose: 10000
      })
    }
  } catch (error) {
    toast.error(error.response.data, {
      autoClose: 10000
    })
  }
}
</script>
