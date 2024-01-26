<template>
  <div class="text-center p-5">
    <div class="d-flex justify-content-center">
      <form
        @submit.prevent="handleSubmit(this)"
        style="border: 2px solid black; border-radius: 20px; padding: 30px; background-color: white"
      >
        <h1 class="h3 mb-3 fw-normal">Add Artist</h1>
        <div class="form-floating">
          <input
            type="textfield"
            v-model="selectedRow.fname"
            class="form-control"
            id="floatingFname"
            placeholder="textfield"
          />
          <label for="floatingFname">Fname</label>
          <div class= "error-message" v-if="fnameErr">{{fnameErr}}</div>

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
            type="textfield"
            v-model="selectedRow.email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
          <div class= "error-message" v-if="emailErr">{{emailErr}}</div>

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
        <div class="form-floating">
          <input
            type="password"
            v-model="selectedRow.password"
            class="form-control"
            id="floatingPasswordConf"
            placeholder="Password"
          />
          <label for="floatingPasswordConf">Confirm Password</label>
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
let selectedRow = ref([''])
const emailErr = ref('')
const fnameErr = ref('')

const handleSubmit = async () => {
  try {
    let response = await axios.post('users', {
      user: {
        fname: selectedRow.value.fname,
        lname: selectedRow.value.lname,
        email: selectedRow.value.email,
        phone: selectedRow.value.phone,
        gender: selectedRow.value.gender,
        dob: selectedRow.value.dob,
        address: selectedRow.value.address,
        password: selectedRow.value.password,
        role_id: 'artist',
        managerId: store.userData.userId
      }
    })

    if (response) {
      toast.success('Artist Added.', {
        autoClose: 3000,
        onClose: () => {
          router.push("/artistDash");
  }
      });
    } else {
      toast.error('There was error.', {
        autoClose: 2000
      })
    }
  } catch (error) {
    emailErr.value = ""
    fnameErr.value = ""
    if(error.response){
      const errorData = error.response.data;

    Object.entries(errorData).forEach(([fieldName, errors]) => {
      const filteredErrors = errors.filter((error) => error !== undefined);

      const errorMessage = filteredErrors.join(', ');

      if (errorMessage.trim() !== '') {
        if(fieldName!="fname") emailErr.value = errorMessage

        if(fieldName=="fname") fnameErr.value = errorMessage

        toast.error(fieldName + " " + errorMessage, {
          autoClose: 10000
        })
      }
    });
    }
    else{
      toast.error('Something went wrong.', {
          autoClose: 10000
        })
    }
    
  }
}
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 5px;
  font-size: 14px;
}
</style>